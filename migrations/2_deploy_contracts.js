var SECP256K1 = artifacts.require("./Secp256k1.sol");
var ECCMath = artifacts.require("./ECCMath.sol");
var LinkableRingSignature = artifacts.require("./LinkableRingSignature.sol");
var Owned = artifacts.require("./owned.sol");
var Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(ECCMath);
  deployer.deploy(Owned);
  deployer.deploy(SECP256K1);
  deployer.link(ECCMath, SECP256K1);
  deployer.link(SECP256K1, LinkableRingSignature);
  deployer.deploy(LinkableRingSignature,{gas:3255095}); //3299032
  deployer.link(SECP256K1, Voting);
  deployer.link(Owned, Voting);
  deployer.link(LinkableRingSignature, Voting);
  deployer.deploy(Voting,{gas:5000000});
};
