import pandas as pd
from alpha_vantage.timeseries import TimeSeries
from flask import request
import requests

from donotexport.myKey import MyKey

# Remove when in production
key = MyKey()
api_key = key.returnKey()
api_url = "https://www.alphavantage.co"


class StockModel():
    def __init__(self, symbol):
        self.symbol = symbol
        self.open: float = 0
        self.high: float = 0
        self.low: float = 0
        self.close: float = 0
        self.volume: float = 0
        self.volatility: float = 0
        self.date = ''

    def json(self):
        return {

            'symbol': self.symbol,
            'open': self.open,
            'high': self.high,
            'low': self.low,
            'close': self.close,
            'volume': self.volume,
            'volatility': self.volatility,
            'date': self.date
        }

    # Day trading. We get the bolatility of the stock of any given minute.
    def getStockVolatility(self):
        # Time Series: A sequence of numerical data points taken at successuve equally spaced points in time
        # Records the stock price, over a specified period of time
        pass

    def getStockInfo(self):
        # Time Series: A sequence of numerical data points taken at successuve equally spaced points in time
        # Records the stock price, over a specified period of time
        ts = TimeSeries(key=api_key, output_format='pandas')
        data, meta_data = ts.get_intraday(symbol=self.symbol, interval='1min', outputsize='compact')
        self.open = data['1. open'][0]
        self.high = data['2. high'][0]
        self.low = data['3. low'][0]
        self.close = data['4. close'][0]
        self.volume = data['5. volume'][0]
        self.date = str(data.index[0])
        percentage_change = data['4. close'].pct_change()
        self.volatility = percentage_change[-1]


    @classmethod
    def searchStock(self, query):
        """
        Search stock via Ticker Symbol

        URL Parameters:
            query: string, required
        :return string:
        """
        response = requests.get(api_url + "/query?function=SYMBOL_SEARCH&keywords=" + query + "&apikey=" + api_key)
        stockList = response.json()
        list = stockList['bestMatches']
        ret = []

        if len(list) == 0:
            return []

        for stock in list:
            ret.append(stock['1. symbol'])
        return ret

    @classmethod
    def getStockLatestInfo(cls, symbol):
        ts = TimeSeries(key=api_key, output_format='pandas')
        data, meta_data = ts.get_intraday(symbol=symbol, interval='1min', outputsize='compact')
        stock = StockModel(symbol)
        stock.open = data['1. open'][0]
        stock.high = data['2. high'][0]
        stock.low = data['3. low'][0]
        stock.close = data['4. close'][0]
        stock.volume = data['5. volume'][0]
        stock.date = str(data.index[0])
        return stock.json()


