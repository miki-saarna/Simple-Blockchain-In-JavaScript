import React, { useState, useEffect } from 'react';
import CreateTransaction from '../transactions/CreateTransaction';
import SignTransaction from '../transactions/SignTransaction';
import AddTransaction from '../transactions/AddTransaction';
import MinePendingTransactions from '../transactions/MinePendingTransactions';
import GetWalletBalance from '../wallets/GetWalletBalance';
import ChainValidator from '../validators/ChainValidator';
import AttemptToAlterChain from './AttemptToAlterChain';
import FormToAlterChain from './FormToAlterChain';

function Aggregator({ blockchain, walletList }) {

    
    // move placement so it doesn't display multiple times in 1 transaction?
    // fix the line of code below...
    // console.log("Wallet from privateKey corresponds to publicKey?", WalletValidator(myWallet.privateKey, myWallet.publicKey));
    
    const [formSubmission, setFormSubmission] = useState(false);
    const [tx, setTx] = useState({})
    const [pendingTransactions, setPendingTransactions] = useState([]);
    // signature should be plural? signatures...
    const [signature, setSignature] = useState([]);
    const [initiateMining, setInitiateMining] = useState(false);
    const [initiateWalletBalance, setInitiateWalletBalance] = useState(false);
    const [chainAltered, setChainAltered] = useState(false);

    // unsure if useEffect is necessary...
    useEffect(() => {
        if(formSubmission) {

            // validate that the public addresses used for transaction are valid addresses
            const walletPublicAddresses = [];
            walletList.forEach((wallet) => walletPublicAddresses.push(wallet.publicKey))
            if (!walletPublicAddresses.includes(tx.fromAddress) || !walletPublicAddresses.includes(tx.toAddress)) {
                // throw new Error('Only valid addresses may be used for transactions...')
                console.error('Only valid addresses may be used for transactions...');
                setTx({});
                setFormSubmission(false);
                return;
            }

            if (tx.fromAddress === tx.toAddress) {
                console.error('The "From Address" and "To Address" cannot be the same wallets...');
                setTx({});
                setFormSubmission(false);
                return;
            }

            // validate that transaction amount is greater than zero
            if (tx.amount <= 0) {
                // throw new Error('Transaction amount must be a positive integer...')
                console.error('Transaction amount must be a positive integer...');
                setTx({});
                setFormSubmission(false);
                return;
            }
            
            // validate the sender wallet has enough funds to complete the transaction
            const walletMaxTx = walletList.find((wallet) => wallet.publicKey === tx.fromAddress)
            if (tx.amount > walletMaxTx.amount + GetWalletBalance(blockchain, walletMaxTx.publicKey)) {
                // throw new Error('This wallet does not have enough funds to send this transaciton');
                console.error('This wallet does not have enough funds to send this transaction...');
                setTx({});
                setFormSubmission(false);
                return;
            }

            // add validator for if to and from address are the same...

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

            setTimeout(() => {
            console.log(`Starting the mining of Block ${blockchain.chain.length}...`);
            // chooses random wallet to be the miner
            MinePendingTransactions(blockchain, pendingTransactions, setPendingTransactions, walletList[Math.floor(Math.random() * (walletList.length))].publicKey);
            setInitiateWalletBalance(!initiateWalletBalance);
            setInitiateMining(!initiateMining);
            }, 2000)
            // MinePendingTransactions(blockchain, pendingTransactions, setPendingTransactions, myWallet.publicKey);
            // the wallet balance checker probably isn't the best method...
            // probably need to setState of wallet balances and also create balance validations so transfer can't be initiated if there is insufficient balance...
            // strange balance numbers... are miningRewards working properly?
            // Object.entries(publicWallets).forEach((wallet) => {
                //     console.log(`Balance of ${wallet[0]} is: ${GetWalletBalance(blockchain, wallet[1])}`)
                // })
            }
        }, [initiateMining])

    useEffect(() => {
        if(initiateWalletBalance && signature.length) {
            // separate into separate use effect to include mined amount...
            // walletList.forEach((wallet) => {
            //     console.log(`Balance of ${wallet.name}\'s wallet is: ${wallet.amount + GetWalletBalance(blockchain, wallet.publicKey)}`)
            // })
            // console.log('Is the chain valid? ' + ChainValidator(blockchain, signature));
            // AttemptToAlterChain(blockchain, 200, signature)
            
            // just need to add additional info to match the example project's blockchain...
            console.log(JSON.stringify({ ...blockchain, pendingTransactions }, null, 4));
            setInitiateWalletBalance(!initiateWalletBalance);
        }
    },[initiateWalletBalance]);

    useEffect(() => {
        console.log('Is the chain valid? ' + ChainValidator(blockchain, signature));
        if(chainAltered) {
            AttemptToAlterChain(blockchain, 200, signature);
            setChainAltered(!chainAltered);
        }
    }, [chainAltered])

    // create to loop through transaction properties
    const transactionProperties = [];
    for(const property in tx) {
        if (property === 'fromAddress') {
            const fromWallet = walletList.find((wallet) => wallet.publicKey === tx[property])
            if (fromWallet) {
                transactionProperties.push(`${property}: ${fromWallet.name}`)
            }
        }
        if (property === 'toAddress') {
            const toWallet = walletList.find((wallet) => wallet.publicKey === tx[property])
            if (toWallet) {
                transactionProperties.push(`${property}: ${toWallet.name}`)
            }
        }
        if (property === 'amount') {
        transactionProperties.push(`${property}: ${tx[property]}`)
        } 
    }

    // console.log(blockchain.chain[blockchain.chain.length - 1])
    // check if exists elsewhere...
    const minedBlock = blockchain.chain[blockchain.chain.length - 1]
    
    return (
        <>
            <h3>Number of blocks: {blockchain.chain.length}</h3>
            {/* use CSS to create blocks */}
            <div>{blockchain.chain.map((block, index) => <div key={index}>{index + 1}</div>)}</div>
            {walletList.length > 1 ? <CreateTransaction setTransaction={setTx} walletList={walletList} setFormSubmission={setFormSubmission} /> : null}
            <h3>Transaction details:</h3>
            {tx ? <ul>{transactionProperties.map((property, index) => <li key={index}>{property}</li>)}</ul> : null}
            <h4>Status:</h4>
            {initiateMining ? <p>Starting the mining of Block {blockchain.chain.length}...</p> : null}
            {!initiateMining && blockchain.chain.length > 1 ? <p>Block {blockchain.chain.length} successfully mined!</p> : null}
            <h3>Mined block:</h3>
            {blockchain.chain.length > 1 ? <ul><li>nonce: {minedBlock.nonce}</li><li>hash: {minedBlock.hash}</li></ul> : null}
            <h3>Pending Transaction(s):</h3>
            {pendingTransactions.map((pendingTransaction, index) => <ul key={index}><li>from Address:   -</li><li>to Address: {walletList.find((wallet) => wallet.publicKey === pendingTransaction.toAddress).name}</li><li>amount: {pendingTransaction.amount}</li></ul>)}
            <h3>Wallet list:</h3>
            {walletList.map((wallet, index) => <p key={index}>Balance of {wallet.name}'s wallet is: {wallet.amount + GetWalletBalance(blockchain, wallet.publicKey)}</p>)}
            <FormToAlterChain blockchain={blockchain} signature={signature} walletList={walletList} />

            <h3>Blockchain:</h3>
            <p>{JSON.stringify({ ...blockchain, pendingTransactions }, null, 4)}</p>
        </>
    )
}

export default Aggregator;