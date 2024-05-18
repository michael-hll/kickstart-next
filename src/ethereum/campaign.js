
const { web3 } = require('./web3');
const Campaign = require('./build/Campaign.json');

function getCampaign(address) {
  return new web3.eth.Contract(
    Campaign.abi,
    address,
  );
}

module.exports = getCampaign;


