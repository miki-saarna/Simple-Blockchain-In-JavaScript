import {CalculateHashForTransaction} from "../computations/CalculateHash";

function SignTransaction({ timestamp, fromAddress, toAddress, amount }, signingKey) {

    // miner transaction is valid
    if (fromAddress === null) return true;

    if (signingKey.getPublic('hex') !== fromAddress) {
        throw new Error('You cannot sign transactions for other wallets!');
    }

    // sign transaction hash with the private key
    const hash = CalculateHashForTransaction(timestamp, fromAddress, toAddress, amount);
    
    const sign = signingKey.sign(hash, 'base64');
    // convert the signature to the DER format
    const signature = sign.toDER('hex');
    
    
    console.log("signature: " + signature);
    return signature
}

export default SignTransaction;