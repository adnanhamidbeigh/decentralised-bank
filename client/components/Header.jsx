"use client"
import React, { useState } from 'react'
import { ethers } from "ethers";

function Header({onConnect}) {
  const [signer, setSigner] = useState();
  const [provider, setProvider] = useState();
  const [hideConnect, setHideConnect] = useState(false);
  const [signerAddress, setSignerAddress] = useState();
  const [signerBalance, setSignerBalance] = useState();
  async function handleConnectWallet(e) {
    e.preventDefault();
    let signer = null;
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults")
      provider = ethers.getDefaultProvider()

    } else {
      provider = new ethers.BrowserProvider(window.ethereum)
      signer = await provider.getSigner();
      setHideConnect(true)
      const address = await signer.getAddress();
      setSignerAddress(address);
      const signerBalance = ethers.formatEther(await provider.getBalance(address));
      setSignerBalance(signerBalance);
    }
    setProvider(provider)
    setSigner(signer)

  }
  onConnect(provider, signer); // Pass provider and signer to parent component using callback and through argument
  return (
    <nav className='container mt-3 text-lg text-purple-500'>
      <ul className='d-flex flex-row mb-3 justify-content-between'>
        <li>Bank</li>
        {hideConnect ? <li>{signerAddress}</li> : <button onClick={handleConnectWallet} >Connect Wallet</button>}
        {hideConnect && <li>{signerBalance}</li>}
      </ul>
    </nav>

  )
}

export default Header