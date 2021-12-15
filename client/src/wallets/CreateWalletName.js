import React, { useState } from 'react';
import CreateWallet from './CreateWallet';

export default function CreateWalletName({ walletList, setWalletList }) {

    const initialFormState = {
        name: '',
        publicKey: '',
        privateKey: '',
        keyPair: '',
        amount: 0,
    }
    
    const [wallet, setWallet] = useState(initialFormState);

    function submitHandler(event) {
        event.preventDefault();
        // generate keys for new wallet
        const { publicKey, privateKey, keyPair } = CreateWallet();

        setWalletList((currentList) => ([
            ...currentList,
            {
            ...wallet,
            keyPair,
            publicKey,
            privateKey,
            }
        ]))

        // reset wallet to initial form state
        setWallet(initialFormState);   
        // reset checked radio button to unchecked
        const uncheckRadioButton = document.getElementsByName('amount');
        uncheckRadioButton.forEach((input) => input.checked = false);
    }
    

    function changeHandler({ target: { name, value } }) {
        setWallet((currentWallet) => {
            // if amount, add to wallet as a number
            if (Number.isInteger(parseInt(value))) {
                return   ({
                    ...currentWallet,
                    [name]: parseInt(value),
                })
            }
            // if amount, add to wallet as a string
            return ({
                ...currentWallet,
                [name]: value,
            })
        })
    }

    return (

        <>
            <h2>Wallet Creation</h2>

            <form onSubmit={submitHandler}>
                <label htmlFor='name'>
                    New Wallet Name:
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={wallet.name}
                  onChange={changeHandler}
                  required
                >
                </input>    

                <p>Select initial deposit amount:</p>

                <input
                  id='amount'
                  name='amount'
                //   type='number'
                  type='radio'
                  value='50'
                  onChange={changeHandler}
                  >
                </input>
                <label htmlFor='amount'>
                    50
                </label>

                <input
                  id='amount'
                  name='amount'
                //   type='number'
                  type='radio'
                  value='100'
                  onChange={changeHandler}
                  >
                </input>
                <label htmlFor='amount'>
                    100
                </label>

                <input
                  id='amount'
                  name='amount'
                //   type='number'
                  type='radio'
                  value='200'
                  onChange={changeHandler}
                  >
                </input>
                <label htmlFor='amount'>
                    200
                </label>

                <button type='submit'>
                    Submit New Wallet
                </button>
            </form>         

        </>
    )
}