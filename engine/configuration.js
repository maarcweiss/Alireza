import SimpleCrypto from "simple-crypto-js";
//to encrypt the private key when I send or request in another page. So if someone presses F12 and looks for the private key
//all they are going to see is an encrypted variable

require("dotenv").config();

export const ethraw = process.env.PRIVATE_KEY;

//*******************PAST ENCRYPTION OF PRIVATE_KEY*****************

//const cipherKey = "#ffg3$dvcv4rtkljjkh38hhjgt";
//cipherKey is what is going to be used to hash the private key (random string)
// export const simpleCrypto = new SimpleCrypto(cipherKey);
// export const cipherEth = simpleCrypto.encrypt(ethraw);

//ethraw will allow me to interact with ethereum binance, polygon and EVMs

/*
IPFS API DETAILS ###########################CHANGE##############
*/
import { create as ipfsHttpClient } from "ipfs-http-client";
export const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

/**---------------------------ADD OPTIMISM****************************** */

/*
Rinkeby Testnet 
*/
export var rinresell = "0x2805433B892b60FFeF77B1443e8b0900cba60368";
export var rinnftcol = "0xb9dC8E95A10977f262237E6fCB943551e64a96e4";
export var rinnft = "0x308Ae97773A0a4aF4b7460A9960b25E50E5e2C5f";
export var rinmarket = "0xB3c2653748b47Ce71AF5f20589d34dAbdc34fB4F";
export var rinrpc = "https://rpc.ankr.com/eth_rinkeby";

/*
Global Parameters
*/
export var mainnet = rinrpc;

/*
Goerli Testnet
*/
export var goeresell = "YOUR CONTRACT ADDRESS";
export var goenftcol = "YOUR CONTRACT ADDRESS";
export var goenft = "YOUR CONTRACT ADDRESS";
export var goemarket = "YOUR CONTRACT ADDRESS";
export var goerpc = "https://rpc.ankr.com/eth_goerli";

/*
BSC Testnet
*/
export var bsctresell = "YOUR CONTRACT ADDRESS";
export var bsctnftcol = "YOUR CONTRACT ADDRESS";
export var bsctnft = "YOUR CONTRACT ADDRESS";
export var bsctmarket = "YOUR CONTRACT ADDRESS";
export var bsctrpc = "https://data-seed-prebsc-2-s3.binance.org:8545";

/*
Mumbai Testnet
*/
export var mmresell = "YOUR CONTRACT ADDRESS";
export var mmnftcol = "YOUR CONTRACT ADDRESS";
export var mmnft = "YOUR CONTRACT ADDRESS";
export var mmmarket = "YOUR CONTRACT ADDRESS";
export var mmrpc = "https://matic-testnet-archive-rpc.bwarelabs.com";

/*
Ethereum
*/
export var ethresell = "YOUR CONTRACT ADDRESS";
export var ethnftcol = "YOUR CONTRACT ADDRESS";
export var ethnft = "YOUR CONTRACT ADDRESS";
export var ethmarket = "YOUR CONTRACT ADDRESS";
//-------------------------CHECK IF IT IS THE CORRECT ONE-------------------------------
export var ethrpc = "https://rpc.ankr.com/eth";

/*
BSC
*/
export var bscresell = "YOUR CONTRACT ADDRESS";
export var bscnftcol = "YOUR CONTRACT ADDRESS";
export var bscnft = "YOUR CONTRACT ADDRESS";
export var bscmarket = "YOUR CONTRACT ADDRESS";
export var bscrpc = "https://bsc-dataseed2.defibit.io";

/*
Polygon
*/
export var polresell = "YOUR CONTRACT ADDRESS";
export var polnftcol = "YOUR CONTRACT ADDRESS";
export var polnft = "YOUR CONTRACT ADDRESS";
export var polmarket = "YOUR CONTRACT ADDRESS";
export var polrpc = "https://matic-mainnet.chainstacklabs.com";

/*
Oasis Network
*/
export var roseresell = "YOUR CONTRACT ADDRESS";
export var rosenftcol = "YOUR CONTRACT ADDRESS";
export var rosenft = "YOUR CONTRACT ADDRESS";
export var rosemarket = "YOUR CONTRACT ADDRESS";
export var roserpc = "https://emerald.oasis.dev";

/*
Velas
*/
export var velresell = "YOUR CONTRACT ADDRESS";
export var velnftcol = "YOUR CONTRACT ADDRESS";
export var velnft = "YOUR CONTRACT ADDRESS";
export var velmarket = "YOUR CONTRACT ADDRESS";
export var velrpc = "https://evmexplorer.velas.com/rpc";

/*
Fantom
*/
export var fantresell = "YOUR CONTRACT ADDRESS";
export var fantnftcol = "YOUR CONTRACT ADDRESS";
export var fantnft = "YOUR CONTRACT ADDRESS";
export var fantmarket = "YOUR CONTRACT ADDRESS";
export var fantrpc = "https://rpc.ankr.com/fantom";

/*
Harmony
*/
export var harresell = "YOUR CONTRACT ADDRESS";
export var harnftcol = "YOUR CONTRACT ADDRESS";
export var harnft = "YOUR CONTRACT ADDRESS";
export var harmarket = "YOUR CONTRACT ADDRESS";
export var harrpc = "https://api.harmony.one";

/*
Celo
*/
export var celresell = "YOUR CONTRACT ADDRESS";
export var celnftcol = "YOUR CONTRACT ADDRESS";
export var celnft = "YOUR CONTRACT ADDRESS";
export var celmarket = "YOUR CONTRACT ADDRESS";
export var celrpc = "https://forno.celo.org";

/*
Cronos
*/
export var croresell = "YOUR CONTRACT ADDRESS";
export var cronftcol = "YOUR CONTRACT ADDRESS";
export var cronft = "YOUR CONTRACT ADDRESS";
export var cromarket = "YOUR CONTRACT ADDRESS";
export var crorpc = "https://evm.cronos.org";

/*
Moonriver
*/
export var moonresell = "YOUR CONTRACT ADDRESS";
export var moonnftcol = "YOUR CONTRACT ADDRESS";
export var moonnft = "YOUR CONTRACT ADDRESS";
export var moonmarket = "YOUR CONTRACT ADDRESS";
export var moonrpc = "https://rpc.moonriver.moonbeam.network";

/*
Avalanche
*/
export var avaxresell = "YOUR CONTRACT ADDRESS";
export var avaxnftcol = "YOUR CONTRACT ADDRESS";
export var avaxnft = "YOUR CONTRACT ADDRESS";
export var avaxmarket = "YOUR CONTRACT ADDRESS";
export var avaxrpc = "https://api.avax.network/ext/bc/C/rpc";
