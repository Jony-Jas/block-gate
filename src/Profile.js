import React, { useState } from "react";
import { web3, hackContract, contractAddress } from "./web";
import profile from "./profile.png";

function Profile({ upi }) {
  const [data, setData] = useState(null);
  useState(async () => {
    const post = await hackContract.methods.getUser(upi).call();
    setData(post);
    console.log(post);
  }, [data]);

  return (
    <div
      style={{
        paddingLeft: "50px",
        display: "flex",
        justifyContent: "space-betweeen",
      }}
    >
      <div>
        <h1 className="heading">Profile</h1>
        {data && (
          <div>
            <h3>User Address:</h3> <h3 className="data">{data[0]}</h3>
            <h3>Polygon id:</h3>
            <h3 className="data">{data[2].toString()}</h3>
            <h3>UPI id:</h3>
            <h3 className="data">{data[3]}</h3>
            <h3>Staked Amount:</h3>
            <h3 className="data">{data[4].toString()+" ₹"}</h3>
          </div>
        )}
      </div>
      <img src={profile} alt="profile" className="sideImg" />
    </div>
  );
}

export default Profile;
