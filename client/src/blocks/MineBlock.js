import CalculateHash from "../computations/CalculateHash";

function MineBlock({ timestamp, transactions, previousHash, nonce, hash }, difficulty) {
    // creates hash until hash criteria is met
    while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
        nonce++;
        hash = CalculateHash(timestamp, transactions, previousHash, nonce)
    }
    console.log("Block mined, nonce: " + nonce + ", hash: " + hash);
    return {
        timestamp,
        transactions,
        previousHash,
        nonce,
        hash
    }
}

export default MineBlock;