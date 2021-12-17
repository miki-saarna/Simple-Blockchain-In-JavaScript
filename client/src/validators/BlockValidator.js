import TransactionValidator from "./TransactionValidator";

function BlockValidator({ transactions }, signature) {
    for (const tx of transactions) {
        console.log(tx)
        // add the isValid transaction validator
        if (!TransactionValidator(tx, signature)) {
            return false;
        }
        return true;
    }
}

export default BlockValidator;