import ChainValidator from "../validators/ChainValidator";

export default function AttemptToAlterChain(blockchain, alteredAmount, signature) {
    // obtain original transaction amount
    // this might not even be called properly because chain[1] might not even exist in the first transaction???
    const originalAmount = blockchain.chain[1].transactions[0].amount;
    // altered transaciton amount
    blockchain.chain[1].transactions[0].amount = alteredAmount;
    // evaluate if the blockchain is still valid after altering transaction amount
    console.log('Is the chain still valid? ' + ChainValidator(blockchain, signature, originalAmount));
    // revert altered transaction amount to original amount
    blockchain.chain[1].transactions[0].amount = originalAmount;
}