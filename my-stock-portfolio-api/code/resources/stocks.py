from flask_restful import Resource, reqparse
from models.stocks import StockModel
from flask import request


class StockRetriever(Resource):

    def get(self):
        symbol = request.args.get("symbol")
        # We store the data that we parsed into a Variable
        stock = StockModel(symbol)
        price = stock.getStockPrice()
        volatility = stock.getStockVolatility()
        return {'success': True, 'price': price, 'volatility': volatility}


class StockSearch(Resource):

    def get(self):
        query = request.args.get('query').lower()
        stockList = StockModel.searchStock(query)
        return {'success': True, 'stockList': stockList}
