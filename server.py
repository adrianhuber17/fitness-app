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
        return render_template('index.html')
    else:
        return render_template('login-page.html')

@app.route("/login",methods=["POST"])
def login():
    """Login a user if user_name and password are correct"""

    user_email = request.form.get('ex_email')
    password = request.form.get('ex_password')

    if crud.is_user_correct(user_email) == True and crud.is_password_correct(password) == True:
        session['email'] = session.get('email',user_email)
        return redirect('/')
    elif crud.is_user_correct(user_email) == False:
        print('wrong user_name')
        flash('Username is incorrect')
        return redirect('/')
    elif crud.is_password_correct(password) == False:
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

    if crud.is_user_correct(email) == False:
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
    """Route to the user profile page"""

    return render_template("user-profile.html")

@app.route("/user-data.json")
def get_user_data():
    """returns a JSON with user data, and user following data"""

    # user data
    email = session['email']
    user_json = crud.get_user_json(email)

    #follower data work on this
    user_id = crud.get_user_id(email)
    following_info_list = crud.get_user_is_following(user_id)

    userProfileJson = {'userData':user_json,'followingData':following_info_list}

    return jsonify(userProfileJson)

#create a new route for total feet climbed and loss for user-profile

@app.route("/map.json")
def get_activity_map_data():
    """endpoint with cordinates JSON for the map"""
    
    email = session['email']

    latest_activity_json_map = crud.get_latest_activity(email)

    return jsonify(latest_activity_json_map)

@app.route("/post-gpx-parser",methods = ["POST"])
def get_ride_gpx_create_activity():
    """creates an activity for a logged in user"""

    # User in session
    email = session['email']
    user = crud.get_user(email)

    # User ride caption
    ride_caption = request.form.get('ride-caption')

    # User Activity transfer
    file_transfer_object = request.files.get('file')
    encoded_json_file = file_transfer_object.stream.read()
    gpx_file = encoded_json_file.decode('utf-8')
    activity = gpxParser()
    activity.complete_gpx_parser_main(gpx_file)
    
    # Activity Details
    elevation_gain_loss_json = activity.elevation_gain_loss_json
    max_min_elevation_json = activity.elevation_stats_json
    activity_json = activity.map_json
    date = activity.ride_date
    ride_name = activity.ride_name
    activity = crud.create_activity(user,date,ride_name,
                                    ride_caption,max_min_elevation_json,
                                    elevation_gain_loss_json,activity_json)
    db.session.add(activity)
    db.session.commit()
     
    value = {'ok':200}

    return jsonify(value)

@app.route("/get-user-json")
def get_users():
    """gets users and sends to front end for searching"""

    user_json = crud.get_all_users_list()
    
    return jsonify(user_json)

@app.route('/other-user-profile')
def other_user_profile():
    """renders user profile"""
    return render_template('other-user-profile.html')

@app.route('/other-user.json',methods=["POST"])
def get_other_user_json():
    """gets personal data and latest ride data for another user"""

    #logged in user Data
    user_email = session['email']
    user_id_user = crud.get_user_id(user_email)
    #Other user Data
    other_user_id = request.json.get('userId')
    otherUserDataJson = crud.get_other_user_data_json(user_id_user,other_user_id)
    
    return jsonify(otherUserDataJson)

@app.route('/follow-user',methods=["POST"])
def follow_other_user():
    """route to follow another user"""
    #logged in user Data
    user_email = session['email']
    user_id_user = crud.get_user_id(user_email)

    #Other user Data
    user_id_to_follow = request.json.get('userId')

    follow_user = crud.follow_a_user(user_id_user,user_id_to_follow)
    db.session.add(follow_user)
    db.session.commit()

    followedStatus = 'ok'

    return jsonify({'followStatus':followedStatus})

@app.route('/unfollow-user', methods = ["POST"])
def unfollow_other_user():
    """route to unfollow a user"""

    user_email = session['email']
    user_id = crud.get_user_id(user_email)

    following_id = request.json.get('userId')

    user_unfollowed = crud.unfollow_user(user_id,following_id)
    db.session.add(user_unfollowed)
    db.session.commit()

    unfollowedStatus = 'ok'

    return jsonify({'unfollowStatus':unfollowedStatus})

if __name__ == "__main__":
    from model import connect_to_db, db

    connect_to_db(app)
    app.run(debug=True)