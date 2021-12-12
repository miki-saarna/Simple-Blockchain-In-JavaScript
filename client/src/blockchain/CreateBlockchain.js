// import React, { useState, useEffect } from 'react';
import CreateBlock from '../blocks/CreateBlock';

function CreateBlockChain() {
    const genesisBlock = CreateBlock(Date.now());
    const difficulty = 3;
    const miningReward = 100;
    let chain = [genesisBlock];
    // const [chain, setChain] = useState([genesisBlock]);
    // const [pendingTransactions, setPendingTransactions] = useState([]);

    return {
        chain,
        difficulty,
        miningReward
    }
}

export default CreateBlockChain;