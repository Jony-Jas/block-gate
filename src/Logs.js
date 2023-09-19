import React, { useState, useEffect } from "react";
import "./logs.css";

function Logs() {
  // return (
  //   <div>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Sender Id</th>
  //           <th>Amount</th>
  //           <th>Timestamp</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <td>0x90e2018C96ec9d385530751050184B8a6493FD12</td>
  //           <td>0.00000123ETH</td>
  //           <td>2023-09-15 20:03</td>
  //         </tr>
  //         <tr>
  //           <td>0xf8140b04C07e324f9DF1712c0df0b3645086eE55</td>
  //           <td>0.00000342ETH</td>
  //           <td>2023-09-15 20:13</td>
  //         </tr>
  //         <tr>
  //           <td>0xc3a6fcb78CFC15cB1c72AAFbbc7f529E867d22C5</td>
  //           <td>0.00000223ETH</td>
  //           <td>2023-09-15 21:03</td>
  //         </tr>
  //         <tr>
  //           <td>0x43ad78536f4c660B5F9A3A74052bd6E71D1dc537</td>
  //           <td>0.00000563ETH</td>
  //           <td>2023-09-15 21:13</td>
  //         </tr>
  //         <tr>
  //           <td>0x55CC9c773B1501e1201AaC80E6a16ceEb629C3D2</td>
  //           <td>0.00004932ETH</td>
  //           <td>2023-09-15 21:45</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  // );

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // IPFS URL
    const ipfsUrl =
      "https://chocolate-glad-trout-825.mypinata.cloud/ipfs/QmcMovvuvnNyuFDwhP8Vq2LECtUH88MgexY4gTyAdKeDZt";

    // Fetch JSON data from the IPFS address
    fetch(ipfsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set the JSON data in state
        setJsonData(data);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Logs Table</h1>
      {jsonData ? (
        <table>
          <thead>
            <tr>
              {Object.keys(jsonData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jsonData.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading JSON data...</p>
      )}
    </div>
  );
}

export default Logs;
