import React, { useState, useEffect } from 'react';

import CreateBlockchain from './CreateBlockchain';
import CreateWallet from '../wallets/CreateWallet';
import WalletValidator from '../wallets/WalletValidator';
import CreateTransaction from '../transactions/CreateTransaction';
import SignTransaction from '../transactions/SignTransaction';
import AddTransaction from '../transactions/AddTransaction';

// import CreateBlock from '../blocks/CreateBlock';

// if the wallets are created within Aggregator function, values of wallets change when retrieved from CreateTransaction function
// therefore, value of wallets must be initialized outside of Aggregator function
// ask Akiva why this is...
const myWallet = CreateWallet();
const dannyWallet = CreateWallet();

function Aggregator() {
    
    const blockchain = CreateBlockchain();

    const publicWallets =  {"My Wallet": myWallet.publicKey, "Danny's Wallet": dannyWallet.publicKey};
    
    console.log("Wallet from privateKey equals to publicKey?", WalletValidator(myWallet.privateKey, myWallet.publicKey));
    
    const [tx1, setTx1] = useState({})
    const [pendingTransactions, setPendingTransactions] = useState([]);
    
    // unsure if useEffect is necessary...
    useEffect(() => {
        if(JSON.stringify(tx1) === '{}') {
            return;
        }
        // update the validation below
        if(!tx1.hasOwnProperty('fromAddress')) {
            throw new Error('Must have...')
        } 
        if(!tx1.hasOwnProperty('toAddress')) {
            throw new Error('Must have...')
        }
        if(!tx1.hasOwnProperty('amount')) {
            // or not number with the value...
            throw new Error('Must have...')
        } 
        const signature = SignTransaction(tx1, myWallet.keyPair);
        AddTransaction(tx1, signature, setPendingTransactions);
        
    },[tx1])

    return (
        <>
            {publicWallets !== undefined ? <CreateTransaction transaction={tx1} setTransaction={setTx1} wallets={publicWallets} /> : null}
        </>
    )


// const timestamp = Date.now();
// const transactions = [1 ,3 ,4];

// return <CreateBlock timestamp={timestamp} transactions={transactions} />


}

export default Aggregator;
// export const pub = {"My Wallet": myWallet.publicKey, "Danny's Wallet": dannyWallet.publicKey}