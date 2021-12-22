// import { chain } from 'CreateBlockChain';

    function GetWalletBalance({ chain }, walletPublicKey) {
        let balance = 0;
        // iterate over the chain, block by block
        for (const block of chain) {
            // tx by tx, checking for from and to address
            for (const transaction of block.transactions) {
                // check if address sent tokens in this tx
                if (transaction.fromAddress === walletPublicKey) {
                    balance -= transaction.amount;
                }

                // check if address received tokens in this tx
                if (transaction.toAddress === walletPublicKey) {
                    balance += transaction.amount;
                }
            }
        }
        return balance
    }

    export default GetWalletBalance;