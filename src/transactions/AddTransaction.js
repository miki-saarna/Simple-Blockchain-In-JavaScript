import TransactionValidator from '../validators/TransactionValidator';



function AddTransaction(transaction, signature, setPendingTransactions, setInitiateMining) {
    if (!transaction.fromAddress || !transaction.toAddress) {
        throw new Error('Transaction must include from and to address');
    }
    // verify that the transaction is valid before it can be submitteed to the trading pool
    if (!TransactionValidator(transaction, signature)) {
        throw new Error('Cannot add invalid transaction to the chain');
    }
    transaction = {
        ...transaction,
        signature: signature,
    }

    // add transaction to the mempool
    setPendingTransactions((pendingTransactions) => ([
        ...pendingTransactions,
        transaction,
    ]))
    setInitiateMining(true);
}

export default AddTransaction;