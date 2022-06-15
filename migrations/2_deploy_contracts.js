const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const BrickCoin = artifacts.require("BrickCoin");
const BrickCoinStorage = artifacts.require("BrickCoinStorage");
const Test = artifacts.require("Test");
const ApplicantStorage = artifacts.require("ApplicantStorage");

module.exports = function(deployer) {
  /*
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(BrickCoin);
  deployer.deploy(BrickCoinStorage);
  deployer.deploy(Test);
  */
  deployer.deploy(BrickCoin);
  deployer.deploy(ApplicantStorage);
};
