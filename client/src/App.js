import './App.css';
import CreateBlockchain from './blockchain/CreateBlockchain';
import CreateWallet from './wallets/CreateWallet';
import Aggregator from './blockchain/Aggregator';

function App() {
  // these 3 variables were originally initialized within aggregator
  // initializes the blockchain by creating the Genesis block
  const blockchain = CreateBlockchain();
  const myWallet = CreateWallet();
  const dannyWallet = CreateWallet();

  return (
    <>
      <Aggregator blockchain={blockchain} myWallet={myWallet} dannyWallet={dannyWallet} />
    </>
  );
}

export default App;
