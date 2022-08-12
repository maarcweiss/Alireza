import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import Resell from "../engine/Resell.json";
import NFTCollection from "../engine/NFTCollection.json";
import NFT from "../engine/NFT.json";
import {
  Card,
  Button,
  Input,
  Col,
  Row,
  Spacer,
  Container,
  Text,
  Grid,
} from "@nextui-org/react";
import axios from "axios";
import "sf-font";
import Web3 from "web3";
//importing the functions from the changechain function so we are able to change(ADD THE OTHER ONES THAT WE NEED)
import {
  polyTest,
  ethTest,
  bscTest,
  bscChain,
  polyChain,
  ethChain,
  avaxChain,
  fantomChain,
  oasisChain,
  celoChain,
  harmonyChain,
  cronosChain,
  velasChain,
  moonChain,
  hardChain,
  rinTest,
} from "../engine/chainchange";
//import to be able to see on what blockchain our metamask is connected to.
import detectEthereumProvider from "@metamask/detect-provider";
//import all from the connection to blockchains but not the resell smart contract
import { mmnft, mmresell, mmnftcol, mmrpc } from "../engine/configuration";
import { goenft, goeresell, goenftcol, goerpc } from "../engine/configuration";
import { hhnft, hhresell, hhnftcol, hhrpc } from "../engine/configuration";
import {
  bsctnft,
  bsctresell,
  bsctnftcol,
  bsctrpc,
} from "../engine/configuration";
import { ethnft, ethresell, ethnftcol, ethrpc } from "../engine/configuration";
import { bscnft, bscresell, bscnftcol, bscrpc } from "../engine/configuration";
import { polnft, polresell, polnftcol, polrpc } from "../engine/configuration";
import {
  rosenft,
  roseresell,
  rosenftcol,
  roserpc,
} from "../engine/configuration";
import { velnft, velresell, velnftcol, velrpc } from "../engine/configuration";
import {
  fantnft,
  fantresell,
  fantnftcol,
  fantrpc,
} from "../engine/configuration";
import { harnft, harresell, harnftcol, harrpc } from "../engine/configuration";
import { celnft, celresell, celnftcol, celrpc } from "../engine/configuration";
import { cronft, croresell, cronftcol, crorpc } from "../engine/configuration";
import {
  avaxnft,
  avaxresell,
  avaxnftcol,
  avaxrpc,
} from "../engine/configuration";
import {
  moonnft,
  moonresell,
  moonnftcol,
  moonrpc,
} from "../engine/configuration";
import { rinnft, rinresell, rinnftcol, rinrpc } from "../engine/configuration";
import {
  mainnet,
  cipherEth,
  simpleCrypto,
  ethraw,
} from "../engine/configuration";

export default function Sell() {
  const [user, getUser] = useState([]);
  const [chain, getChainName] = useState([]);
  //get the RPC to use it in the function getWalletNFts to connect to blockchains
  //----------------use RPC instead of mainnet when really deploying------------
  const [rpc, getRpc] = useState([]);
  const [nftcol, getNftCol] = useState([]);
  const [nftcustom, getNftCustom] = useState([]);
  const [nftresell, getNftResell] = useState([]);
  const [created, getCreated] = useState([]);
  const [resalePrice, updateresalePrice] = useState({ price: "" });
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    getChain();
    setRpc();
  }, [setNfts, getUser, getCreated]);
  const router = useRouter();

  /*
 Compare the values and if so change the mainnet blockchain to the one that we are in
 */
  async function setRpc() {
    var hh = "0x7a69";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var movr = "0x505";
    var avax = "0xa86a";
    var cro = "0x19";
    var celo = "0xa4ec";
    var rose = "0xa516";
    var ftm = "0xfa";
    var one = "0x63564c40";
    var vlx = "0x6a";
    var pol = "0x89";
    var bsc = "0x38";
    var eth = "0x1";
    var rin = "0x4";

    const connected = await detectEthereumProvider();
    if (connected.chainId == hh) {
      var mainnet = hhrpc;
    } else if (connected.chainId == goe) {
      var mainnet = goerpc;
    } else if (connected.chainId == mm) {
      var mainnet = mmrpc;
    } else if (connected.chainId == bsct) {
      var mainnet = bsctrpc;
    } else if (connected.chainId == movr) {
      var mainnet = moonrpc;
    } else if (connected.chainId == avax) {
      var mainnet = avaxrpc;
    } else if (connected.chainId == cro) {
      var mainnet = crorpc;
    } else if (connected.chainId == celo) {
      var mainnet = celrpc;
    } else if (connected.chainId == eth) {
      var mainnet = ethrpc;
    } else if (connected.chainId == bsc) {
      var mainnet = bscrpc;
    } else if (connected.chainId == rose) {
      var mainnet = roserpc;
    } else if (connected.chainId == vlx) {
      var mainnet = velrpc;
    } else if (connected.chainId == ftm) {
      var mainnet = fantrpc;
    } else if (connected.chainId == one) {
      var mainnet = harrpc;
    } else if (connected.chainId == pol) {
      var mainnet = polrpc;
    } else if (connected.chainId == rin) {
      var mainnet = rinrpc;
    }
    getRpc(mainnet);
    console.log(mainnet);
    setNftCol();
  }

  /*
set the NFT collection smart contract that you want to allow user to sell NFTs from
*/
  async function setNftCol() {
    var hh = "0x7a69";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var movr = "0x505";
    var avax = "0xa86a";
    var cro = "0x19";
    var celo = "0xa4ec";
    var rose = "0xa516";
    var ftm = "0xfa";
    var one = "0x63564c40";
    var vlx = "0x6a";
    var pol = "0x89";
    var bsc = "0x38";
    var eth = "0x1";
    var rin = "0x4";

    const connected = await detectEthereumProvider();
    if (connected.chainId == hh) {
      var nftcol = hhnftcol;
    } else if (connected.chainId == goe) {
      var nftcol = goenftcol;
    } else if (connected.chainId == mm) {
      var nftcol = mmnftcol;
    } else if (connected.chainId == bsct) {
      var nftcol = bsctnftcol;
    } else if (connected.chainId == movr) {
      var nftcol = moonnftcol;
    } else if (connected.chainId == avax) {
      var nftcol = avaxnftcol;
    } else if (connected.chainId == cro) {
      var nftcol = cronftcol;
    } else if (connected.chainId == celo) {
      var nftcol = celnftcol;
    } else if (connected.chainId == eth) {
      var nftcol = ethnftcol;
    } else if (connected.chainId == bsc) {
      var nftcol = bscnftcol;
    } else if (connected.chainId == rose) {
      var nftcol = rosenftcol;
    } else if (connected.chainId == vlx) {
      var nftcol = velnftcol;
    } else if (connected.chainId == ftm) {
      var nftcol = fantnftcol;
    } else if (connected.chainId == one) {
      var nftcol = harnftcol;
    } else if (connected.chainId == pol) {
      var nftcol = polnftcol;
    } else if (connected.chainId == rin) {
      var nftcol = rinnftcol;
    }
    getNftCol(nftcol);
    console.log(nftcol);
    setNftCustom();
  }
  /*
Update the NFT smart contract address of the blockchain that I have selected
*/
  async function setNftCustom() {
    var hh = "0x7a69";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var movr = "0x505";
    var avax = "0xa86a";
    var cro = "0x19";
    var celo = "0xa4ec";
    var rose = "0xa516";
    var ftm = "0xfa";
    var one = "0x63564c40";
    var vlx = "0x6a";
    var pol = "0x89";
    var bsc = "0x38";
    var eth = "0x1";
    var rin = "0x4";

    const connected = await detectEthereumProvider();
    if (connected.chainId == hh) {
      var nft = hhnft;
    } else if (connected.chainId == goe) {
      var nft = goenft;
    } else if (connected.chainId == mm) {
      var nft = mmnft;
    } else if (connected.chainId == bsct) {
      var nft = bsctnft;
    } else if (connected.chainId == movr) {
      var nft = moonnft;
    } else if (connected.chainId == avax) {
      var nft = avaxnft;
    } else if (connected.chainId == cro) {
      var nft = cronft;
    } else if (connected.chainId == celo) {
      var nft = celnft;
    } else if (connected.chainId == eth) {
      var nft = ethnft;
    } else if (connected.chainId == bsc) {
      var nft = bscnft;
    } else if (connected.chainId == rose) {
      var nft = rosenft;
    } else if (connected.chainId == vlx) {
      var nft = velnft;
    } else if (connected.chainId == ftm) {
      var nft = fantnft;
    } else if (connected.chainId == one) {
      var nft = harnft;
    } else if (connected.chainId == pol) {
      var nft = polnft;
    } else if (connected.chainId == rin) {
      var nft = rinnft;
    }
    getNftCustom(nft);
    console.log(nft);
    setNftResell();
  }
  /*
Same aproach, set the NFT resell value, to be the particular smart contract
*/
  async function setNftResell() {
    var hh = "0x7a69";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var movr = "0x505";
    var avax = "0xa86a";
    var cro = "0x19";
    var celo = "0xa4ec";
    var rose = "0xa516";
    var ftm = "0xfa";
    var one = "0x63564c40";
    var vlx = "0x6a";
    var pol = "0x89";
    var bsc = "0x38";
    var eth = "0x1";
    var rin = "0x4";

    const connected = await detectEthereumProvider();
    if (connected.chainId == hh) {
      var nftresell = hhresell;
    } else if (connected.chainId == goe) {
      var nftresell = goeresell;
    } else if (connected.chainId == mm) {
      var nftresell = mmresell;
    } else if (connected.chainId == bsct) {
      var nftresell = bsctresell;
    } else if (connected.chainId == movr) {
      var nftresell = moonresell;
    } else if (connected.chainId == avax) {
      var nftresell = avaxresell;
    } else if (connected.chainId == cro) {
      var nftresell = croresell;
    } else if (connected.chainId == celo) {
      var nftresell = celresell;
    } else if (connected.chainId == eth) {
      var nftresell = ethresell;
    } else if (connected.chainId == bsc) {
      var nftresell = bscresell;
    } else if (connected.chainId == rose) {
      var nftresell = roseresell;
    } else if (connected.chainId == vlx) {
      var nftresell = velresell;
    } else if (connected.chainId == ftm) {
      var nftresell = fantresell;
    } else if (connected.chainId == one) {
      var nftresell = harresell;
    } else if (connected.chainId == pol) {
      var nftresell = polresell;
    } else if (connected.chainId == rin) {
      var nftresell = rinresell;
    }
    getNftResell(nftresell);
    console.log(nftresell);
  }

  /*
  It gets the chain name and it displays it so you can see it
  */

  async function getChain() {
    var hh = "0x7a69";
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    var movr = "0x505";
    var avax = "0xa86a";
    var cro = "0x19";
    var celo = "0xa4ec";
    var rose = "0xa516";
    var ftm = "0xfa";
    var one = "0x63564c40";
    var vlx = "0x6a";
    var pol = "0x89";
    var bsc = "0x38";
    var eth = "0x1";
    var rin = "0x4";

    const connected = await detectEthereumProvider();
    if (connected.chainId == hh) {
      var chainname = "HardHat";
    } else if (connected.chainId == goe) {
      var chainname = "Goerli Testnet";
    } else if (connected.chainId == mm) {
      var chainname = "Mumbai Testnet";
    } else if (connected.chainId == bsct) {
      var chainname = "BSC Testnet";
    } else if (connected.chainId == movr) {
      var chainname = "Moonriver";
    } else if (connected.chainId == avax) {
      var chainname = "Avalanche";
    } else if (connected.chainId == cro) {
      var chainname = "Cronos";
    } else if (connected.chainId == celo) {
      var chainname = "Celo";
    } else if (connected.chainId == eth) {
      var chainname = "Ethereum";
    } else if (connected.chainId == bsc) {
      var chainname = "Binance Smart Chain";
    } else if (connected.chainId == rose) {
      var chainname = "Emerald";
    } else if (connected.chainId == vlx) {
      var chainname = "Velas";
    } else if (connected.chainId == ftm) {
      var chainname = "Fantom";
    } else if (connected.chainId == one) {
      var chainname = "Harmony";
    } else if (connected.chainId == pol) {
      var chainname = "Polygon";
    } else if (connected.chainId == rin) {
      var chainname = "Rinkeby Test Network";
    }
    getChainName(chainname);
    console.log(chainname);
  }
  /*
  This function gets the wallet address
  */
  async function connectUser() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(signer);
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send("eth_requestAccounts");
      var accounts = await web3.eth.getAccounts();
      var account = accounts[0];
    }
    getUser(account);
  }

  /*
  get the NFT that a wallet holds
  mainnet comes from configuration.js, I need to be able to swap the mainnet and
  to the actual chain RPC address on the fly
  ###################################
  Most important function in our site. It is going to enable us to get all the metadata from the NFTs without the need of any API
  ###################################
  What the function does
  1 Contact the nftcontract and gets the token supply(the NFTs minted)
  2 Calls the owner of the TokenId while finding on the loop
  3 After I got the owner, we take the tokenURI for this tokenId and this will give me the value in IPFS://....json
  4 convert this ipfs into https://ipfs.io/
  5 after it will render the image
  */
  async function getWalletNFTs() {
    var address = nftcol;
    //var network = rpc;
    console.log(address);
    const provider = new ethers.providers.JsonRpcProvider(mainnet);
    //it grabs the cypher private key just imported
    const key = simpleCrypto.decrypt(cipherEth);
    const wallet = new ethers.Wallet(key, provider);
    const contract = new ethers.Contract(address, NFTCollection, wallet);
    const itemArray = [];
    /*
    the first thing that you need is the tokenSupply from the NFT collection
    the loop consists of each in tokensupply
    we are going to take the owner of token id
    */
    contract.totalSupply().then((result) => {
      for (let i = 0; i < result; i++) {
        var token = i + 1;
        //I am token the owner of the NFT
        const owner = contract.ownerOf(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const rawUri = contract.tokenURI(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const Uri = Promise.resolve(rawUri);
        const getUri = Uri.then((value) => {
          var cleanUri = value.replace("ipfs://", "https://ipfs.io/ipfs/");
          let metadata = axios.get(cleanUri).catch(function (error) {
            console.log(error.toJSON());
          });
          return metadata;
        });
        getUri.then((value) => {
          let rawImg = value.data.image;
          var name = value.data.name;
          var desc = value.data.description;
          //START BUILDING THE IMAGE
          let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
          Promise.resolve(owner).then((value) => {
            //it gives the hexadecimal wallet address
            let ownerW = value;
            //get the tokens from the owner wallet
            let meta = {
              name: name,
              img: image,
              tokenId: token,
              wallet: ownerW,
              desc,
            };
            console.log(meta);
            itemArray.push(meta);
          });
        });
      }
    });
    //wait 2 seconds to let the html render
    await new Promise((r) => setTimeout(r, 2000));
    //I store all the info in the array
    setNfts(itemArray);
    setLoadingState("loaded");
  }
  /*
Funtion to obtain the NFTs that were created
*/
  async function getCreatedNFTs() {
    var address = nftcustom;
    //var network = rpc;
    const provider = new ethers.providers.JsonRpcProvider(mainnet);
    // const key = simpleCrypto.decrypt(cipherEth);
    const wallet = new ethers.Wallet(ethraw, provider);
    const contract = new ethers.Contract(address, NFT, wallet);
    const itemArray = [];
    //calling the tokenIds
    contract._tokenIds().then((result) => {
      for (let i = 0; i < result; i++) {
        var token = i + 1;
        const owner = contract.ownerOf(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const rawUri = contract.tokenURI(token).catch(function (error) {
          console.log("tokens filtered");
        });
        const Uri = Promise.resolve(rawUri);
        const getUri = Uri.then((value) => {
          var cleanUri = value.replace("ipfs://", "https://ipfs.io/ipfs/");
          let metadata = axios.get(cleanUri).catch(function (error) {
            console.log(error.toJSON());
          });
          return metadata;
        });
        getUri.then((value) => {
          let rawImg = value.data.image;
          var name = value.data.name;
          var desc = value.data.description;
          let image = rawImg.replace("ipfs://", "https://ipfs.io/ipfs/");
          Promise.resolve(owner).then((value) => {
            let ownerW = value;
            let meta = {
              name: name,
              img: image,
              tokenId: token,
              wallet: ownerW,
              desc,
            };
            console.log(meta);
            itemArray.push(meta);
          });
        });
      }
    });
    await new Promise((r) => setTimeout(r, 2000));
    getCreated(itemArray);
    setLoadingState("loaded");
  }

  /*
  It is going to be used on a button to refresh the NFTs, so it will invoke all the function sonce again
  */
  async function refreshNFTs() {
    connectUser();
    setRpc();
    getCreatedNFTs();
    getWalletNFTs();
    getChain();
  }

  /*
  Connect wallet because mabe someone has still not connected to the marketplace
  */
  async function connectWallet() {
    connectUser();
    setRpc();
    getChain();
  }

  //if you dont have the info yet, consider that you do not have the NFTS and then it will display the message, no NFTs found
  if (loadingState === "loaded" && !nfts.length)
    return (
      <Container sm>
        <Row>
          <Col>
            <Text h3>No NFT's Found, Connect Wallet</Text>
            <Button
              size="sm"
              color="gradient"
              onPress={refreshNFTs}
              style={{ fontSize: "20px" }}
            >
              Refresh
            </Button>
          </Col>
        </Row>
        <Spacer></Spacer>
      </Container>
    );
  return (
    <div>
      <Container md>
        <Row>
          <Col css={{ size: "$50", paddingLeft: "$10", paddingTop: "$4" }}>
            <Card css={{ p: "$11", backgroundColor: "$blue200" }}>
              <Row>
                <Text h4 css={{ marginRight: "$7" }}>
                  Switch Blockchain
                </Text>
                <Button size="sm" onPress={rinTest}>
                  <img src="ethereumlogo.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={bscChain}>
                  <img src="bsc.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={ethChain}>
                  <img src="ethereumlogo.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={polyChain}>
                  <img src="polygonwhite.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={avaxChain}>
                  <img src="avax.jpg" width={"100px"} />
                </Button>
                <Button size="sm" onPress={celoChain}>
                  <img src="celo.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={fantomChain}>
                  <img src="ftm.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={harmonyChain}>
                  <img src="harmony.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={moonChain}>
                  <img src="moon.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={oasisChain}>
                  <img src="rose.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={velasChain}>
                  <img src="velas.png" width={"100px"} />
                </Button>
                <Button size="sm" onPress={cronosChain}>
                  <img src="cronos.png" width={"100px"} />
                </Button>
              </Row>
              <Card css={{ p: "$4", marginTop: "$3" }}>
                <Text h3>
                  Wallet
                  <Text h5 css={{ color: "#39FF14" }}>
                    {user}
                  </Text>
                </Text>
                <Text h6>Selected Chain: {chain}</Text>
                <Row>
                  <Button
                    size="sm"
                    color="gradient"
                    onPress={connectWallet}
                    style={{ fontSize: "22px", marginRight: "4px" }}
                  >
                    Connect
                  </Button>
                  <Button
                    size="sm"
                    color="gradient"
                    onPress={refreshNFTs}
                    style={{ fontSize: "22px" }}
                  >
                    Refresh
                  </Button>
                </Row>
              </Card>
            </Card>
          </Col>
        </Row>
        <Row>
          <Grid.Container gap={3}>
            {nfts.map((nft, i) => {
              var owner = user;
              //get the output from meta in getWalletNFTs(metadata)
              //if whoever connected to the app is == to the wallet owner of the NFT just stored, the proceed to render
              if (owner.indexOf(nft.wallet) !== -1) {
                async function executeRelist() {
                  const { price } = resalePrice;
                  //if the NFT has a price then execute the relist function
                  if (!price) return;
                  try {
                    relistNFT();
                  } catch (error) {
                    //if the user does not input a price set an error
                    console.log("Transaction Failed", error);
                  }
                }
                //function that is going to talk to the marketplace smart contract and allow you to relist
                async function relistNFT() {
                  var resell = nftresell;
                  const web3Modal = new Web3Modal();
                  const connection = await web3Modal.connect();
                  const provider = new ethers.providers.Web3Provider(
                    connection
                  );
                  const signer = provider.getSigner();
                  //convert the value into ether
                  const price = ethers.utils.parseUnits(
                    resalePrice.price,
                    "ether"
                  );
                  const contractnft = new ethers.Contract(
                    nftcol,
                    NFTCollection,
                    signer
                  );
                  //set approvalforall because we are moving the NFT to another smart contract
                  await contractnft.setApprovalForAll(resell, true);
                  //calling the contract and the resell smart contract and the resell abi and the signer that is the wallet
                  let contract = new ethers.Contract(resell, Resell, signer);
                  //get the listing fee and convert it to string
                  let listingFee = await contract.getListingFee();
                  listingFee = listingFee.toString();
                  //send the request to list the NFT for sale
                  let transaction = await contract.listSale(
                    nft.tokenId,
                    price,
                    {
                      value: listingFee,
                    }
                  );
                  await transaction.wait();
                  router.push("/");
                }
                return (
                  <Grid>
                    <a>
                      <Card
                        isHoverable
                        key={i}
                        css={{ mw: "200px", marginRight: "$1" }}
                        variant="bordered"
                      >
                        <Card.Image src={nft.img} />
                        <Card.Body sm key={i}>
                          <h3
                            style={{
                              color: "#9D00FF",
                              fontFamily: "SF Pro Display",
                            }}
                          >
                            Owned by You
                          </h3>
                          <Text h5>
                            {nft.name} Token-{nft.tokenId}
                          </Text>
                          <Text>{nft.desc}</Text>
                          <Input
                            size="sm"
                            css={{
                              marginTop: "$2",
                              maxWidth: "120px",
                              marginBottom: "$2",
                              border: "$blue500",
                            }}
                            style={{
                              color: "white",
                              fontFamily: "SF Pro Display",
                              fontWeight: "bolder",
                              fontSize: "15px",
                            }}
                            placeholder="Set your price"
                            //putting a value and calling the upper function
                            onChange={(e) =>
                              updateresalePrice({
                                ...resalePrice,
                                price: e.target.value,
                              })
                            }
                          />
                          <Button
                            size="sm"
                            color="gradient"
                            onPress={executeRelist}
                            style={{ fontSize: "20px" }}
                          >
                            Relist for Sale
                          </Button>
                        </Card.Body>
                      </Card>
                    </a>
                  </Grid>
                );
              }
            })}
          </Grid.Container>
        </Row>
      </Container>
      <Spacer></Spacer>
      <Container md>
        <Text h4>Personal NFTs</Text>
        <Row>
          <Grid.Container justify="flex-start" gap={3}>
            {created.map((nft, i) => {
              var owner = user;
              if (owner.indexOf(nft.wallet) !== -1) {
                return (
                  <Grid>
                    <a>
                      <Card
                        isHoverable
                        key={i}
                        css={{ mw: "100px", marginRight: "$1" }}
                        variant="bordered"
                      >
                        <Card.Image src={nft.img} />
                        <Card.Body sm key={i}>
                          <h3
                            style={{
                              color: "#9D00FF",
                              fontFamily: "SF Pro Display",
                            }}
                          >
                            Owned by You
                          </h3>
                          <Text h5>
                            {nft.name} Token-{nft.tokenId}
                          </Text>
                          <Text>{nft.desc}</Text>
                        </Card.Body>
                      </Card>
                    </a>
                  </Grid>
                );
              }
            })}
          </Grid.Container>
        </Row>
      </Container>
    </div>
  );
}
