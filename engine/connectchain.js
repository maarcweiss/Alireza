//importing all the functions from chain change
import {
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
  bscTest,
  ethTest,
  polyTest,
  rinTest,
} from "./chainchange";
import "sf-font";
import { Col, Dropdown } from "@nextui-org/react";
import React from "react";
import { useEffect } from "react";

//function to call the button
export default function ConnectChain() {
  const [selected, setSelected] = React.useState(new Set(["Set Network"]));
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const blockImage = React.useMemo(() => {
    var eth = "Ethereum";
    var bsc = "Binance Smart Chain";
    var pol = "Polygon";
    var avax = "Avalanche Network";
    var ftm = "Fantom Opera";
    var rose = "Emerald Mainnet";
    var one = "Harmony";
    var celo = "Celo";
    var cro = "Cronos";
    var vlx = "Velas Network ";
    var movr = "Moonriver";
    var mum = "Mumbai";
    var bsct = "Bsctest";
    var goe = "Goerli";
    var hard = "Hardhat";
    var init = "Set Network";
    var rin = "Rinkeby Test Network";

    if (selectedValue == eth) {
      return <h3>Ethereum</h3>;
    } else if (selectedValue == bsc) {
      return <h3>Binance Smart Chain</h3>;
    } else if (selectedValue == pol) {
      return <h3>Polygon</h3>;
    } else if (selectedValue == avax) {
      return <h3>Avalanche Network</h3>;
    } else if (selectedValue == ftm) {
      return <h3>Fantom Opera</h3>;
    } else if (selectedValue == rose) {
      return <h3>Emerald Mainnet</h3>;
    } else if (selectedValue == celo) {
      return <h3>Celo</h3>;
    } else if (selectedValue == one) {
      return <h3>Harmony</h3>;
    } else if (selectedValue == cro) {
      return <h3>Cronos</h3>;
    } else if (selectedValue == vlx) {
      return <h3>Velas Network</h3>;
    } else if (selectedValue == movr) {
      return <h3>Moonriver</h3>;
    } else if (selectedValue == mum) {
      return <h3>Mumbai Testnet</h3>;
    } else if (selectedValue == bsct) {
      return <h3>BSC Testnet</h3>;
    } else if (selectedValue == goe) {
      return <h3>Goerli Testnet</h3>;
    } else if (selectedValue == hard) {
      return <h3>Hardhat Node</h3>;
    } else if (selectedValue == rin) {
      return <h3>Rinkeby Test Network</h3>;
    } else if (selectedValue == init) {
      return (
        <div className="mt-4">
          <h3>Select Network</h3>
        </div>
      );
    }
  });

  //function that enables the connection to the wallet, ets the value in text of whatever the user clocked and compare that.
  async function enableChain() {
    var bsc = "Binance Smart Chain";
    var poly = "Polygon";
    var eth = "Ethereum";
    var avax = "Avalanche Network";
    var ftm = "Fantom Opera";
    var rose = "Emerald Mainnet";
    var one = "Harmony";
    var celo = "Celo";
    var cro = "Cronos";
    var vlx = "Velas Network";
    var movr = "Moonriver";
    var mum = "Mumbai";
    var bsct = "Bsctest";
    var goe = "Goerli";
    var hard = "Hardhat";
    var rin = "Rinkeby Test Network";

    //depending on the selcted value connect to x blockchain
    if (bsc == selectedValue) {
      bscChain();
    } else if (poly == selectedValue) {
      polyChain();
    } else if (eth == selectedValue) {
      ethChain();
    } else if (avax == selectedValue) {
      avaxChain();
    } else if (rose == selectedValue) {
      oasisChain();
    } else if (ftm == selectedValue) {
      fantomChain();
    } else if (celo == selectedValue) {
      celoChain();
    } else if (one == selectedValue) {
      harmonyChain();
    } else if (cro == selectedValue) {
      cronosChain();
    } else if (vlx == selectedValue) {
      velasChain();
    } else if (movr == selectedValue) {
      moonChain();
    } else if (hard == selectedValue) {
      hardChain();
    } else if (bsct == selectedValue) {
      bscTest();
    } else if (goe == selectedValue) {
      ethTest();
    } else if (mum == selectedValue) {
      polyTest();
    } else if (rin == selectedValue) {
      rinTest();
    }
  }

  //enable the chain that is selected
  useEffect(() => {
    enableChain();
  }, [selected]);

  //This html creates the button. Create the dropdown from nextUI. And finally create also the menu
  return (
    <Col css={{ marginTop: "$5" }}>
      <Dropdown>
        <Dropdown.Button
          aria-label="Connect Wallet"
          flat
          style={{
            background: "#00000090",
            boxShadow: "0px 0px 4px #ffffff",
            fontFamily: "SF Pro Display",
            fontWeight: "500",
            color: "white",
            fontSize: "20px",
          }}
          css={{ tt: "capitalize" }}
        >
          {blockImage}
        </Dropdown.Button>
        <Dropdown.Menu
          css={{
            backgroundColor: "#FFFFFF",
          }}
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          //each item will have a key
          //obtain the selected one and process the function to connect to the blockchain
          selectedKeys={selected}
          onSelectionChange={setSelected}
          textValue={selected}
        >
          <Dropdown.Item textValue="Ethereum" key="Ethereum">
            <img
              src="ethereumlogo.png"
              style={{ width: "15px", marginRight: "10px" }}
            />
            Ethereum
          </Dropdown.Item>
          <Dropdown.Item
            textValue="Rinkeby Test Network"
            key="Rinkeby Test Network"
          >
            <img
              src="ethereumlogo.png"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Rinkeby
          </Dropdown.Item>
          <Dropdown.Item
            textValue="Binance Smart Chain"
            key="Binance Smart Chain"
          >
            <img src="bsc.png" style={{ width: "20px", marginRight: "10px" }} />
            Binance Smart Chain
          </Dropdown.Item>
          <Dropdown.Item textValue="Polygon" key="Polygon">
            <img
              src="polygonwhite.png"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Polygon
          </Dropdown.Item>
          <Dropdown.Item textValue="Avalanche Network" key="Avalanche Network">
            <img
              src="avax.jpg"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Avalanche
          </Dropdown.Item>
          <Dropdown.Item textValue="Fantom Opera" key="Fantom Opera">
            <img src="ftm.png" style={{ width: "20px", marginRight: "10px" }} />
            Fantom
          </Dropdown.Item>
          <Dropdown.Item textValue="Velas Network" key="Velas Network">
            <img
              style={{ width: "20px", marginRight: "10px" }}
              src="velas.png"
            />
            Velas Network
          </Dropdown.Item>
          <Dropdown.Item textValue="Emerald Mainnet" key="Emerald Mainnet">
            <img
              style={{ width: "20px", marginRight: "10px" }}
              src="rose.png"
            />
            Oasis Network
          </Dropdown.Item>
          <Dropdown.Item textValue="Harmony" key="Harmony">
            <img
              style={{ width: "20px", marginRight: "10px" }}
              src="harmony.png"
            />
            Harmony
          </Dropdown.Item>
          <Dropdown.Item textValue="Celo" key="Celo">
            <img
              style={{ width: "20px", marginRight: "10px" }}
              src="celo.png"
            />
            Celo
          </Dropdown.Item>
          <Dropdown.Item textValue="Cronos" key="Cronos">
            <img
              style={{ width: "20px", marginRight: "10px" }}
              src="cronos.png"
            />
            Cronos
          </Dropdown.Item>
          <Dropdown.Item textValue="Moonriver" key="Moonriver">
            <img
              style={{ width: "20px", marginRight: "10px" }}
              src="moon.png"
            />
            Moonriver
          </Dropdown.Item>
          <Dropdown.Item textValue="Hardhat" key="Hardhat">
            HardHat Node
          </Dropdown.Item>
          <Dropdown.Item textValue="Goerli" key="Goerli">
            Goerli TestNet
          </Dropdown.Item>
          <Dropdown.Item textValue="Bsctest" key="Bsctest">
            BSC TestNet
          </Dropdown.Item>
          <Dropdown.Item textValue="Mumbai" key="Mumbai">
            Mumbai TestNet
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}
