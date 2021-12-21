
import React, { useState, useEffect } from 'react';
import ChainValidator from '../validators/ChainValidator';

export default function FormToAlterChain({ blockchain, signature }) {

    const initialFormState = {
        fromAddress: '',
        toAddress: '',
        amount: '',
        signature: '',
    }

    const [blockSelected, setBlockSelected] = useState();
    const [foundTx, setFoundTx] = useState({})
    const [alteredTx, setAlteredTx] = useState({})
    const [chainValidity, setChainValidity] = useState(true);

    function blockSelector(event, block) {
        event.preventDefault();
        if (block === 0) {
            console.error('No alterations can be done on the Genesis Block...');
            // return <p>No alterations can be done on the Genesis Block...</p>
        } else if (block === 1) {
            const originalAmount = blockchain.chain[block].transactions[0]
            setFoundTx(originalAmount)
            setAlteredTx(originalAmount);
        }
        else {
            const originalAmount = blockchain.chain[block].transactions[1]
            setFoundTx(originalAmount)
            setAlteredTx(originalAmount)
        }
        setBlockSelected(block);
    }

    function changeHandler( { target: { name, value } } ) {
        if (Number.isInteger(parseInt(value))) {
            value = parseInt(value)
        } 
        setAlteredTx({
            ...foundTx,
            [name]: value,
        })
    }

    function submitHandler(event) {
        event.preventDefault();
        blockchain.chain[blockSelected].transactions[0] = alteredTx;
        console.log('Is the chain still valid? ' + ChainValidator(blockchain, signature));
        setChainValidity(ChainValidator(blockchain, signature))
        blockchain.chain[blockSelected].transactions[0] = foundTx;
    }

    return (
        <>
            {blockchain.chain.length > 1 ?
            <>
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