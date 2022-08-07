// SPDX-License-Identifier: Apache-2.0

//newest solidity version
pragma solidity ^0.8.4;

/*
Importing contracts from openzeppelin(Counters, ReentrancyGuard(Protects against solidity major vulnerability and future exploits),
ERC721(token standart for NFTs and Ownable(modifier for the functions that only the deployer of the smart contract can access(NFTSolution Wallet))))
*/

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//contract-deployed: 0x5FbDB2315678afecb367f032d93F642f64180aa3
contract sellNFT is ReentrancyGuard, Ownable {
  using Counters for Counters.Counter;
  /*
  We are going to be able to count the itemIds and the itemsSold
  Just to have some source of transaction history in the marketplace
  */
  Counters.Counter private _itemIds;
  Counters.Counter private _itemsSold;
  
   /*
  Note that we the address has the keyword immutable because it want change but we can still set the value inside the constructor
  We could say constant if it was a fixed value from the beginning.
  It also saves gas because it is not saved as storage on the EVM
  */

  address payable immutable holder;

  /*
  Fees to use the marketplace(Probably we would like to start without any listing fee)
  We can change it below(both functions).
  In this contract we added the minting fee that the users will have to pay if they want to mint the NFT
  */
  uint256 listingFee = 0.0025 ether;
  uint256 mintingFee = 0.0075 ether;

  constructor() {
    holder = payable(msg.sender);
  }

  //Very simillar to the resellExistingNFTs smart contract

  struct VaultItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable holder;
    uint256 price;
    bool sold;
  }

  //Very simillar to the resellExistingNFTs smart contract
  mapping(uint256 => VaultItem) private idToVaultItem;


//Very simillar to the resellExistingNFTs smart contract
  event VaultItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address holder,
    uint256 price,
    bool sold
  );

/*
It just returns the listing fee
*/
  function getListingFee() external view returns (uint256) {
    return listingFee;
  }
  
/*
Function to create a vault item that will call the NFT contract that is willing to issue the tokens
*/
  function createVaultItem(address nftContract,uint256 tokenId,uint256 price) external payable nonReentrant {
    require(price > 0, "Price can't be zero");
    require(msg.value == listingFee, "Pay de listing fee");
    //every time that we someone adds an item id it keeps incrementing
    _itemIds.increment();
    uint256 itemId = _itemIds.current();
    //here we are storing every single NFT that has been listed for sale
    idToVaultItem[itemId] =  VaultItem(itemId,nftContract,tokenId,payable(msg.sender),payable(address(0)),price,false);
    //In this function we are going to be able to transfer the token to our marketplace smart contract
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    //cretae the event  *****************LOOK IF IT IS ADDRESS 0 OR ADDRESS(THIS)
    emit VaultItemCreated(itemId,nftContract,tokenId,msg.sender,address(0),price,false);}



  function MarketSale(
    address nftContract,uint256 itemId) external payable nonReentrant {
    uint price = idToVaultItem[itemId].price;
    uint tokenId = idToVaultItem[itemId].tokenId;
    require(msg.value == price, "Not enough balance to complete transaction");
    idToVaultItem[itemId].seller.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToVaultItem[itemId].holder = payable(msg.sender);
    idToVaultItem[itemId].sold = true;
    _itemsSold.increment();
    payable(holder).transfer(listingFee);
  }

  function getAvailableNft() external view returns (VaultItem[] memory) {
    uint itemCount = _itemIds.current();
    uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
    uint currentIndex = 0;

    VaultItem[] memory items = new VaultItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToVaultItem[i + 1].holder == address(0)) {
        uint currentId = i + 1;
        VaultItem storage currentItem = idToVaultItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function getMyNft() external view returns (VaultItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToVaultItem[i + 1].holder == msg.sender) {
        itemCount += 1;
      }
    }

    VaultItem[] memory items = new VaultItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToVaultItem[i + 1].holder == msg.sender) {
        uint currentId = i + 1;
        VaultItem storage currentItem = idToVaultItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

  function getMyMarketNfts() external view returns (VaultItem[] memory) {
    uint totalItemCount = _itemIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToVaultItem[i + 1].seller == msg.sender) {
        itemCount += 1;
      }
    }

    VaultItem[] memory items = new VaultItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToVaultItem[i + 1].seller == msg.sender) {
        uint currentId = i + 1;
        VaultItem storage currentItem = idToVaultItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

/*
Function to be able to change the listing fee because maybe we do some special events
*/
  function changeListingFee(uint256 _newFee)external onlyOwner(){
    listingFee = _newFee;
  }

/*
Function to be able to change the the minting fee because maybe we do some special events
*/
  function changeMintingFee(uint256 _newFee)external onlyOwner(){
    mintingFee = _newFee;
  }

/*
To be able to withdraw the fees, just the wallet that deploys the contract
*/
  function withdraw() public payable onlyOwner() {
    require(payable(msg.sender).send(address(this).balance));
    }

    /*
    Receive ether if someone sends this ether to the contract
    */
    fallback()external payable{}

    /*
    Receive ether if someone sends this ether to the contract without data
    */
    receive() external payable{}
}