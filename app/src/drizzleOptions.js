import Web3 from "web3";
import ComplexStorage from "./contracts/ComplexStorage.json";
import SimpleStorage from "./contracts/SimpleStorage.json";
import TutorialToken from "./contracts/TutorialToken.json";
import BrickCoin from "./contracts/BrickCoin.json";
import BrickCoinStorage from "./contracts/BrickCoinStorage.json";
import Test from "./contracts/Test.json";
import ApplicantStorage from "./contracts/ApplicantStorage.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [ApplicantStorage],
};

export default options;
