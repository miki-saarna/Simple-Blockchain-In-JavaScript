// import React, { useState, useEffect } from 'react';
import CalculateHash from '../computations/CalculateHash';

function CreateBlock(timestamp, transactions = [], previousHash = '') {
    const nonce = 0;

    const hash = CalculateHash(
        timestamp,
        transactions,
        previousHash,
        nonce,
    )

    return {
        timestamp,
        transactions,
        previousHash,
        nonce,
        hash,
    };
}

export default CreateBlock;