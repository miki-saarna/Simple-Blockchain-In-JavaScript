import CalculateHash from "../computations/CalculateHash";
import SHA256 from 'crypto-js/sha256'
import Elliptic from 'elliptic';

const ec = new Elliptic.ec('secp256k1');

function SignTransaction( { fromAddress, toAddress, amount }, signingKey ) {
    
    // miner transaction is valid
    if (fromAddress === null) return true;

    if (signingKey.getPublic('hex') !== fromAddress) {
        throw new Error('You cannot sign transactions for other wallets!');
    }

    // sign transaction hash with the private key
    const hash = CalculateHash(fromAddress, toAddress, amount);
    const sign = signingKey.sign(hash, 'base64');
    // convert the signature to the DER format
    const signature = sign.toDER('hex');
    
    console.log("signature: " + signature);
    return signature
}

export default SignTransaction;
