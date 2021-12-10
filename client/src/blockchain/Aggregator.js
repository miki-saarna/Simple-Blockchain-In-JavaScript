import React, { useState, useEffect } from 'react';

import CreateBlockchain from './CreateBlockchain';
import CreateWallet from '../wallets/CreateWallet';
import WalletValidator from '../wallets/WalletValidator';
import CreateTransaction from '../transactions/CreateTransaction';
import SignTransaction from '../transactions/SignTransaction';
import AddTransaction from '../transactions/AddTransaction';
import MinePendingTransactions from '../transactions/MinePendingTransactions';

// import CreateBlock from '../blocks/CreateBlock';

// if the wallets (and blockchain) are created within Aggregator function, values of wallets change when retrieved from CreateTransaction function
// therefore, value of wallets must be initialized outside of Aggregator function
// ask Akiva why this is...

// potentially move variables outside of Aggregator to another file...

// initializes the blockchain by creating the Genesis block
const blockchain = CreateBlockchain();

// initializes the wallets
const myWallet = CreateWallet();
const dannyWallet = CreateWallet();

function Aggregator() {

    const publicWallets =  {"My Wallet": myWallet.publicKey, "Danny's Wallet": dannyWallet.publicKey};
    
    console.log("Wallet from privateKey equals to publicKey?", WalletValidator(myWallet.privateKey, myWallet.publicKey));
    
    const [tx, setTx] = useState({})
    const [pendingTransactions, setPendingTransactions] = useState([]);

    const [initiateMining, setInitiateMining] = useState(false);
    
    // unsure if useEffect is necessary...
    useEffect(() => {
        if(JSON.stringify(tx) === '{}') {
            return;
        }
        // update the validation below
        if(!tx.hasOwnProperty('fromAddress')) {
            throw new Error('Must have...')
        } 
        if(!tx.hasOwnProperty('toAddress')) {
            throw new Error('Must have...')
        }
        if(!tx.hasOwnProperty('amount')) {
            // or not number with the value...
            throw new Error('Must have...')
        } 
        
        const signature = tx.fromAddress === myWallet.publicKey
            ? SignTransaction(tx, myWallet.keyPair)
            : SignTransaction(tx, dannyWallet.keyPair);
        
        // sets pendingTransactions, but might be smarter to assign pendingTransactions to a value below
        AddTransaction(tx, signature, setPendingTransactions, setInitiateMining);

    },[tx]);

    useEffect(() => {
        if(initiateMining) {
            console.log('Starting the mining of Block 1...');
            MinePendingTransactions(blockchain, pendingTransactions, setPendingTransactions, myWallet.publicKey);
            setInitiateMining(!initiateMining)
        }
    }, [initiateMining])

    return (
        <>
            {publicWallets !== undefined ? <CreateTransaction setTransaction={setTx} wallets={publicWallets} /> : null}
        </>
    )


// const timestamp = Date.now();
// const transactions = [1 ,3 ,4];

// return <CreateBlock timestamp={timestamp} transactions={transactions} />


}

export default Aggregator;
// export const pub = {"My Wallet": myWallet.publicKey, "Danny's Wallet": dannyWallet.publicKey}