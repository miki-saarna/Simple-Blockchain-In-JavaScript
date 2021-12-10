import React, { useState, useEffect } from 'react';
import {} from 'react-router-dom';
import CalculateHash from '../computations/CalculateHash';

function CreateBlockChain() {
    
    const genesisBlock = CalculateHash(Date.now(), [], '');
    const difficulty = 3;
    const miningReward = 100;
    
    const [chain, setChain] = useState([genesisBlock]);
    // const [pendingTransactions, setPendingTransactions] = useState([]);


}

export default CreateBlockChain;