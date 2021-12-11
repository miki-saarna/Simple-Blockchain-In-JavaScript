import TransactionValidator from "../transactions/TransactionValidator";

function BlockValidator({ transactions }, signature) {
    for (const tx of transactions) {
        if (!TransactionValidator(tx, signature)) {
            // add the isValid transaction validator
            return false;
        }
        return true;
    }
}

export default BlockValidator;