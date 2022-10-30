
from flask import Flask
from flask_cors import CORS

# Extensions
from app.socket import socketio
from app.db import db
import os



def create_app():
    app_settings = os.getenv("APP_SETTINGS")
    app = Flask(__name__)
    app.config.from_object(app_settings)
    CORS(app,resources={r"/*":{"origins":"*"}})
    db.init_app(app)
    register_extensions(app)
    
    return app


def register_extensions(app):
    socketio.init_app(app, async_mode='eventlet',cors_allowed_origins="*")

#TODO: fix listeners

# from distutils.log import debug
# import sys
# from flask import Flask, request, session
# from flask_socketio import SocketIO,emit
# from flask_cors import CORS
# from sqlalchemy import true
# from app import config_socket
# from flask_sqlalchemy import SQLAlchemy
# from app import crud

# #TODO: find a way to dockerize web_socket using docker compose

# db = SQLAlchemy()
# app = Flask(__name__)
# # app.config.from_object(config_socket.BaseConfig)
# app.config['ENV']= 'development'
# app.config['SQLALCHEMY_DATABASE_URI']='postgresql:///app_dev'
# app.config['DEBUG'] = True
# app.config['TESTING'] = False
# app.config['SECRET_KEY'] = 'secret_2'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# CORS(app,resources={r"/*":{"origins":"*"}})
# socketio=SocketIO(app,cors_allowed_origins="*")
# users_online = {}
# db.init_app(app)
# print(app.config)

# @socketio.on("connect")
# def connected():
#     """event listener when client connects to the server"""
#     # if 'email' in session.keys():
#     #     email = session['email']
#     # user_id = crud.get_user_id(email)
#     print(request.sid)
#     print("client has connected")
#     # connected_id = request.sid
#     # users_online[user_id] = connected_id
#     emit("connect",users_online,broadcast=True)

# @socketio.on("disconnect")
# def disconnected():
#     """event listener when client disconnects to the server"""
#     print("user disconnected")
#     # if 'email' in session.keys():
#     #     email = session['email']
#     # user_id = crud.get_user_id(email)
#     # connected_id = request.sid
#     # del users_online[user_id]
#     emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

# @socketio.on("user_online")
# def new_user(data):
#     email = data['data']
#     # user_id = crud.get_user_id(email)
#     # print(user_id)

# @socketio.on("new_data")
# def new_data(data):
#     follower_info_list = crud.get_user_followers(data)
#     for follower in follower_info_list:
#         if follower['userId'] in users_online.keys():
#             follower_sid = users_online[follower['userId']]
#             emit("new_data",{'count':1},to=follower_sid,include_self=False)

# if __name__ == "__main__":
#     socketio.run(app,debug=True,port=5001)