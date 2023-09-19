const Hack = artifacts.require("Hack.sol");

module.exports = function (deployer) {
  deployer.deploy(Hack);
};