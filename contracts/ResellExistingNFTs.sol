// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
/*
ERC721ENUMERABLE allows you to see which index of tokens owns every user, not just how many
*/
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketResell is IERC721Receiver, ReentrancyGuard, Ownable {

  /*
  Note that we the address has the keyword immutable because it want change but we can still set the value inside the constructor
  We could say constant if it was a fixed value from the beginning.
  It also saves gas because it is not saved as storage on the EVM
  */

  address payable immutable holder;
  
/*
Fee to use the marketplace(Probably we would like to start without any listing fee)
*/
  uint256 listingFee = 0.0025 ether;

/*
We are going to track all in a struct (all the listing process)
*/
  struct NFT {
    uint256 tokenId;
    address payable seller;
    address payable holder;
    uint256 price;
    bool sold;
  }

/*
Mapping every single list that can be sorted with an input of an uint256
*/
  mapping(uint256 => NFT) private vaultItems;

/*
Event because we need to know when something got sold or listed
and update the smart contract, the List struct and the mapping vaultitems
It is triggered at the end of teh fucntion to list the NFTs
*/
  event NFTListCreated (
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
Call the ERC721 enumerable smart contract in the nft value (the storage for ERC721enumerable)
*/
  ERC721Enumerable nft;

/*
We will be asking when we first deploy the smart contract to give the collection smart contract 
that we want users to be able to sell and buy NFTs from our marketplace.
Constructor that expects the user to give the value of the ERC721 enumerable
Set the holder as the smart contract(this). We could say owner instead but as we have the modifier onlyOwner it is better to not.
*/
   constructor(ERC721Enumerable _nft) {
    holder = payable(msg.sender);
    nft = _nft;
  }

/*
It passes 2 parameters, th tokenId and the price that you want it to list it for sale
Modifier nonReentrant
*/
  function listSale(uint256 tokenId, uint256 price) external payable nonReentrant {
    //check if the seller is the owner of the NFT
      require(nft.ownerOf(tokenId) == msg.sender, "NFT not yours");
      require(vaultItems[tokenId].tokenId == 0, "NFT already listed");
      require(price > 0, "higher than 0");
      //MIRAR333333333333333333333333333333333333333333333333333  
      require(msg.value == listingFee, " Transfer 0.0025 to pay listing fee");
      vaultItems[tokenId] =  NFT(tokenId, payable(msg.sender), payable(address(this)), price, false);
      nft.transferFrom(msg.sender, address(this), tokenId);
      emit NFTListCreated(tokenId, msg.sender, address(this), price, false);
  }

/*
Function to buy NFTs, you should input the tokenId. 
Modifier nonReentrant
*/
  function buyNft(uint256 tokenId) external payable nonReentrant {
      uint256 price = vaultItems[tokenId].price;
      //you have to send the amount that the NFT costs
      require(msg.value == price, "Amount not enough");
      //Transfer the amount to the seller of the NFT
      vaultItems[tokenId].seller.transfer(msg.value);
      //Transfer the NFT to the buyer from our smart smart contract address
      nft.transferFrom(address(this), msg.sender, tokenId);
      //change the state of the NFT
      vaultItems[tokenId].sold = true;
      //###########################check why delete, do not wanted to resell######################################
      //delete the NFT from the vault
      delete vaultItems[tokenId];
  }
/*
Function to cancel the sale of the NFT passing the tokenId.
*/
  function cancelSale(uint256 tokenId) external nonReentrant {
    //require that the NFT is yours, if not revert the funcction
      require(vaultItems[tokenId].seller == msg.sender, "NFT not yours");
      //transfer the NFT from us to the seller
      nft.transferFrom(address(this), msg.sender, tokenId);
      //###########################check why delete, do not wanted to resell######################################
      //delete the NFT from the vault
      delete vaultItems[tokenId];
  }
  
  function getPrice(uint256 tokenId) external view returns (uint256) {
      uint256 price = vaultItems[tokenId].price;
      return price;
  }

 function nftListings() public view returns (NFT[] memory) {
    uint256 nftCount = nft.totalSupply();
    uint currentIndex = 0;
    NFT[] memory items = new NFT[](nftCount);
    for (uint i = 0; i < nftCount; i++) {
        if (vaultItems[i + 1].holder == address(this)) {
        uint currentId = i + 1;
        NFT storage currentItem = vaultItems[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

//MIRAR #######################################################
  function onERC721Received(
        address,
        address from,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
      require(from == address(0x0), "Cannot send nfts to Vault directly");
      return IERC721Receiver.onERC721Received.selector;
    }
  
    /*
    Withdraw the fees from the contract, just the owner(the wallet that deploys the contract)
    */
    function withdraw() external payable onlyOwner() {
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