// SPDX-License-Identifier: MIT LICENSE

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
//ERC721ENUMERABLE allows you to see which index of tokens owns every user, not just how many
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketResell is IERC721Receiver, ReentrancyGuard {

  address payable immutable owner;
  uint256 listingFee = 0.0025 ether;

  struct List {
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
  }

  mapping(uint256 => List) public vaultItems;

  event NFTListCreated (
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256 price,
    bool sold
  );

  function getListingFee() external view returns (uint256) {
    return listingFee;
  }

  ERC721Enumerable nft;

   constructor(ERC721Enumerable _nft) {
    owner = payable(msg.sender);
    nft = _nft;
  }

  function listSale(uint256 tokenId, uint256 price) external payable nonReentrant {
      require(nft.ownerOf(tokenId) == msg.sender, "NFT not yours");
      require(vaultItems[tokenId].tokenId == 0, "NFT already listed");
      require(price > 0, "Amount must be higher than 0");
      require(msg.value == listingFee, "Please transfer 0.0025 crypto to pay listing fee");
      vaultItems[tokenId] =  List(tokenId, payable(msg.sender), payable(address(this)), price, false);
      nft.transferFrom(msg.sender, address(this), tokenId);
      emit NFTListCreated(tokenId, msg.sender, address(this), price, false);
  }

  function buyNft(uint256 tokenId) external payable nonReentrant {
      uint256 price = vaultItems[tokenId].price;
      require(msg.value == price, "Transfer Total Amount to complete transaction");
      //the person who wants to buy the NFT should not alredy own it
      require(msg.sender != vaultItems[tokenId].owner, "you alredy own the NFT");
      vaultItems[tokenId].seller.transfer(msg.value);
      nft.transferFrom(address(this), msg.sender, tokenId);
      vaultItems[tokenId].sold = true;
      delete vaultItems[tokenId];
  }

  function cancelSale(uint256 tokenId) external nonReentrant {
      require(vaultItems[tokenId].seller == msg.sender, "NFT not yours");
      nft.transferFrom(address(this), msg.sender, tokenId);
      delete vaultItems[tokenId];
  }
  
  /*
  It returns the price of the selected NFT
  */
  function getPrice(uint256 tokenId) external view returns (uint256) {
      uint256 price = vaultItems[tokenId].price;
      return price;
  }

 function nftListings() external view returns (List[] memory) {
    uint256 nftCount = nft.totalSupply();
    uint currentIndex = 0;
    List[] memory items = new List[](nftCount);
    for (uint i = 0; i < nftCount; i++) {
        //if you do not have the owner in the listing stored matching the address of the smart contract not continue
        if (vaultItems[i + 1].owner == address(this)) {
        uint currentId = i + 1;
        List storage currentItem = vaultItems[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }

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
  Function to be able to change the listing fee because maybe we do some special events
*/
  function changeListingFee(uint256 _newFee)external onlyOwner(){
    listingFee = _newFee;
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