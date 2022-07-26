const core = require('@actions/core');
const github = require('@actions/github');
const symbol = require('symbol-sdk');
const fs = require('fs');
const WebSocket = require('ws');

require('dotenv').config();

function test(){
    fs.readFile('.env', 'utf-8', function(err, data) {
        var ward = "ADDRESS";
        const lines = data.split("\n");

        console.log(lines);

        function filterWards(arr, query) {
            return arr.filter(function(el) {
                return el.indexOf(query) == -1;
            });
        }
        const henkou = filterWards(lines, ward);
        console.log(henkou);

        fs.writeFile(".env", henkou.join("\n"), function(err) {});
    });
}

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const BOT_PRIVATEKEY = core.getInput('BOT_PRIVATEKEY');
  const NODE = "https://hideyoshi.mydns.jp:3001";
  const repositoryFactory = new RepositoryFactoryHttp(NODE);
const txRepo = repositoryFactory.createTransactionRepository();
const receiptHttp = repositoryFactory.createReceiptRepository();
const wsEndpoint = NODE.replace('http', 'ws') + "/ws";
const nsHttp = new symbol.NamespaceHttp(NODE);
const listener = new symbol.Listener(wsEndpoint,nsHttp,WebSocket);
const transactionService = new symbol.TransactionService(txRepo, receiptHttp);
const ea = 1637848847;
const nt =symbol.NetworkType.TEST_NET;
const ng = "7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836";
const deadline = symbol.Deadline.create(ea);
const bene = symbol.PublicAccount.createFromPublicKey("71754759FD4F25981ED20F60050C20AB1E7CA104A87EC758E9B1E69FCA0286D6", nt);
const bot = symbol.Account.createFromPrivateKey(BOT_PRIVATEKEY, nt);
const bob = symbol.PublicAccount.createFromPublicKey("B055C6F655CD3101A04567F9499F24BE7AB970C879887BD3C6644AB7CAA22D22", nt);

const tx = symbol.TransferTransaction.create(
    deadline,
    bob.address,
    [new symbol.Mosaic(new symbol.MosaicId("3A8416DB2D53B6C8"), symbol.UInt64.fromUint(1000000))],
    symbol.PlainMessage.create("test"),
    nt
  ).setMaxFee(100)
  
  const agg = symbol.AggregateTransaction.createBonded(
    deadline,
    [tx.toAggregate(bene)],
    nt
  ).setMaxFeeForAggregate(100, 2)
  
  const signedAggregateTx = bot.sign(agg, ng);
  
  const hashLockTx = symbol.HashLockTransaction.create(
      deadline,
      new symbol.Mosaic(new symbol.MosaicId("3A8416DB2D53B6C8"), symbol.UInt64.fromUint(10000000)),
      symbol.UInt64.fromUint(480),
      signedAggregateTx,
      nt,
      symbol.UInt64.fromUint(1000000)
  );
  
  console.log(agg.serialize())
  console.log(hashLockTx.serialize())
  
  const signedLockTx = bot.sign(hashLockTx, ng);
  listener.open().then(() => {
      transactionService.announceHashLockAggregateBonded(
        signedLockTx,
        signedAggregateTx,
        listener
      ).subscribe(aggTx => {
          console.log(aggTx)
          listener.close();
      })
  });

  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  const address = process.env.ADDRESS;
  const fee = process.env.FEE;
  console.log(address);
  console.log(fee);
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  test();
} catch (error) {
  core.setFailed(error.message);
}