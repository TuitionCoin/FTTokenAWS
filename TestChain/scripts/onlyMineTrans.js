var minimum_confirmations = 12;
var mining_threads = 1;
var txBlock = 0;
function checkWork() {
    if (eth.getBlock("pending").transactions.length > 0) {
        txBlock = eth.getBlock("pending").number;
        if (eth.mining) return 'mining';
        console.log("  Transactions pending. Mining...");
        miner.start(mining_threads);
        interval = setInterval(function () {
            if (eth.getBlock("latest").number < txBlock + minimum_confirmations) {
                if (eth.getBlock("pending").transactions.length > 0) 
                    txBlock = eth.getBlock("pending").number;
            } else {
                console.log(minimum_confirmations + " confirmations achieved; mining stopped.");
                miner.stop();
                clearInterval(interval);
            }
        }, 100)
    } else {
        return 'no Trans';
    }
}

checkWorkSubscribe = eth.filter("pending", function (err, block) { checkWork(); });
