import React, { useState, useEffect } from 'react';
import WalletValidator from '../validators/WalletValidator';
import CreateTransaction from '../transactions/CreateTransaction';
import SignTransaction from '../transactions/SignTransaction';
import AddTransaction from '../transactions/AddTransaction';
import MinePendingTransactions from '../transactions/MinePendingTransactions';
import GetWalletBalance from '../wallets/GetWalletBalance';
import ChainValidator from '../validators/ChainValidator';
import AttemptToAlterChain from './AttemptToAlterChain';

function Aggregator({ blockchain, walletList, myWallet, dannyWallet }) {

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
        if(!formSubmission) {
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
        
        // create to match any wallet... fix here...
        const sign = tx.fromAddress === walletList[0].publicKey
            ? SignTransaction(tx, walletList[0].keyPair)
            : SignTransaction(tx, walletList[1].keyPair);
            // is it strange to use sign then assign then reuse sign within AddTransaction below???
            // way to remove below??
        setSignature(sign)
        
        // sets pendingTransactions, but might be smarter to assign pendingTransactions to a value below
        AddTransaction(tx, sign, setPendingTransactions, setInitiateMining);

        // end calling functions used for form submission/adding transaction -> alternative way to use this?
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
                console.log(`Balance of ${wallet[0]} is: ${GetWalletBalance(blockchain, wallet[1])}`)
            })
            setInitiateMining(!initiateMining)
        }
        if(!initiateMining && signature) {
            console.log('Is the chain valid? ' + ChainValidator(blockchain, signature));

            AttemptToAlterChain(blockchain, 200, signature)
            console.log('Is the chain still valid? ' + ChainValidator(blockchain, signature));

            // just need to add additional info to match the example project's blockchain...
            console.log(JSON.stringify({ ...blockchain, pendingTransactions }, null, 4));
        }
    }, [initiateMining])

    return (
        <>
            {walletList.length > 1 ? <CreateTransaction setTransaction={setTx} walletList={walletList} wallets={publicWallets} setFormSubmission={setFormSubmission} /> : null}
        </>
    )
}

export default Aggregator;