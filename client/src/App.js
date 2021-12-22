import React, { useEffect, useState } from 'react';
import './App.css';
import CreateBlockchain from './blockchain/CreateBlockchain';
import CreateWalletName from './wallets/CreateWallet';

import Aggregator from './blockchain/Aggregator';

// initializes the blockchain by creating the Genesis block
const blockchain = CreateBlockchain();

function App() {
  
  
  const [walletList, setWalletList] = useState([]);

  

  return (
    <>
      <h1>Blockchain Transaction Simulation</h1>
      <p className='red'>*Instructions are in red text</p>
      <CreateWalletName walletList={walletList} setWalletList={setWalletList} />
      <Aggregator blockchain={blockchain} walletList={walletList} />
    </>
  );
}

export default App;
