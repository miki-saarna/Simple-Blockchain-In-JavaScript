import React, { useState } from 'react';
import GenerateWalletKeys from './GenerateWalletKeys';

export default function GenerateWalletKeysName({ walletList, setWalletList }) {

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
        const { publicKey, privateKey, keyPair } = GenerateWalletKeys();

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

            <form onSubmit={submitHandler}>
                <h2>Wallet Creation</h2>
                {/* change below to p elements instead of h4? */}
                {walletList.length === 0 ? <h4 className='red'>Create at least 2 wallets</h4> : null}
                {walletList.length === 1 ? <h4 className='red'>Create 1 more wallet</h4> : null}
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

                <div className='depositAmounts'>
                    <input
                      id='amount'
                      name='amount'
                    //   type='number'
                      type='radio'
                      value='10'
                      onChange={changeHandler}
                      >
                    </input>
                    <label htmlFor='amount'>
                        10
                    </label>

                    <input
                      id='amount'
                      name='amount'
                    //   type='number'
                      type='radio'
                      value='25'
                      onChange={changeHandler}
                      >
                    </input>
                    <label htmlFor='amount'>
                        25
                    </label>

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
                </div>

                <button type='submit'>
                    Submit New Wallet
                </button>
            </form>         

        </>
    )
}