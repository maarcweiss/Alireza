export async function bscChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      //connect to the bsc, but if the wallet does not have that blockchain integrated, ask to add it with metamasks API
      params: [{ chainId: "0x38" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          //this method it is going to call the api from metamask
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x38",
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://bsc-dataseed2.defibit.io"],
              blockExplorerUrls: ["https://bscscan.com/"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}
export async function polyChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x89",
              chainName: "Polygon",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://matic-mainnet.chainstacklabs.com"],
              blockExplorerUrls: ["https://polygonscan.com/"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function avaxChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xa86a" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xa86a",
              chainName: "Avalanche Network",
              nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18,
              },
              rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
              blockExplorerUrls: ["https://snowtrace.io/"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function fantomChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xfa" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xfa",
              chainName: "Fantom Opera",
              nativeCurrency: {
                name: "FTM",
                symbol: "FTM",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.ankr.com/fantom"],
              blockExplorerUrls: ["https://ftmscan.com/"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function oasisChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xa516" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xa516",
              chainName: "Emerald Mainnet",
              nativeCurrency: {
                name: "ROSE",
                symbol: "ROSE",
                decimals: 18,
              },
              rpcUrls: ["https://emerald.oasis.dev"],
              blockExplorerUrls: ["https://www.oasisscan.com/"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function celoChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xa4ec" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xa4ec",
              chainName: "Celo",
              nativeCurrency: {
                name: "CELO",
                symbol: "CELO",
                decimals: 18,
              },
              rpcUrls: ["https://forno.celo.org"],
              blockExplorerUrls: ["https://explorer.celo.org"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function cronosChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x19" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x19",
              chainName: "Cronos",
              nativeCurrency: {
                name: "CRO",
                symbol: "CRO",
                decimals: 18,
              },
              rpcUrls: ["https://evm.cronos.org"],
              blockExplorerUrls: ["https://cronoscan.com"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function velasChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x6a" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x6a",
              chainName: "Velas Network",
              nativeCurrency: {
                name: "VLX",
                symbol: "VLX",
                decimals: 18,
              },
              rpcUrls: ["https://evmexplorer.velas.com/rpc"],
              blockExplorerUrls: ["https://evmexplorer.velas.com/rpc"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function moonChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x505" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x505",
              chainName: "Moonriver",
              nativeCurrency: {
                name: "MOVR",
                symbol: "MOVR",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
              blockExplorerUrls: [
                "https://blockscout.moonriver.moonbeam.network/",
              ],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function harmonyChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x63564c40" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x63564c40",
              chainName: "Harmony",
              nativeCurrency: {
                name: "ONE",
                symbol: "ONE",
                decimals: 18,
              },
              rpcUrls: ["https://api.harmony.one"],
              blockExplorerUrls: ["https://explorer.harmony.one"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function ethChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  } catch (switchError) {
    console.log("Wallet Not Connected");
  }
}

export async function hardChain() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x7A69" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x7A69",
              chainName: "HardHat",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["http://node.a3b.io:8545"],
              blockExplorerUrls: [""],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function bscTest() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "BSC Testnet",
              nativeCurrency: {
                name: "tBNB",
                symbol: "tBNB",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545"],
              blockExplorerUrls: ["https://testnet.bscscan.com/"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}

export async function ethTest() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
  } catch (switchError) {
    console.log("Wallet Not Connected");
  }
}

export async function polyTest() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Polygon Mumbai",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding Chain");
      }
    }
  }
}
