from flask_restful import Resource, reqparse
from models.user import UserModel
import security.myJWT
from flask import request


class UserRegister(Resource):
    # Variable that will allow us to parse the data when given a request
    parser = reqparse.RequestParser()

    # Specify what we want from the payload
    parser.add_argument('firstname',
                        type=str,
                        required=True,
                        help='This field cannot be left blank!')

    parser.add_argument('lastname',
                        type=str,
                        required=True,
                        help='This field cannot be left blank!')

    parser.add_argument('email',
                        type=str,
                        required=True,
                        help='This field cannot be left blank!')

    parser.add_argument('password',
                        type=str,
                        required=True,
                        help='This field cannot be left blank!')

    # Post Request
    def post(self):
        # We store the data that we parsed into a Variable
        data = UserRegister.parser.parse_args()
        user = UserModel(data['firstname'], data['lastname'], data['email'], data['password'])
        try:
            user.save_to_db()
            user.send_ver_email()
            idToken = user.user
            return {'success': True , 'message': 'User was created succesfully!', 'idToken': idToken['idToken']}, 201
        except:
            return {'success': False, 'message': 'User could not be created!'}


class UserLogin(Resource):
    # Variable that will allow us to parse the data when given a request
    parser = reqparse.RequestParser()

    parser.add_argument('email',
                        type=str,
                        required=True,
                        help='This field cannot be left blank!')

    parser.add_argument('password',
                        type=str,
                        required=True,
                        help='This field cannot be left blank!')

    # Post Request
    def post(self):
        # We store the data that we parsed into a Variable
        data = UserLogin.parser.parse_args()
        user = UserModel('', '', data['email'], data['password'])
        try:
            idToken = user.auth()
            return {'success': True, 'idToken': idToken}, 201
        except:
            return {'success': False, 'message': 'Invalid Credentials'}



class UserInfo(Resource):

    # Post Request
    @security.myJWT.requires_auth
    def get(self):
        user = UserModel.find_by_id_token(request.idToken)
        localId = user['users'][0]['localId']
        userDetails = UserModel.get_user_details(localId)
        return {'userdetails': userDetails}


class UpdateMyStock(Resource):
    @security.myJWT.requires_auth
    def get(self):
        user = UserModel.find_by_id_token(request.idToken)
        response = UserModel.check_stock_changes(user['users'][0]['localId'])
        if not response:
            return {'success': False,
                    'message': "Alpha Vantage Api calls frequency of 5 per minute or 500 per day has been hit. Please wait."}
        return {'mystocks': response[0], 'portfolio': response[1], 'success': True}




class UpdateMyStockCompact(Resource):
    # Variable that will allow us to parse the data when given a request
    parser = reqparse.RequestParser()

    parser.add_argument('stocks',
                        type=list,
                        required=True,
                        help='This field cannot be left blank!')

    @security.myJWT.requires_auth
    def get(self):
        data = UpdateMyStockCompact.parser.parse_args()
        print(data)
        user = UserModel.find_by_id_token(request.idToken)
        response = UserModel.check_stock_changes_compact(user['users'][0]['localId'], data['stocks'])
        if not response:
            return {'success': False,
                    'message': "Alpha Vantage Api calls frequency of 5 per minute or 500 per day has been hit. Please wait."}
        return {'mystocks': response[0], 'portfolio': response[1], 'success': True}
