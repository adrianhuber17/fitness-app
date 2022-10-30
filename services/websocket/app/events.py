
from flask_socketio import emit
from flask import request

from app.socket import socketio
from app.db import db
from app.model import *
from app.crud import *

users_online = {}

@socketio.on('connect')
def test_connect():
    print(f"client {request.sid} has connected")
    emit("connect",request.sid,broadcast=True)


@socketio.on("user_online")
def new_user(data):
    email = data['data']
    user_id = get_user_id(email)
    users_online[user_id] = request.sid
    print('users_online: ', users_online)
    emit("user_online",users_online,broadcast=True)

@socketio.on("disconnect")
def test_disconnected():
    """event listener when client disconnects to the server"""
    print(f"client {request.sid} has disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

@socketio.on("user_offline")
def user_disconnected(data):
    email = data['data']
    print('offlioneee',email)
    user_id = get_user_id(email)
    del users_online[user_id]
    print('users_online: ', users_online)
    emit("user_offline",users_online,broadcast=True)
