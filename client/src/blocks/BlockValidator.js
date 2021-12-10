import TransactionValidator from "../transactions/TransactionValidator";

function BlockValidator({ transactions }) {
    for (const tx of transactions) {
        if (!TransactionValidator(tx)) {
            // add the isValid transaction validator
            return false;
        }
        return true;
    }
}

export default BlockValidator;