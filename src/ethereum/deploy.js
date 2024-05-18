const compaignFactory = require("./build/CampaignFactory.json");
const { web3, web3Provider } = require("./web3");

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compaignFactory.abi)
    .deploy({ data: "0x" + compaignFactory.evm.bytecode.object })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  web3Provider.engine.stop();
};


deploy();
// after deploy, can view the contract instance from: https://sepolia.etherscan.io/
// contract address: 0x53Fe24801649B17c770047e8e4F5De16Ae16b792
// you can also deploy or call the contract methods from https://remix.ethereum.org/
