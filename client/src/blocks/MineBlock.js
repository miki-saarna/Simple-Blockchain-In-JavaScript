import CalculateHash from "../computations/CalculateHash";

function MineBlock({ hash, difficulty }) {
    // creates hash until hash criteria is met
    while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
        nonce++;
        hash = CalculateHash
    }
}

export default MineBlock;