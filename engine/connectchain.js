//importing all the functions from chain change
import {
  bscChain,
  polyChain,
  ethChain,
  hardChain,
  bscTest,
  ethTest,
  polyTest,
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
    var mum = "Mumbai";
    var bsct = "Bsctest";
    var goe = "Goerli";
    var hard = "Hardhat";
    var init = "Set Network";
    if (selectedValue == eth) {
      return <h3>Ethereum</h3>;
      //return <img src="../public/ethereumlogo.png" width={"60px"} />;
    } else if (selectedValue == bsc) {
      return <h3>Binance Smart Chain</h3>;
      //return <img src="../public/bsc.png" width={"60px"} />;
    } else if (selectedValue == pol) {
      return <h3>Polygon</h3>;
      //return <img src="../public/polygonwhite.png" width={"60px"} />;
    } else if (selectedValue == mum) {
      return <h3>Mumbai Testnet</h3>;
    } else if (selectedValue == bsct) {
      return <h3>BSC Testnet</h3>;
    } else if (selectedValue == goe) {
      return <h3>Goerli Testnet</h3>;
    } else if (selectedValue == hard) {
      return <h3>Hardhat Node</h3>;
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
    var mum = "Mumbai";
    var bsct = "Bsctest";
    var goe = "Goerli";
    var hard = "Hardhat";
    //depending on the selcted value connect to x blockchain
    if (bsc == selectedValue) {
      bscChain();
    } else if (poly == selectedValue) {
      polyChain();
    } else if (eth == selectedValue) {
      ethChain();
    } else if (hard == selectedValue) {
      hardChain();
    } else if (bsct == selectedValue) {
      bscTest();
    } else if (goe == selectedValue) {
      ethTest();
    } else if (mum == selectedValue) {
      polyTest();
    }
  }
  //enable the chain that is selected
  useEffect(() => {
    enableChain();
  }, [selected]);

  //This html creates the button. Create the dropdown from nextUI. And finally create also the menu
  return (
    <Col css={{ marginTop: "$6" }}>
      <Dropdown>
        <Dropdown.Button
          aria-label="Connect Wallet"
          flat
          style={{
            background: "#00000070",
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
            backgroundColor: "#ffffff30",
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
            <img src="ethereumlogo.png" width={"20px"} />
            Ethereum
          </Dropdown.Item>
          <Dropdown.Item
            textValue="Binance Smart Chain"
            key="Binance Smart Chain"
          >
            <img src="bsc.png" width={"20px"} />
            Binance Smart Chain
          </Dropdown.Item>
          <Dropdown.Item textValue="Polygon" key="Polygon">
            <img src="polygonwhite.png" width={"20px"} />
            Polygon
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
