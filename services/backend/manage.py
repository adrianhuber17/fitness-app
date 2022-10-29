#manage.py

import sys, os
from flask.cli import FlaskGroup
from app import create_app,db
from app.api import crud


app = create_app()
cli = FlaskGroup(create_app=create_app)


@cli.command('reset_db')
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    print("database reset done!")

@cli.command('populate_db')
def populate_db():
    new_user = crud.create_user("ad@gmail.com",
                                "adrian",
                                "huber",
                                "123")
    db.session.add(new_user)
    db.session.commit()
    print("user_created")

    
if __name__ == "__main__":
    cli()   
 