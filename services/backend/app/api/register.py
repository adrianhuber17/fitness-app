from flask_restx import Namespace,Resource
from flask import jsonify,session,request
from app.api import crud
from app import db

register_namespace = Namespace("register")

class Register(Resource):
    def post(self):
        post_data = request.get_json()
        email = post_data.get('email')
        password = post_data.get('password')
        first_name = post_data.get('firstName')
        last_name = post_data.get('lastName')

        if crud.is_user_correct(email) == False:
            new_user = crud.create_user(email,first_name,last_name,password)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"status":"Success"})
        else:
            return jsonify({"status":"Fail"})

register_namespace.add_resource(Register,"")