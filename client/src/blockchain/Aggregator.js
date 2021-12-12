import React, { useState, useEffect } from 'react';
// import CreateBlockchain from './CreateBlockchain';
// import CreateWallet from '../wallets/CreateWallet';
import WalletValidator from '../wallets/WalletValidator';
import CreateTransaction from '../transactions/CreateTransaction';
import SignTransaction from '../transactions/SignTransaction';
import AddTransaction from '../transactions/AddTransaction';
import MinePendingTransactions from '../transactions/MinePendingTransactions';
import GetWalletBalance from '../wallets/GetWalletBalance';
import ChainValidator from './ChainValidator';
import AttemptToAlterChain from './AttemptToAlterChain';


// if the wallets (and blockchain) are created within Aggregator function, values of wallets change when retrieved from CreateTransaction function
// therefore, value of wallets must be initialized outside of Aggregator function
// ask Akiva why this is...

// potentially move variables outside of Aggregator to another file...

// initializes the blockchain by creating the Genesis block
// const blockchain = CreateBlockchain();

// initializes the wallets
// const myWallet = CreateWallet();
// const dannyWallet = CreateWallet();

function Aggregator({ blockchain, myWallet, dannyWallet }) {

    // use a map function???
    const publicWallets =  {"My Wallet": myWallet.publicKey, "Danny's Wallet": dannyWallet.publicKey};
    
    console.log("Wallet from privateKey corresponds to publicKey?", WalletValidator(myWallet.privateKey, myWallet.publicKey));
    
    // maybe instead of differentiating between 2 tx, just use a boolean to trigger first useEffect??
    const [formSubmission, setFormSubmission] = useState(false);

    const [tx, setTx] = useState({})
    const [pendingTransactions, setPendingTransactions] = useState([]);
    const [signature, setSignature] = useState();
    const [initiateMining, setInitiateMining] = useState(false);
    
    // unsure if useEffect is necessary...
    useEffect(() => {
        if(formSubmission === false) {
            return true
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
        
        // create to match any wallet...
        const sign = tx.fromAddress === myWallet.publicKey
            ? SignTransaction(tx, myWallet.keyPair)
            : SignTransaction(tx, dannyWallet.keyPair);
            // is it strange to use sign then assign then reuse sign within AddTransaction below???
            // way to remove below??
        setSignature(sign)
        
        // sets pendingTransactions, but might be smarter to assign pendingTransactions to a value below
        AddTransaction(tx, sign, setPendingTransactions, setInitiateMining);

        // end calling functions used for form submission/adding transaction
        setFormSubmission(false);
        
    },[formSubmission]);

    useEffect(() => {
        if(initiateMining) {

            console.log(`Starting the mining of Block ${blockchain.chain.length}...`);
            MinePendingTransactions(blockchain, pendingTransactions, setPendingTransactions, myWallet.publicKey);
            // the wallet balance checker probably isn't the best method...
            // probably need to setState of wallet balances and also create balance validations so transfer can't be initiated if there is insufficient balance...
            // strange balance numbers... are miningRewards working properly?
            Object.entries(publicWallets).forEach((wallet) => {
                console.log(`Balance of ${wallet[0]} account is: ${GetWalletBalance(blockchain, wallet[1])}`)
            })
            setInitiateMining(!initiateMining)
        }
        if(!initiateMining && signature) {
            // need to pass 1 or both wallets into ChainValidator to pass the transaction validator (needs signature)
            // console.log(blockchain.chain[1].transactions[0])
            console.log('Is the chain valid? ' + ChainValidator(blockchain, signature));

            AttemptToAlterChain(blockchain, 200, signature)
            // causing issues with account balanced...
            // turning amount into a string, but is there a way to leave as a number?
            // const originalAmount = blockchain.chain[1].transactions[0].amount;
            // blockchain.chain[1].transactions[0].amount = 200;
            // console.log(blockchain.chain[1].transactions[0])
            console.log('Is the chain still valid? ' + ChainValidator(blockchain, signature));

            // just need to add additional info to match the example project's blockchain...
            console.log(JSON.stringify({ ...blockchain, pendingTransactions }, null, 4));
        }
    }, [initiateMining])

    return (
        <>
            <CreateTransaction setTransaction={setTx} wallets={publicWallets} setFormSubmission={setFormSubmission} />
        </>
    )
}

export default Aggregator;