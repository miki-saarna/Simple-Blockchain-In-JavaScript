import BlockValidator from "./BlockValidator";
import {CalculateHash} from "../computations/CalculateHash";

function ChainValidator({ chain }, signature) {
    // traverse blocks in the chain, having the previous and the current blocks
    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const { timestamp, transactions, previousHash, nonce } = currentBlock;
        const previousBlock = chain[i - 1];
        // is there a way to destructure previousBlock without variable name collisions?

        // check if all transactions in the block are valid
        if (!BlockValidator(currentBlock, signature)) {
            return false
        }
        // check if current block hash is valid
        if (currentBlock.hash !== CalculateHash(timestamp, transactions, previousHash, nonce)) {
            console.error("hash not equal: " + JSON.stringify(currentBlock));
            return false;
        }
        // is there a way to destructure previousBlock without variable name collisions?
        if (currentBlock.previousHash !== CalculateHash(previousBlock.timestamp, previousBlock.transactions, previousBlock.previousHash, previousBlock.nonce)) {
            console.error("previous hash not right: " + JSON.stringify(currentBlock));
            return false;
        }
    }
    return true;
}
export default ChainValidator;