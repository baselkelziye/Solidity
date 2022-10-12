const BaselCoin = artifacts.require('BaselCoin');

module.exports = async function (deployer) {
  await deployer.deploy(BaselCoin, 500000000, 25);
  console.log(`Contract deployed at -> ${BaselCoin.address}`);
};
//0x455e157cd446392Daa88f5a3c15f95f949666350
