from flask_restful import Resource, reqparse

import security.myJWT
from models.user import UserModel
from flask import request



class Transactions(Resource):
    # Variable that will allow us to parse the data when given a request
    parser = reqparse.RequestParser()

    # Specify what we want from the payload
    parser.add_argument('quantity',
                        type=int,
                        required=True,
                        help='This field cannot be left blank!')

    parser.add_argument('price',
                        type=int,
                        required=True,
                        help='This field cannot be left blank!')

    parser.add_argument('symbol',
                        type=str,
                        required=True,
                        help='This field cannot be left blank!')

    # Post Request
    @security.myJWT.requires_auth
    def post(self):
        # We store the data that we parsed into a Variable

        data = Transactions.parser.parse_args()
        user = UserModel.find_by_id_token(request.idToken)
        localId = user['users'][0]['localId']
        aproved = UserModel.purchase_stock(data['quantity'], data['price'], data['symbol'], localId)
        if aproved:
            return {'success': True}, 201

        return {'success': False}, 201
