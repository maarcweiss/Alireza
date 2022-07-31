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

  address payable holder;
/*
Fee to use the marketplace(Probably we would like to start without any listing fee)
*/
  uint256 listingFee = 0.0025 ether;

/*
We are going to track all in a struct (all the listing process)
*/
  struct List {
    uint256 tokenId;
    address payable seller;
    address payable holder;
    uint256 price;
    bool sold;
  }

/*
Mapping every single list that can be sorted with an input of an uint256
*/
  mapping(uint256 => List) public vaultItems;

/*
Event because we need to know when something got sold or listed
and update the smart contract, the List struct and the mapping vaultitems
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
  function getListingFee() public view returns (uint256) {
    return listingFee;
  }

/*
Call the ERC721 enumerable smart contract in the nft value (the storage for enumerable)
*/
  ERC721Enumerable nft;

/*
We will be asking when we first deploy the smart contract to give the collection smart contract 
that we want users to be able to sell and buy NFTs from our marketplace.
Constructor that expects the user to give the value of the ERC721 enumerable
*/
   constructor(ERC721Enumerable _nft) {
    holder = payable(msg.sender);
    nft = _nft;
  }

  function listSale(uint256 tokenId, uint256 price) public payable nonReentrant {
      require(nft.ownerOf(tokenId) == msg.sender, "NFT not yours");
      require(vaultItems[tokenId].tokenId == 0, "NFT already listed");
      require(price > 0, "higher than 0");
      //MIRAR333333333333333333333333333333333333333333333333333  
      require(msg.value == listingFee, " Transfer 0.0025 to pay listing fee");
      vaultItems[tokenId] =  List(tokenId, payable(msg.sender), payable(address(this)), price, false);
      nft.transferFrom(msg.sender, address(this), tokenId);
      emit NFTListCreated(tokenId, msg.sender, address(this), price, false);
  }

  function buyNft(uint256 tokenId) public payable nonReentrant {
      uint256 price = vaultItems[tokenId].price;
      require(msg.value == price, "Amount not enough");
      vaultItems[tokenId].seller.transfer(msg.value);
      nft.transferFrom(address(this), msg.sender, tokenId);
      vaultItems[tokenId].sold = true;
      delete vaultItems[tokenId];
  }

  function cancelSale(uint256 tokenId) public nonReentrant {
      require(vaultItems[tokenId].seller == msg.sender, "NFT not yours");
      nft.transferFrom(address(this), msg.sender, tokenId);
      delete vaultItems[tokenId];
  }
  
  function getPrice(uint256 tokenId) public view returns (uint256) {
      uint256 price = vaultItems[tokenId].price;
      return price;
  }

 function nftListings() public view returns (List[] memory) {
    uint256 nftCount = nft.totalSupply();
    uint currentIndex = 0;
    List[] memory items = new List[](nftCount);
    for (uint i = 0; i < nftCount; i++) {
        if (vaultItems[i + 1].holder == address(this)) {
        uint currentId = i + 1;
        List storage currentItem = vaultItems[currentId];
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