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
        user.save_to_db()
        user.send_ver_email()
        return {'message': 'User was created succesfully!'}, 201


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
        idToken = user.auth()
        return {'success': True, 'idToken': idToken}, 201


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
        return{'portfolioUpdated': response}
