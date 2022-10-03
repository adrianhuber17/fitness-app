#app/__init__.py

import os
from flask import Flask,request,session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_socketio import SocketIO,emit

db = SQLAlchemy()
cors = CORS()
socketio = SocketIO()

def create_app(script_info=None):
    app_settings = os.getenv("APP_SETTINGS")

    #instantiate app
    app = Flask(__name__)
   
    #set config
    app.config.from_object(app_settings)
    cors.init_app(
    app,
    resources={r"*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}},
    supports_credentials=True,
    )
    
    #set up extensions
    db.init_app(app)
    #register api
    from app.api import api
    api.init_app(app)

    @app.shell_context_processor
    def ctx():
        return {"app":app,"db":db}
    
    return app




