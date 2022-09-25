from distutils.log import debug
import sys
from flask import Flask, request, session
from flask_socketio import SocketIO,emit
from flask_cors import CORS
import os
from sqlalchemy import true
from app.helper_files.gpx_parser import gpxParser
import app.config as config
from app.api import crud
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__)
app.config.from_object(config.BaseConfigSocket)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql:///fitness_app'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio=SocketIO(app,cors_allowed_origins="*")
users_online = {}

db.init_app(app)

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    if 'email' in session.keys():
        email = session['email']
    user_id = crud.get_user_id(email)
    print(request.sid)
    print("client has connected")
    connected_id = request.sid
    users_online[user_id] = connected_id
    emit("connect",users_online,broadcast=True)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    if 'email' in session.keys():
        email = session['email']
    user_id = crud.get_user_id(email)
    connected_id = request.sid
    del users_online[user_id]
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

@socketio.on("new_data")
def new_data(data):
    follower_info_list = crud.get_user_followers(data)
    for follower in follower_info_list:
        if follower['userId'] in users_online.keys():
            follower_sid = users_online[follower['userId']]
            emit("new_data",{'count':1},to=follower_sid,include_self=False)

if __name__ == "__main__":
    socketio.run(app,debug=True,port=5001)