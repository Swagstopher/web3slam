import React, {useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./Brick192.png";
import { useEffect } from "react";
const Moralis = require('moralis');

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('d52172d0b6bee16d815c', 'beafd78ea2f7b55c287f9e556df6f5bca354508a6c101650457b3adc53586f25');

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MTg1YTljNS05MzQyLTRhMTgtYmJlMC01YjlmZjZkYjZjMTAiLCJlbWFpbCI6ImNoaWtvcml0YTQxNUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDUyMTcyZDBiNmJlZTE2ZDgxNWMiLCJzY29wZWRLZXlTZWNyZXQiOiJiZWFmZDc4ZWEyZjdiNTVjMjg3ZjllNTU2ZGY2ZjViY2EzNTQ1MDhhNmMxMDE2NTA0NTdiM2FkYzUzNTg2ZjI1IiwiaWF0IjoxNjU1MjQyMzE5fQ.Eeie-TVw7F8OP2xrIIXraP85jnXPgKiEMQVCApilyqw';

const Web3 = require("web3");

const { AccountData, ContractData, ContractForm } = newContextComponents;

const contractWallet = '0x15731EA3D50567C3824d68b395AF91013Dcc9290';


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const [step, setStep] = useState(0);

  const approved = ['Yes', 'No'];

  const [walletConnected, setWalletConnected] = useState(false);

  const [address, setAddress] = useState(null);

  const [application, setApplication] = useState(null);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    income: '',
    creditScore: 300,
    homeValue:'',
    debt: '',
  });

  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({method: 'eth_requestAccounts'});
      window.web3 = new Web3(window.ethereum);
      setAddress(window.ethereum.selectedAddress);  
      return true;
    }
    return false;
  }

  useEffect(() => {

    pinata.testAuthentication().then((result) => {
      //handle successful authentication here
      console.log(result);
  }).catch((err) => {
      //handle error here
      console.log(err);
  });

    if(window.ethereum && window.ethereum.isConnected()){
      if(address == null){
        if(window.ethereum.address !== null){
          setAddress(window.ethereum.selectedAddress);  
        }

      }
    } else {
      
    }

  },[walletConnected, address]);

  useEffect(() => {
  });
  
  async function handleSubmit(event) {
    event.preventDefault();
 
    /*
    const json = JSON.stringify(values);
    const file = new Moralis.File("file.json", {
     base64: btoa(JSON.stringify(values)),
   });
   await file.saveIPFS();

fetch(file.ipfs())
.then(res => res.json())
.then(out =>{
  setApplication(out);
  console.log(out);
}
  )
*/


const options = {
  pinataMetadata: {
      name: address,
      keyvalues: {
          address: address,
      }
  },
  pinataOptions: {
      cidVersion: 0
  }
};


const array = [];

for(var i in values) {
    array.push([i,values[i]]);
}
console.log(array)

let strToAB = array =>
  new Uint8Array(array.split('')
    .map(c => c.charCodeAt(0))).buffer;

const params = [
  {
    from: address,
    to: contractWallet,
    gas: '0x76c0', // 30400
    gasPrice: '0x9184e72a000', // 10000000000000
    value: '0x9184e72a', // 2441406250
    data: JSON.stringify(strToAB)
  },
];

window.ethereum
  .request({
    method: 'eth_sendTransaction',
    params,
  })
  .then((result) => {
    // The result varies by RPC method.
    // For example, this method will return a transaction hash hexadecimal string on success.

    console.log(result);

    pinata.pinJSONToIPFS(values, options).then((result) => {
      //handle results here
      console.log(result);
    
      fetch(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
      .then(res => res.json())
      .then(out =>{
        setApplication(out);
        console.log(out);
      });
      
    }).catch((err) => {
      //handle error here
      console.log(err);
    });

  })
  .catch((error) => {
    // If the request fails, the Promise will reject with an error.
  });


   //console.log(file.ipfs(), file.hash());
 
   }

  return (
    <div className="App">
      <div className={'section'} style={{display: step == 0 ? 'block' : 'block' }}>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <img src={logo} alt="brick-coin-logo" />
        <h1>BrickCoin</h1>
          {
            !address && (
              <>
              <h2>Connect Wallet.</h2>
              <button 
                onClick={() => 
                  {
                    ethEnabled();
                  }}
              >Connect Wallet</button>
            </>
            )
          }
      </div>

      </div>


{
  address && <>
  <h3>Your Address: </h3><p>{address}</p></> 
}

<div className="section" style={{display: step == 1 ? 'block' : 'block' }}>
  <h2>Create Profile</h2>
  {
  <form
    onSubmit={handleSubmit}
  >
    <input value={values.firstName} onChange={e => setValues({...values, firstName: e.target.value})} placeholder="Enter First Name" />
    <input value={values.lastName} onChange={e => setValues({...values, lastName: e.target.value})} placeholder="Enter Last Name"/>
    <input value={values.dateOfBirth} onChange={e => setValues({...values, dateOfBirth: e.target.value})} placeholder="Enter Date of Birth (MM/DD/YYYY)"/>
    <input value={values.income} onChange={e => setValues({...values, income: e.target.value})} placeholder="Enter Your Annual Income"/>
    <div>
    <p className="range-field">
      <input value={values.creditScore} onChange={e => setValues({...values, creditScore: e.target.value})}  type="range" min="300" max="850" />
    </p>
    </div>
    <input value={values.homeValue} onChange={e => setValues({...values, homeValue: e.target.value})} placeholder="Enter Home Value"/>
    <input value={values.debt} onChange={e => setValues({...values, debt: e.target.value})} placeholder="Enter Monthly Debt"/>

    <button className="waves-effect waves-light btn">Submit</button>

  </form>
  }

</div>
<div className="section" style={{display: step == 2 ? 'block' : 'block' }}>
{
  application !== null && (
    <div>
      <p>First Name: {application.firstName}</p>
      <p>Last Name: {application.lastName}</p>
      <p>Date of Birth: {application.dateOfBirth}</p>
      <p>Income: {application.income}</p>
      <p>Credit Score: {application.creditScore}</p>
      <p>Debt: {application.debt}</p>
      <p>Home Value: {application.homeValue}</p>
      <p>Approved: {approved[Math.floor(Math.random() * 2)]}</p>
    </div>
  )
}
</div>

    </div>
  );
};
