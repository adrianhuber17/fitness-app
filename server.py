from datetime import datetime
from flask import Flask, redirect, render_template,jsonify, request, session, flash
import os
from gpx_parser import gpxParser
import crud

app = Flask(__name__)
SECRET_KEY = os.environ['APP_KEY']
app.secret_key = SECRET_KEY


@app.route('/session.json', methods=["GET"])
def index():
    if 'email' in session.keys():
        email = session['email']
        return jsonify({'email':email})
    else:
        return jsonify({'email':None})

@app.route('/login-user.json',methods=["POST"])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    if crud.is_user_correct(email) == True and crud.is_password_correct(password) == True:
        session['email'] = session.get('email',email)
        print(session)
        return jsonify({'status':'sign in ok'})
    elif crud.is_user_correct(email) == False:
        print('wrong email')
        return jsonify({'status':'wrong email'})
    elif crud.is_password_correct(password) == False:
        print('wrong password')
        return jsonify({'status':'wrong password'})

@app.route("/logout.json")
def logout():
    """logs user out and clears the session"""
    session.clear()

    return jsonify({'status':'ok'})

@app.route("/register-user.json",methods=["POST"])
def create_user():
    email = request.json.get('email')
    password = request.json.get('password')
    first_name = request.json.get('firstName')
    last_name = request.json.get('lastName')

    if crud.is_user_correct(email) == False:
        new_user = crud.create_user(email,first_name,last_name,password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"status":"Success"})
    else:
        return jsonify({"status":"Fail"})

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
    """returns a JSON with latest activity json (lat,long)
    for mapping"""
    
    email = session['email']

    latest_activity_json_map = crud.get_latest_activity(email)

    return jsonify(latest_activity_json_map)

@app.route("/post-gpx-parser",methods = ["POST"])
def get_ride_gpx_create_activity():
    """Post request from the front end to store activity data in database,
    eturns a JSON with latest activity json (lat,long)
    for mapping"""

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
    # date = activity.ride_date
    date = datetime.now()
    ride_name = activity.ride_name
    activity = crud.create_activity(user,date,ride_name,
                                    ride_caption,max_min_elevation_json,
                                    elevation_gain_loss_json,activity_json)
    db.session.add(activity)
    db.session.commit()
     
    latest_activity_json_map = crud.get_latest_activity(email)

    value = {'latestActivity':latest_activity_json_map}

    return jsonify(value)

@app.route("/get-user-json")
def get_users():
    """Returns a json with all users list"""

    user_json = crud.get_all_users_list()
    
    return jsonify(user_json)


@app.route('/other-user.json',methods=["POST"])
def get_other_user_json():
    """returns JSON with personal data and latest ride data for another user"""

    #logged in user Data
    user_email = session['email']
    user_id_user = crud.get_user_id(user_email)
    #Other user Data
    other_user_id = request.json.get('userId')
    otherUserDataJson = crud.get_other_user_data_json(user_id_user,other_user_id)
    
    return jsonify(otherUserDataJson)

@app.route('/follow-user.json',methods=["POST"])
def follow_other_user():
    """Post request to follow another user"""

    #logged in user Data
    user_email = session['email']
    user_id_user = crud.get_user_id(user_email)

    #Other user Data
    user_id_to_follow = request.json.get('userId')

    follow_user = crud.follow_a_user(user_id_user,user_id_to_follow)
    db.session.add(follow_user)
    db.session.commit()

    followedStatus = 'ok'
    print(f"current user -------------- {user_id_user}")
    print(f"other user -------------- {user_id_to_follow}")
    print(f"followedStatus -------------- {followedStatus}")

    return jsonify({'followStatus':followedStatus})

@app.route('/unfollow-user.json', methods = ["POST"])
def unfollow_other_user():
    """Post request to unfollow a user"""

    user_email = session['email']
    user_id = crud.get_user_id(user_email)

    following_id = request.json.get('userId')

    user_unfollowed = crud.unfollow_user(user_id,following_id)
    db.session.add(user_unfollowed)
    db.session.commit()

    unfollowedStatus = 'ok'
    print(f"current user -------------- {user_id}")
    print(f"other user -------------- {following_id}")
    print(f"unfollowedStatus -------------- {unfollowedStatus}")

    return jsonify({'unfollowStatus':unfollowedStatus})


if __name__ == "__main__":
    from model import connect_to_db, db

    connect_to_db(app)
    app.run(debug=True)