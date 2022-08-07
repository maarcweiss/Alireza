// SPDX-License-Identifier: Apache-2.0

//newest solidity version
pragma solidity ^0.8.4;

/*
Importing contracts from openzeppelin(Counters, ERC721URIStorage(to be able to create the NFTs and the metadata uploading the image
#################################################################################################
(The tokenURI on an NFT is a unique identifier of what the token "looks" like. A URI could be an API call over HTTPS, an IPFS hash)
################################################################################################
ERC721(token standart for NFTs and Ownable(modifier for the functions that only the deployer of the smart contract can access(NFTSolution Wallet))))
*/

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//deployed: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

/*
Create the contract and inherit from Ownable and ERC721URIStorage
*/
contract CreateNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address immutable contractAddress;
    uint256 public cost = 0.0075 ether;

    mapping(uint256 => string) private _tokenURIs;

/*
Initialize the contract with both constructors, the one from CreateNFT and the one from ERC721(input just to test)
First deploy the marketplace smart contract and then provide the marketplace address
*/
    constructor(address marketContract) ERC721("Weiss NFT", "MWNFT") {
        contractAddress = marketContract;
    }

/*
Creates the NFT from an image that you select and it keeps the metadata
It expects the tokenURI which we will generate in the nextjs application.
It directly stays the NFT in ou marketplace
*/
    function createNFT(string memory tokenURI) external returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        //mints the NFT created
        _mint(msg.sender, newItemId);
        //we append the tokenId to the tokenURI
        _setTokenURI(newItemId, tokenURI);
        //set approval so the marketplace can move the NFT
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

/*
Mint the NFT, increment the Id and send the fee. It takes the tokenURI as a parameter.
It is meant to be listed for sale.
Function created for the users to keeps their own NFTs, not our marketplace
*/

    function mintNFT(string memory tokenURI) external payable returns (uint) {
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
    function withdraw() external payable onlyOwner() {
        require(payable(msg.sender).send(address(this).balance));
    }
    
    /*
    Receive ether if someone sends this ether to the contract
    */
    fallback()external payable{}

    /*
    Receive ether if someone sends this ether to the contract without data.
    */
    receive() external payable{}
}