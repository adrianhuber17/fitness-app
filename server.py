from crypt import methods
from flask import Flask, redirect, render_template,jsonify, request, session, flash
import os
from gpx_parser import gpxParser
import crud

app = Flask(__name__)
SECRET_KEY = os.environ['APP_KEY']
app.secret_key = SECRET_KEY


@app.route('/')
def index():
    """homepage route"""
    if 'email' in session.keys():
        print(session)
        return render_template('index.html')
    else:
        print(session)
        return render_template('login-page.html')

@app.route("/login",methods=["POST"])
def login():
    """Login a user if user_name and password are correct"""

    user_email = request.form.get('ex_email')
    password = request.form.get('ex_password')

    if crud.is_user_correct(user_email) == True and crud.is_password_correct(password) == True:
        session['email'] = session.get('email',user_email)
        return redirect('/')
    elif crud.is_user_exist(user_email) == None:
        print('wrong user_name')
        flash('Username is incorrect')
        return redirect('/')
    elif crud.is_password_correct(password) == None:
        print('wrong password')
        flash('Password is incorrect')
        return redirect('/')

@app.route("/logout",methods=["POST"])
def logout():
    """logs user out and clears the session"""

    session.clear()

    flash("Successfully logged out")
    return redirect('/')

@app.route("/create-account",methods=["POST"])
def create_user():
    """creates a new user and adds them to the database"""
    # work on this section
    return 

@app.route("/map.json")
def get_activity_map_data():
    """endpoint with cordinates JSON for the map"""
    gpx_file_test = 'Camilo_Ride.gpx'
    activity = gpxParser()
    activity.complete_gpx_parser_main(gpx_file_test)

    return jsonify(activity.map_json)



if __name__ == "__main__":
    from model import connect_to_db

    connect_to_db(app)
    app.run(debug=True)