"use client"
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Header from "@/components/Header";
import { Contract, formatEther, parseUnits } from "ethers";
import {abi, CONTRACT_ADDRESS} from "@/constants/abi";


export default function Home() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();
  const [bankBalance, setBankBalance] = useState(0);
  const [withdrawButtonDisabled, setWithdrawButtonDisable] = useState(false)
  const [depositButtonDisabled, setDepositButtonDisabled] = useState(false);

  const contractProvider = new Contract(CONTRACT_ADDRESS, abi, provider);
  let contractSigner;
  if(signer){
    contractSigner = new Contract(CONTRACT_ADDRESS, abi, signer)
  }
  


  function handleDepositAmountChange(event) {
    setDepositAmount(event.target.value);
  }
  async function handleDeposit(e) {
    e.preventDefault();
    setDepositButtonDisabled(true)
    // deposit
    const amount = parseUnits(depositAmount, 18);
    const tx = await contractSigner.deposit({value: amount});  

    await tx.wait();
    setDepositButtonDisabled(false)
  }

  function handleWithdrawAmountChange(event) {
    setWithdrawAmount(event.target.value);
  }
  async function handleWithdraw(e) {
    e.preventDefault();
    setWithdrawButtonDisable(true)
    // withdraw
    const amount = parseUnits(withdrawAmount, 18);
    const tx = await contractSigner.withdraw(amount);
    await tx.wait(); 
     
    setWithdrawButtonDisable(false)  
    
  }
  async function getBankBalance() {
    const balance = await contractSigner.getBalance();
    setBankBalance(formatEther(balance));
  }

  return (
    <main>
      <Header onConnect={(provider, signer) => {
        setProvider(provider);
        setSigner(signer);
      }} />
      <div className="container">

        <div className="container text-center mt-5">
          <div className="row">
            <div className="col">
              <div className="mb-3">
                Bank Balance: {bankBalance}
              </div>
              <button className="btn btn-dark" onClick={getBankBalance}>Balance</button>
            </div>
            <div className="col">
              <form>
                <div className="mb-3">
                  <input className="form-control mb-3" id="deposit" placeholder="Amount" onChange={handleDepositAmountChange} />
                  <button className="btn btn-success" onClick={handleDeposit} disabled={depositButtonDisabled}>Deposit</button>

                </div>
                <div className="mb-3">
                  <input className="form-control mb-3" id="withdraw" placeholder="Amount" onChange={handleWithdrawAmountChange} />
                  <button className="btn btn-danger" onClick={handleWithdraw} disabled={withdrawButtonDisabled}>Withdraw</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}
