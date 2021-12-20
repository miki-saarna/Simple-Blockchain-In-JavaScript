import React, { useState } from 'react';

function CreateTransaction({ setTransaction, walletList, setFormSubmission }) {
    
    const initialFormState = {
        fromAddress: '',
        toAddress: '',
        amount: '',
        timestamp: '',
    }

    const [transactionProperties, setTransactionsProperties] = useState(initialFormState);

    function walletSelector(event, toOrFrom, walletAddress) {
        event.preventDefault();
        
        setTransactionsProperties((previousTransactionProperties) => ({
            ...previousTransactionProperties,
            [toOrFrom]: walletAddress,
        }))
    }

    function submitHandler(event) {
        event.preventDefault();
        setTransaction({
            ...transactionProperties,
            timestamp: Date.now(),
        });
        setFormSubmission(true);
        setTransactionsProperties(initialFormState);
    }

    function changeHandler({ target: { name, value } }) {
        // any simpler way to convert to number?
        if(Number.isInteger(parseInt(value))) {
            value = parseInt(value);
        }
        
        setTransactionsProperties((previousTransactionProperties) => ({
            ...previousTransactionProperties,
            [name]: value,
        }))
    }
    
    return (
        <>
            <h2>New Transaction</h2>
            
            <form onSubmit={submitHandler}>
                <label htmlFor="fromAddress">
                    From Address:
                </label>
                <input
                  id="fromAddress"
                  name="fromAddress"
                  //   other value for type???
                  type="text"
                  value={transactionProperties.fromAddress}
                  onChange={changeHandler}
                  required
                >
                </input>
                {/* <ul>
                    {Object.entries(wallets).map((wallet, index) => {
                        return (
                            <li key={index} onClick={(event) => walletSelector(event, "fromAddress", wallet[1])}>{wallet[0]}</li>
                        )
                    })}
                </ul> */}

                <ul>
                    {walletList.map((wallet, index) => <li key={index} onClick={(event) => walletSelector(event, 'fromAddress', wallet.publicKey)}>{wallet.name}</li>)}
                </ul>

                <label htmlFor="toAddress">
                    To Address:
                </label>
                <input
                  id="toAddress"
                  name="toAddress"
                  //   other value for type???
                  type="text"
                  value={transactionProperties.toAddress}
                  onChange={changeHandler}
                  required
                >
                </input>
                <ul>
                    {/* {Object.entries(wallets).map((wallet, index) => {
                        return (
                            <li key={index} onClick={(event) => walletSelector(event, "toAddress", wallet[1])}>{wallet[0]}</li>
                        )
                    })} */}
                    {walletList.map((wallet, index) => <li key={index} onClick={(event) => walletSelector(event, 'toAddress', wallet.publicKey)}>{wallet.name}</li>)}
                </ul>
                
                <label htmlFor="amount">
                    Amount:
                </label>
                <input
                  id="amount"
                  name="amount"
                  //   other value for type???
                  type="number"
                  value={transactionProperties.amount}
                  onChange={changeHandler}
                  required
                >
                </input>

                <button type='submit'>
                    Submit Transaction
                </button>
            </form>
        </>
    )
}

export default CreateTransaction;