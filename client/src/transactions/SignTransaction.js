import CalculateHash from "../computations/CalculateHash";
import SHA256 from 'crypto-js/sha256'
import Elliptic from 'elliptic';

const ec = new Elliptic.ec('secp256k1');

function SignTransaction( { fromAddress, toAddress, amount }, signingKey ) {
    
    // miner transaction is valid
    if (fromAddress === null) return true;

    // verify if source account is person's address
    // struggling to get this validation to function properly... keys generated always changing upon each execution
    // console.log(fromAddress)
    // console.log(`signing 1: ${signingKey}`);
    // console.log(`signing 2: ${signingKey}`);

    // const keyA = signingKey;
    // const keyB = signingKey;
    // console.log(`is it true??? ${keyA === keyB}`)

    // console.log(`signing 1: ${signingKey.getPublic('hex')}`)
    // console.log(`signing 2: ${signingKey.getPublic('hex')}`)
    // console.log(`signing 3: ${signingKey.getPublic('hex')}`)
    // console.log(`fromAddress: ${fromAddress}`)


    if (signingKey.getPublic('hex') !== fromAddress) {
        // console.log(signingKey.getPublic('hex'))
        // console.log(fromAddress)
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
