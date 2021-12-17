import TransactionValidator from "./TransactionValidator";

function BlockValidator({ transactions }, signature) {

    const nonMiningRewardTransactions = [];

    for (const tx of transactions) {
        if(!transactions.fromAddress) {
            nonMiningRewardTransactions.push(tx)
        }
    }

    // transactions.forEach((transaction) => {transaction.fromAddress !== null
    //     return nonMiningRewardTransactions.push(transaction)
    // })

    for (let i = 0; i < signature.length; i++) {
        if (!TransactionValidator(nonMiningRewardTransactions[i], signature[i])) {
            return false;
        }
        return true;
    }

    // for (const tx of transactions) {
    //     console.log(tx)
    //     // add the isValid transaction validator
    //     if (!TransactionValidator(tx, signature)) {
    //         return false;
    //     }
    //     return true;
    // }

}

export default BlockValidator;