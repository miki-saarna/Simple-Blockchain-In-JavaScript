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
    
    // move placement so it doesn't display multiple times in 1 transaction?
    console.log("Wallet from privateKey corresponds to publicKey?", WalletValidator(myWallet.privateKey, myWallet.publicKey));
    
    const [formSubmission, setFormSubmission] = useState(false);
    const [tx, setTx] = useState({})
    const [pendingTransactions, setPendingTransactions] = useState([]);
    const [signature, setSignature] = useState([]);
    const [initiateMining, setInitiateMining] = useState(false);
    const [initiateWalletBalance, setInitiateWalletBalance] = useState(false);
    // const [balanceofWallets, setBalanceOfWallets] = useState(walletList.)

    // unsure if useEffect is necessary...
    useEffect(() => {
        if(formSubmission) {

            // validate that the public addresses used for transaction are valid addresses
            const walletPublicAddresses = [];
            walletList.forEach((wallet) => walletPublicAddresses.push(wallet.publicKey))
            if (!walletPublicAddresses.includes(tx.fromAddress) || !walletPublicAddresses.includes(tx.toAddress)) {
                // throw new Error('Only valid addresses may be used for transactions...')
                console.error('Only valid addresses may be used for transactions...');
                setFormSubmission(false);
                return;
            }

            // validate that transaction amount is greater than zero
            if (tx.amount <= 0) {
                // throw new Error('Transaction amount must be a positive integer...')
                console.error('Transaction amount must be a positive integer...');
                setFormSubmission(false);
                return;
            }
            
            // validate the sender wallet has enough funds to complete the transaction
            const walletMaxTx = walletList.find((wallet) => wallet.publicKey === tx.fromAddress)
            if (tx.amount > walletMaxTx.amount + GetWalletBalance(blockchain, walletMaxTx.publicKey)) {
                // throw new Error('This wallet does not have enough funds to send this transaciton');
                console.error('This wallet does not have enough funds to send this transaction...');
                setFormSubmission(false);
                return;
            }

            const senderWallet = walletList.find((wallet) => wallet.publicKey === tx.fromAddress);
            const sign = SignTransaction(tx, senderWallet.keyPair)
                // is it strange to use sign then assign then reuse sign within AddTransaction below???
                // way to remove below??
            setSignature([...signature, sign])

            // sets pendingTransactions, but might be smarter to assign pendingTransactions to a value below
            AddTransaction(tx, sign, setPendingTransactions, setInitiateMining);

            // end calling functions used for form submission/adding transaction -> alternative way to use this?
            setFormSubmission(false);

        }
        
    },[formSubmission]);

    useEffect(() => {
        if(initiateMining) {

            console.log(`Starting the mining of Block ${blockchain.chain.length}...`);
            // chooses random wallet to be the miner
            MinePendingTransactions(blockchain, pendingTransactions, setPendingTransactions, walletList[Math.floor(Math.random() * (walletList.length))].publicKey);
            // MinePendingTransactions(blockchain, pendingTransactions, setPendingTransactions, myWallet.publicKey);
            // the wallet balance checker probably isn't the best method...
            // probably need to setState of wallet balances and also create balance validations so transfer can't be initiated if there is insufficient balance...
            // strange balance numbers... are miningRewards working properly?
            // Object.entries(publicWallets).forEach((wallet) => {
                //     console.log(`Balance of ${wallet[0]} is: ${GetWalletBalance(blockchain, wallet[1])}`)
                // })
                setInitiateWalletBalance(!initiateWalletBalance);
                setInitiateMining(!initiateMining);
            }
        }, [initiateMining])

    useEffect(() => {
        if(initiateWalletBalance && signature.length) {
            // separate into separate use effect to include mined amount....
            walletList.forEach((wallet) => {
                console.log(`Balance of ${wallet.name}\'s wallet is: ${wallet.amount + GetWalletBalance(blockchain, wallet.publicKey)}`)
            })
            console.log('Is the chain valid? ' + ChainValidator(blockchain, signature));
            AttemptToAlterChain(blockchain, 200, signature)
            
            // just need to add additional info to match the example project's blockchain...
            console.log(JSON.stringify({ ...blockchain, pendingTransactions }, null, 4));
            setInitiateWalletBalance(!initiateWalletBalance);
        }
    },[initiateWalletBalance]);

    return (
        <>
            {walletList.length > 1 ? <CreateTransaction setTransaction={setTx} walletList={walletList} wallets={publicWallets} setFormSubmission={setFormSubmission} /> : null}
        </>
    )
}

export default Aggregator;