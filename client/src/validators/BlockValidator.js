import TransactionValidator from "./TransactionValidator";

function BlockValidator({ transactions }, signature) {

    const nonMiningRewardTransactions = [];

    for (const tx of transactions) {
        if(tx.fromAddress) {
            nonMiningRewardTransactions.push(tx)
        }
    }

    // for (let i = 0; i < signature.length; i++) {
        if (!TransactionValidator(nonMiningRewardTransactions[0], signature)) {
        // if (!TransactionValidator(nonMiningRewardTransactions[i], signature[i])) {
            return false;
        }
        return true;
    // }
}

export default BlockValidator;