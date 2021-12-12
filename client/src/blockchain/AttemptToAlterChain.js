import ChainValidator from "./ChainValidator";

export default function AttemptToAlterChain(blockchain, amount, signature) {
    const originalAmount = blockchain.chain[1].transactions[0].amount;
    blockchain.chain[1].transactions[0].amount = amount
    console.log('Is the chain still valid? ' + ChainValidator(blockchain, signature, originalAmount));
    blockchain.chain[1].transactions[0].amount = originalAmount;
}