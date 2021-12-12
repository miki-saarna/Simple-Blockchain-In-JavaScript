// import { chain } from 'CreateBlockChain';

    function GetWalletBalance({ chain }, walletPublicKey) {
        let balance = 0;
        // iterate over the chain, block by block
        for (const block of chain) {
            // tx by tx, checking for from and to address
            for (const transaction of block.transactions) {
                // check if address sent tokens in this tx
                if (transaction.fromAddress === walletPublicKey) {
                    // Number conversion validation necessary, unsure why sometimes it's a string...
                    console.log(typeof transaction.amount)
                    balance -= parseInt(transaction.amount);
                    // use parseInt instead
                }

                // check if address received tokens in this tx
                if (transaction.toAddress === walletPublicKey) {
                    console.log(typeof transaction.amount)
                    // Number conversion validation necessary, unsure why sometimes it's a string...
                    balance += parseInt(transaction.amount);
                    // use parseInt instead
                }
            }
        }
        return balance
    }

    export default GetWalletBalance;