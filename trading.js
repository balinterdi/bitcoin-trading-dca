require('dotenv').config();

const Kraken = require('kraken-api');
const util = require('util');
const timestamp = () => new Date().toISOString();

const { EventEmitter } = require('events');

const emitter = new EventEmitter();

// set an higher timeout
const client = new Kraken(process.env.KRAKEN_KEY, process.env.KRAKEN_SECRET, {
    timeout: 60 * 60 * 48 * 1000
});

const investmentAmount = process.env.INVESTMENT_AMOUNT;
// see full list of exhange pairs here
// https://api.kraken.com/0/public/AssetPairs
const pair = (process.env.ASSETS_PAIR || 'XXBTZEUR').toUpperCase();

const cryptoCurrency = pair.slice(1, 4);
const fiatCurrency = pair.slice(-3);

const main = async () => {
    try {
        // Retrieve crypto/eur price
        const tickResponse = await client.api('Ticker', {pair});
        const cryptoPrice = tickResponse['result'][pair]['a'][0];
        if (typeof cryptoPrice === 'undefined') {
            emitter.emit('error', {
                msg: `Unable to retrieve ${cryptoCurrency} price`
            });
            return;
        }
        const volumeToBuy = (investmentAmount/cryptoPrice).toFixed(6);
        const roundedInvestmentAmount = (volumeToBuy*cryptoPrice).toFixed(3);

        // Kraken does not allow to buy less than 0.002XBT
        if (volumeToBuy < 0.002) {
            emitter.emit('error', {
                msg: `Increase your investment amount.` +
                `You must buy at least 0.002 ${cryptoCurrency} per trade`
            });
            return;
        }
        const logMessage = util.format(`[${timestamp()}] Buying ${volumeToBuy} ${cryptoCurrency}`,
            `which is equal to ${roundedInvestmentAmount} ${fiatCurrency}`,
            `at price ${cryptoPrice} ${fiatCurrency}/${cryptoCurrency}\n`);

        // Emit log event
        emitter.emit('log', {
            msg: logMessage,
            cryptoCurrency,
            cryptoPrice,
            fiatCurrency,
            roundedInvestmentAmount,
            volumeToBuy
        });

        // buy disposed amount for today
        const tradeResponse = await client.api('AddOrder', {
            pair,
            volume: volumeToBuy,
            type: 'buy',
            ordertype: 'market'
        });
        // Retrieve and log transaction ids
        const txIds = tradeResponse['result']['txid'];
        if (typeof txIds === 'undefined') {
            emitter.emit('error', {
                msg: 'Unable to read transaction ids'
            })
            return;
        }
        emitter.emit('success', {
            msg: util.format(`[${timestamp()}] Trade completed successfully: ${txIds}`),
            transactionId: txIds
        });
    } catch (e) {
        emitter.emit('fail', {
            msg: util.format(`[${timestamp()}] Unable to perform operation: ${e}`),
            error: e
        })
    }
};

module.exports = {
    main,
    emitter
};
