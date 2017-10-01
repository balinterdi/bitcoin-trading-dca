## Bitcoin investing using Dollar Cost Averaging strategy

This node script let you set a daily amount to invest on crypto currency (Bitcoin in this case) via the [kraken crypto exchange](https://kraken.com).

### Dollar Cost Averaging

> Dollar-cost averaging (DCA) is an investment technique of buying a fixed dollar amount of a particular investment on a regular schedule, regardless of the share price. The investor purchases more shares when prices are low and fewer shares when prices are high.

Dollar Cost Averaging has being initially used in the stock market to pursue an investment on an higher number of stocks with the same amount spend, just by investing it in a longer period of time due to the volatility of the stocks.

In the case of crypto-currency is well known that the volatility of those assets is way higher than the traditional shares purchased in the stock market. This makes the Dollar Cost Averaging strategy well suited for this type of investments.

### How you should choose investment amount and range
This highly depends on your risk level, in my case what I've done is set up a total investment amount.
Let's say I want to invest 1000$ and I want to spread my investment for 3 months. I also know I want to invest daily to take advantage of the volatility of the bitcoin against the dollar.

> 1000 / (3 * 30) = 1000 / 90 = ~11$ / day

I will then setup my `.env` file

```sh
KRAKEN_KEY=myKrakenKeyHere
KRAKEN_SECRET=myKrakenSecretKeyHere
INVESTMENT_AMOUNT=11.11
ASSETS_PAIR=XXBTZEUR
```

### Pre-requisites

In order to make it work you will need

- A bitcoin wallet obviously. I've used a desktop/paper wallet [Electrum](https://electrum.org)
- A way to exchange EUR with Bitcoins and other crypto-currencies. This repo uses [Kraken Exchange](https://kraken.com)
- [node.js 8](https://nodejs.org)
- [npm](https://www.npmjs.com/)

### Getting started
Once you have registered your bitcoin wallet, you have your kraken account with enough funds and you've installed node js, you can start

**Clone the project locally**
```sh
git clone github.com/0x13a/bitcoin-trading-dca && cd bitcoin-trading-dca
```

**Install the dependencies**
```sh
npm install
```

**Run**

This should be run once a day, every day, after lunch **or** setup a [cronjob](https://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/) that runs it for you every day
```sh
node index.js
```

### Serverless template

There is a serverless template that you can use if you want to deploy this to an
aws lambda https://github.com/izifortune/bitcoin-trading-dca-serverless

### Disclaimer

Dollar Cost Averaging is meant to be used as a long-term strategy. This does not mean that returns are guaranteed, it's an investment and it's on your own risk. The general idea of this is to be used as [Buy, hold and don't watch too closely](https://www.cnbc.com/2016/03/04/warren-buffett-buy-hold-and-dont-watch-too-closely.html)
