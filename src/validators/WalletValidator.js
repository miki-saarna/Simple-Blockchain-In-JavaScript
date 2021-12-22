import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

export default function WalletValidator(privateKey, publicKey) {
    const key = ec.keyFromPrivate(privateKey);

    // derive public key from private key
    const publicKeyFromPrivate = key.getPublic('hex');

    return publicKeyFromPrivate === publicKey;
}