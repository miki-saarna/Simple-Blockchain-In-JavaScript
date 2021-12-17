import ChainValidator from "../validators/ChainValidator";

export default function AttemptToAlterChain(blockchain, alteredAmount, signature) {
    // obtain original transaction amount
    const originalAmount = blockchain.chain[1].transactions[0].amount;
    // altered transaciton amount
    blockchain.chain[1].transactions[0].amount = alteredAmount;
    // evaluate if the blockchain is still valid after altering transaction amount
    console.log('Is the chain still valid? ' + ChainValidator(blockchain, signature, originalAmount));
    // revert altered transaction amount to original amount
    blockchain.chain[1].transactions[0].amount = originalAmount;
}