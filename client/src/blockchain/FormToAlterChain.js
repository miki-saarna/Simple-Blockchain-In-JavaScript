
import React, { useState, useEffect } from 'react';
import ChainValidator from '../validators/ChainValidator';

export default function FormToAlterChain({ blockchain, signature, walletList }) {

    const [blockSelected, setBlockSelected] = useState();
    const [foundTx, setFoundTx] = useState({})
    const [alteredTx, setAlteredTx] = useState({})
    const [chainValidity, setChainValidity] = useState(true);

    function blockSelector(event, block) {
        event.preventDefault();
        if (block === 0) {
            console.error('No alterations can be done on the Genesis Block...');
            return;
            // return <p>No alterations can be done on the Genesis Block...</p>
        }
        const originalAmount = blockchain.chain[block].transactions[blockchain.chain[block].transactions.length - 1]
        setFoundTx(originalAmount)
        setAlteredTx(originalAmount);
        setBlockSelected(block);
    }

    function walletSelector(event, toOrFrom, walletAddress) {
        event.preventDefault();
        
        setAlteredTx((alteredTxData) => ({
            ...alteredTxData,
            [toOrFrom]: walletAddress,
        }))
    }

    function changeHandler( { target: { name, value } } ) {
        if (Number.isInteger(parseInt(value))) {
            value = parseInt(value)
        } 
        setAlteredTx((alteredTxData) => ({
            ...alteredTxData,
            [name]: value,
        }))
    }

    const walletsPublicKeys = walletList.map((wallet) => wallet.publicKey);

    function submitHandler(event) {
        event.preventDefault();
        if (!walletsPublicKeys.includes(alteredTx.fromAddress) || !walletsPublicKeys.includes(alteredTx.toAddress)) {
            console.error('Only valid addresses may be used for altering transactions. Try selecting the names of the wallets listed below...');
            return;
        }
        blockchain.chain[blockSelected].transactions[blockchain.chain[blockSelected].transactions.length - 1] = alteredTx;
        // blockchain.chain[blockSelected].transactions[0] = alteredTx;
        console.log('Is the chain still valid? ' + ChainValidator(blockchain, signature));
        setChainValidity(ChainValidator(blockchain, signature));
        blockchain.chain[blockSelected].transactions[blockchain.chain[blockSelected].transactions.length - 1] = foundTx;
    }
    
    // useEffect(() => {
    //     if (!chainValidity) {
            // setChainValidity(true);
            // setChainValidity(ChainValidator(blockchain, signature))
        // }
    // }, [chainValidity])

    return (
        <>
            {blockchain.chain.length > 1 ?
            <>
                <h3>Is the chain valid? {ChainValidator(blockchain, signature) ? 'Yes' : 'No'}</h3>
                <h2>Alter chain:</h2>
                <ul>{blockchain.chain.map((chain, index) => <li key={index} onClick={(event) => blockSelector(event, index)}>{index + 1}</li>)}</ul>
                {Object.keys(alteredTx).length ?
                (<form onSubmit={submitHandler}>
                    <label htmlFor='fromAddress'>
                        From address:
                    </label>
                    <input
                      id='fromAddress'
                      name='fromAddress'
                      type='text'
                      value={alteredTx.fromAddress}
                      onChange={changeHandler}
                    >
                    </input>

                    <ul>
                    {walletList.map((wallet, index) => <li key={index} onClick={(event) => walletSelector(event, 'fromAddress', wallet.publicKey)}>{wallet.name}</li>)}
                    </ul>

                    <label htmlFor='toAddress'>
                        To address:
                    </label>
                    <input
                      id='toAddress'
                      name='toAddress'
                      type='text'
                      value={alteredTx.toAddress}
                      onChange={changeHandler}
                    >
                    </input>

                    <ul>
                    {walletList.map((wallet, index) => <li key={index} onClick={(event) => walletSelector(event, 'toAddress', wallet.publicKey)}>{wallet.name}</li>)}
                    </ul>

                    <label htmlFor='amount'>
                        Amount:
                    </label>
                    <input
                      id='amount'
                      name='amount'
                      type='number'
                      value={alteredTx.amount}
                    //   value={Object.keys(foundTx).length ? foundTx.amount : null}
                      onChange={changeHandler}
                    >
                    </input>

                    <button type='submit'>
                        Submit Changes
                    </button>

                </form>
                )
                : null}
                {Object.keys(alteredTx).length ? <h3>Is the chain still valid? {chainValidity ? 'Yes' : 'No'}</h3> : null}
            </>
            : null}
        </>
    )
}