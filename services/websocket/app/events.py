
from flask_socketio import emit
from flask import request

from app.socket import socketio
from app.db import db
from app.model import *
from app.crud import *

users_online = {}

@socketio.on('connect')
def test_connect():
    """event listener when client has connected to the server"""
    print(f"client {request.sid} has connected")
    emit("connect",request.sid,broadcast=True)


@socketio.on("user_online")
def new_user(data):
    """event listener to add new connected client to the online users dict"""
    user_id = data['data']
    users_online[request.sid] = user_id
    print('users_online: ', users_online)
    emit("user_online",users_online,broadcast=True)

@socketio.on("disconnect")
def test_disconnected():
    """event listener when client disconnects to the server"""
    print(f"client {request.sid} has disconnected")
    del users_online[request.sid]
    print("current online users: ",users_online)
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

