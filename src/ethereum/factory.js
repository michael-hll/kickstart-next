
const { web3 } = require('./web3');
const CampaignFactory = require('./build/CampaignFactory.json');

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x60BC590d53b7fF5AC3F61a8C0105130C1bc2f95F'
);

module.exports = instance;


