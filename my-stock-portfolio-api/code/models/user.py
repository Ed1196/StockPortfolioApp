from dbAccess import auth, db


class UserModel():
    def __init__(self, firstname, lastname, email, password):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.user = ''
        self.account = 50000

    def json(self):
        return {
            'firtsname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'account': self.account,
        }

    def save_to_db(self):
        # Add account to user authentication list
        self.user = auth.create_user_with_email_and_password(self.email, self.password)

        # Add account details to database
        dbUser = {"firstname": self.firstname, "lastname": self.lastname, "email": self.email, "account": self.account}

        # This creates the path: Users - userID - user information. This is saved separtly from where the auth info
        # is saved. This saves the user to the actual database in firebase
        db.child("users").child(self.user["localId"]).set(dbUser)

    def send_ver_email(self):
        auth.send_email_verification(self.user["idToken"])

    def auth(self):
        self.user = auth.sign_in_with_email_and_password(self.email, self.password)
        return self.user['idToken']

    @classmethod
    def findByIdToken(cls, userId):
        data = db.child("users").get(userId).val
        print(data)
        return data
