import React, { useState, useEffect } from 'react';
import './App.css';
import CreateBlockchain from './blockchain/CreateBlockchain';
import CreateWalletName from './wallets/CreateWalletName';
import CreateWallet from './wallets/CreateWallet';
import Aggregator from './blockchain/Aggregator';

// const walletList = [];

function App() {
  // initializes the blockchain by creating the Genesis block
  const blockchain = CreateBlockchain();
  const myWallet = CreateWallet();
  const dannyWallet = CreateWallet();
  
  const [walletList, setWalletList] = useState([]);


  return (
    <>
      <CreateWalletName walletList={walletList} setWalletList={setWalletList} />
      <Aggregator blockchain={blockchain} walletList={walletList} myWallet={myWallet} dannyWallet={dannyWallet} />
    </>
  );
}

export default App;
