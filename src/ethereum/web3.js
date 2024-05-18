const { Web3 } = require('web3');
const { getRootDir } = require('../utils/file');
const path = require('path');
const HDWalletProvider = require("@truffle/hdwallet-provider");

let provider = null;
let web3 = null;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  console.log("web3 injected web3 detected");
  web3 = new Web3(window.ethereum);

  ethereum.on("chainChanged", _chainId => {
    window.location.reload();
  });

  ethereum.on("disconnect", _error => {
    window.location.reload();
  });
} else {
  require("dotenv").config({
    path: path.join(getRootDir(__dirname), ".env"),
  });
  const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
  const network = process.env.SEPOLIA_ENDPOINT;
  console.log(`No web3 instance injected, using server-side web3: ${network}`);
  provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: network
  });
  web3 = new Web3(provider);
}

module.exports = {
  web3,
  web3Provider: provider,
};
