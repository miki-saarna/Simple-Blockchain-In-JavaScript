

import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

export default function createWallet() {
    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');

    return {
        publicKey,
        privateKey,
        keyPair,
    }
}