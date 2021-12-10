import SHA256 from 'crypto-js/sha256'

function CalculateHash(timestamp, transactions, previousHash, nonce) {
    if(!nonce) {
        return SHA256(timestamp + transactions + previousHash).toString()    
        
        // return SHA256(timestamp + JSON.stringify(transactions) + previousHash).toString()    
    }
    return SHA256(timestamp + JSON.stringify(transactions) + previousHash + nonce).toString()
}

export default CalculateHash;

