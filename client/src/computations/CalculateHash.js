import SHA256 from 'crypto-js/sha256'

// decided not to consolidate the 2 similar functions below into 1 function due to awkward parameter naming conventions
function CalculateHash(timestamp, transactions, previousHash, nonce) {
    return SHA256(timestamp + JSON.stringify(transactions) + previousHash + nonce).toString()
}

function CalculateHashForTransaction(timestamp, fromAddress, toAddress, amount) {
    return SHA256(timestamp + fromAddress + toAddress + amount).toString()
}

export {
    CalculateHash,
    CalculateHashForTransaction,
}

