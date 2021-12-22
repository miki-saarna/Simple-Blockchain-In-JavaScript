import CreateBlock from '../blocks/CreateBlock';
import MineBlock from '../blocks/MineBlock';


function MinePendingTransactions({ chain, difficulty, miningReward}, pendingTransactions, setPendingTransactions, miningRewardAddress) {

    const latestBlock = chain[chain.length - 1];
    
    // package all pending transactions together in the same block
    let block = CreateBlock(Date.now(), pendingTransactions, latestBlock.hash);
    
    // // mining, that is, constantly trying nonce to make the hash Vluw meet the requirements
    block = MineBlock(block, difficulty);

    // maybe good idea to print the block???
    // console.log(block);
    
    console.log("block successfully mined!");

    chain.push(block);

    // // put the miner fee transaction into pendingTransactions for the next processing operation. The miner fee is characterized by the source account being empty.
    setPendingTransactions([
        {
            fromAddress: null,
            toAddress: miningRewardAddress,
            amount: miningReward,
        }
    ])

}
export default MinePendingTransactions;
