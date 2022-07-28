/*
Update values accordingly
xxnft is the NFT SmartContract Address
xxmarket is the NFT MarketPlace Address
xxresell is the NFT MarketResell Address
xxnftcol is the already create NFT Collection Address
*/

/*
Private Key Encryption
Replace ethraw with your private key "0xPRIVATEKEY" (Ethereum and other EVM)
Replace hhraw with your private key "0xPRIVATEKEY" (Hardhat)
*/

import SimpleCrypto from "simple-crypto-js";
//to encrypt the private key when I send or request in another page. So if someone presses F12 and looks for the private key
//all they are going to see is an encrypted variable
const cipherKey = "#ffg3$dvcv4rtkljjkh38hhjgt";
//cipherKey is what is going to be used to hash the private key (random string)
const ethraw = "process.env.PRIVATE_KEY";
const hhraw = "process.env.HARDHAT_PRIVATE_KEY";
export const simpleCrypto = new SimpleCrypto(cipherKey);
export const cipherEth = simpleCrypto.encrypt(ethraw);
//ethraw will allow me to interact with ethereum binance or polygon
export const cipherHH = simpleCrypto.encrypt(hhraw);
//hardhat wallet

/*
HardHat Testnet
*/
//resell smart contract in rinkeby
export var hhresell = "0x7D8E774Ac5264053986F1f3AC1fE8Eb7f4bFeCe7";
//pickle nft collection smart contract
export var hhnftcol = "0x490d7e3C011b446E35e24e5F5d1544C04BD4B3d6";
var hhrpc = "http://localhost:8545";

/*
Global Parameters
*/
export var mainnet = hhrpc;
