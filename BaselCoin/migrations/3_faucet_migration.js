const Faucet = artifacts.require('Faucet');
module.exports = async function (deployer) {
  await deployer.deploy(Faucet, '0x455e157cd446392Daa88f5a3c15f95f949666350');
  console.log(`Contract deployed at -> ${Faucet.address}`);
};
//0x29d3b68eBE8a68048E922b58Eed8540Cb485e18f
