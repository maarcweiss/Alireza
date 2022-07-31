// SPDX-License-Identifier: Apache-2.0


pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreateNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    address contractAddress;
    uint256 public cost = 0.0075 ether;

    mapping(uint256 => string) private _tokenURIs;

    constructor(address marketContract) ERC721("Weiss NFT", "MWNFT") {
        contractAddress = marketContract;
    }

/*
Creates the NFT from an image that you select and it keeps the metadata
*/
    function createNFT(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

/*
Mint the NFT, increment the Id and send the fee.
*/

    function mintNFT(string memory tokenURI) public payable returns (uint) {
        require(msg.value == cost, "Need to send 0.075 ether!");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
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