#manage.py

import sys, os
from flask.cli import FlaskGroup
from app import create_app,db

app = create_app()
# socketio = create_socket(app)
# app_socker = create_socket()
cli = FlaskGroup(create_app=create_app)
print(cli)
# cli_2 = FlaskGroup(create_app=create_socket)

@cli.command('reset_db')
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    print("database reset done!")

@cli.command('websocket')
def recreate_db():
    # socketio.run(app)
    print("running socket")


if __name__ == "__main__":
    cli()