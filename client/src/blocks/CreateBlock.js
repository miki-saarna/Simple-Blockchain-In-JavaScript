// import React, { useState, useEffect } from 'react';
import CalculateHash from '../computations/CalculateHash';

function Block(timestamp, transactions = [], previousHash = '') {
    const initialFormState = {
        timestamp: timestamp,
        transactions: transactions,
        previousHash: previousHash,
        nonce: 0,
    }
    
    const hash = CalculateHash(
        initialFormState.timestamp,
        initialFormState.transactions,
        initialFormState.previousHash,
        initialFormState.nonce,
    )

    // do I need to useState? Can I just return an object of the properties?
    // const [blockProperties, setBlockProperties] = useState({...initialFormState, hash});

    // initialFormState["hash"] = hash;

    return {...initialFormState, hash};
}

export default Block;