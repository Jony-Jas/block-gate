import { Hack } from "./abi/abi";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
// Contract address of the deployed smart contract
const contractAddress = "0x503ff65416DA623680b3fefd82fEe9D5e0b9314E";
const hackContract = new web3.eth.Contract(Hack, contractAddress);

export { web3, hackContract, contractAddress };
