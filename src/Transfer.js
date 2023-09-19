import React, { useState } from "react";
import { web3, hackContract } from "./web";
import transact from "./transact.png";

function Transfer({ address }) {
  const [amt, setAmt] = useState(0);
  const [upi, setUpi] = useState("");
  const [val, setVal] = useState(0);

  const sendEth = async (e) => {
    e.preventDefault();
    // const gas = await hackContract.methods
    const add = await hackContract.methods
      .selectRandomMatchingAddress(address, upi)
      .call();
    //transfer eth to add
    await hackContract.methods.sendMoney(add).send({
      gas: 900000,
      from: address,
      value: web3.utils.toWei(val.toString(), "ether"),
    });
    await hackContract.methods.subAmount(add, amt).send({
      gas: 900000,
      from: address,
    });

    await hackContract.methods.addMerchantAmount(upi, amt).send({
      gas: 900000,
      from: address,
    });

    alert("Send Succesful!!" + add);
  };

  return (
    <div
      style={{
        paddingLeft: "50px",
        display: "flex",
        justifyContent: "space-betweeen",
      }}
    >
      <div>
        <h1 className="heading">Transfer</h1>
        <form style={{padding:40}}>
          <label for="to">
            <h3>To address: </h3>
          </label>
          <input
            type="text"
            id="to"
            name="to"
            placeholder="@upi"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
          />

          <label for="amount">
            <h3>To address:{"Amount(Rs.)"}</h3>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="0.0Rs"
            onChange={async (e) => {
              setAmt(e.target.value);
              fetch(
                "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR"
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return response.json();
                })
                .then((data) => {
                  const ethVal = 1 / data.INR;
                  setVal(ethVal * e.target.value);
                  console.log(data);
                })
                .catch((error) => {
                  console.error("Fetch error:", error);
                });
            }}
          />

          <h4 className="data">~ {val}eth</h4>

          <button onClick={(e) => sendEth(e)}>Send</button>
        </form>
      </div>
      <img src={transact} alt="transact" className="sideImg" style={{width:300,height:300}}/>
    </div>
  );
}

export default Transfer;
