import "./App.css";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import Transfer from "./Transfer";
import Logs from "./Logs";
import Metamask from "./Metamask";
import logo from "./logo.png";
import { web3, hackContract, contractAddress } from "./web";

function App() {
  const [page, setPage] = useState(0);
  const [login, setLogin] = useState(0);
  const [address, setAddress] = useState("0x00000000");
  const [polygon, setPolygon] = useState(
    Math.floor(Math.random() * 10000000000000)
  );
  const [upi, setUpi] = useState("");
  const [amt, setAmt] = useState(0);

  const [loginUpi, setLoginUpi] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const getValue = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setAddress(account);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(loginPassword);
    if (loginPassword === "password") {
      setLogin(1);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    const gas = await hackContract.methods
      .addUser(address, "password", polygon, upi, amt, 0)
      .estimateGas();
    await hackContract.methods
      .addUser(address, "password", polygon, upi, amt, 0)
      .send({ from: address, gas })
      .then((res) => {
        console.log(res);
      });
    setLogin(1);
  };

  useEffect(() => {
    getValue();
  }, [address]);

  return (
    <div className="App">
      <header className="header">
        <img
          src={logo}
          alt="logo"
          style={{ width: "40px", paddingRight: "10px" }}
        />
        <h3 style={{ fontFamily: "monospace" }}>BlockGate</h3>
      </header>
      {login === 0 && (
        <div
          style={{
            padding: "80px",
            display: "flex",
            height: "85vh",
            padding: 20,
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form style={{ height: "60%" }}>
              <h2>Login</h2>
              <label for="to">To</label>
              <input
                type="text"
                id="to"
                name="to"
                placeholder="@upi"
                value={loginUpi}
                onChange={(e) => setLoginUpi(e.target.value)}
              />

              <label for="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                placeholder="*********"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <button onClick={loginHandler}>Login</button>
            </form>
          </div>

          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form style={{ height: "90%" }}>
              <h2>Create Account</h2>
              <label for="address">Address</label>
              <input
                id="address"
                name="address"
                placeholder="0x00000000"
                value={address}
                readOnly
              />

              <label htmlFor="poly_id">Polygon Id</label>
              <input
                id="poly_id"
                name="poly_id"
                placeholder="- - - - - "
                value={polygon}
                onChange={(e) => setPolygon(e.target.value)}
              />

              <label htmlFor="upi">UPI Id</label>
              <input
                id="upi"
                name="upi"
                placeholder="user@upi"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
              />

              <label htmlFor="amount">Amount wishing to stack Rs.</label>
              <input
                id="amount"
                name="amount"
                placeholder="Amount in rupees"
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
              />

              <button onClick={createHandler}>Create</button>
            </form>
          </div>
        </div>
      )}
      {login === 1 && (
        <div className="content">
          <div className="left">
            <ul>
              <li onClick={() => setPage(0)}>Profile</li>
              <li onClick={() => setPage(1)}>Transfer</li>
              <li onClick={() => setPage(2)}>Logs</li>
              <Metamask />
            </ul>
          </div>
          <div className="right">
            {page === 0 && <Profile upi={loginUpi === "" ? upi : loginUpi} />}
            {page === 1 && <Transfer address={address} />}
            {page === 2 && <Logs />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
