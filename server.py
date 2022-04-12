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
    elif crud.is_user_correct(user_email) == None:
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
    email = request.form.get('email')
    password = request.form.get('password')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')

    if crud.is_user_correct(email) == None:
        new_user = crud.create_user(email,first_name,last_name,password)
        db.session.add(new_user)
        db.session.commit()
        flash("Account successfully created")
        return redirect('/')
    else:
        flash("User already exist, please try a different email")
        return redirect('/')

@app.route("/user-profile")
def get_user_profile():


    return render_template("user-profile.html")

@app.route("/map.json")
def get_activity_map_data():
    """endpoint with cordinates JSON for the map"""
    gpx_file_test = '/Users/adrianhuber/fitness-web-app/gpx_files/Mike_Ride.gpx'
    activity = gpxParser()
    activity.complete_gpx_parser_main(gpx_file_test)

    return jsonify(activity.map_json)



if __name__ == "__main__":
    from model import connect_to_db, db

    connect_to_db(app)
    app.run(debug=True)