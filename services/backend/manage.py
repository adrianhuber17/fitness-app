#manage.py

import sys, os
from flask.cli import FlaskGroup
from app import create_app,db


app = create_app()
cli = FlaskGroup(create_app=create_app)


@cli.command('reset_db')
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    print("database reset done!")

    
if __name__ == "__main__":
    cli()
   
 