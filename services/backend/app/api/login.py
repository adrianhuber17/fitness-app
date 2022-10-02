from flask_restx import Namespace,Resource
from flask import jsonify,session,request
from app.api import crud

login_namespace = Namespace("login")

class Login(Resource):
    def post(self):
        post_data = request.get_json()
        email = post_data.get('email')
        password = post_data.get('password')
        if crud.is_user_correct(email) == True and crud.is_password_correct(password) == True:
            session['email'] = session.get('email',email)
            user_json = crud.get_user_json(email)
            response = jsonify({'status':'sign in ok', 'email': email,'userData':user_json})
            return response
        elif crud.is_user_correct(email) == False:
            return jsonify({'status':'wrong email'})
        elif crud.is_password_correct(password) == False:
            return jsonify({'status':'wrong password'})

login_namespace.add_resource(Login,"")