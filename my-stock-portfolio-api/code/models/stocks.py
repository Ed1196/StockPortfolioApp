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
        self.open = []
        self.high = []
        self.low = []
        self.close = []
        self.volume = []

    def json(self):
        return {
            'symbol': self.firstname,
            'open': self.lastname,
            'high': self.email,
            'low': self.account,
        }

    # Day trading. We get the bolatility of the stock of any given minute.
    def getStockVolatility(self):
        # Time Series: A sequence of numerical data points taken at successuve equally spaced points in time
        # Records the stock price, over a specified period of time
        ts = TimeSeries(key=api_key, output_format='pandas')
        data, meta_data = ts.get_intraday(symbol=self.symbol, interval='1min', outputsize='full')
        self.close = data['4. close']
        percentage_change = self.close.pct_change()
        last_change = percentage_change[-1]
        return last_change

    def getStockPrice(self):
        # Time Series: A sequence of numerical data points taken at successuve equally spaced points in time
        # Records the stock price, over a specified period of time
        ts = TimeSeries(key=api_key, output_format='pandas')
        data, meta_data = ts.get_intraday(symbol=self.symbol, interval='1min', outputsize='compact')
        self.close = data['4. close']
        return self.close[0]

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
