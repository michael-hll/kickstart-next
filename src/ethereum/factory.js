const { web3 } = require('./web3');
const CampaignFactory = require('./build/CampaignFactory.json');

let factoryAddress = process.env.CAMPAIGN_FACTORY_ADDRESS;

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  factoryAddress,
);

module.exports = instance;


