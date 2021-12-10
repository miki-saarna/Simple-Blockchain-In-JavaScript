import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CalculateHash from '../computations/CalculateHash';

function Block({ timestamp, transactions, previousHash = '' }) {
    const initialFormState = {
        timestamp: timestamp,
        transaction: transactions,
        previousHash: previousHash,
        nonce: 0,
    }
    
    const hash = CalculateHash(
        initialFormState.timestamp,
        initialFormState.transaction,
        initialFormState.previousHash,
        initialFormState.nonce,
    )

    const [blockProperties, setBlockProperties] = useState(initialFormState);

    

    initialFormState["hash"] = hash;

    return blockProperties;

    // return (
    //     <>
    //         {JSON.stringify(initialFormState)}
    //     </>
    // )
}


export default Block;