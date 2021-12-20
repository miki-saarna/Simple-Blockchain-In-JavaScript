import React, { useEffect, useState } from 'react';
import './App.css';
import CreateBlockchain from './blockchain/CreateBlockchain';
import CreateWalletName from './wallets/CreateWallet';

import Aggregator from './blockchain/Aggregator';

// const walletList = [];
const blockchain = CreateBlockchain();

function App() {
  // initializes the blockchain by creating the Genesis block
  
  
  const [walletList, setWalletList] = useState([]);

  

  return (
    <>
  
      <CreateWalletName walletList={walletList} setWalletList={setWalletList} />
      <Aggregator blockchain={blockchain} walletList={walletList} />
    </>
  );
}

export default App;
