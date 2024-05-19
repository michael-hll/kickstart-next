
const { web3 } = require('./web3');
const CampaignFactory = require('./build/CampaignFactory.json');

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0xF26504da9d404236aa46EcdFEC1d5dE27a182C79'
);

module.exports = instance;


