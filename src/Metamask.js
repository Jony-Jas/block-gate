import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function Metamask() {
  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  const [account, setAccount] = useState("");
  // Button handler button for handling a
  // request event for metamask

  const getAddress = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setAccount(account);
  };

  useEffect(() => {
    getAddress();
  }, [account]);

  const btnhandler = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };

  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.formatEther(balance),
        });
      });
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });

    // Setting a balance
    getbalance(account);
  };

  return (
    <div style={{marginTop:30}}>
      <button onClick={btnhandler} variant="primary" style={{ width: "auto" }}>
        Connect to wallet
      </button>
      <br />
      <span style={{ fontSize: "12px" }}>Balance: {data.Balance} eth</span>
      <br />
      <span style={{ fontSize: "12px" }}>{account.substring(0,20)+"............"} </span>
    </div>
  );
}

export default Metamask;
