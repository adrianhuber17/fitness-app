import os
import json
from datetime import datetime

from backend.helper_files import crud
from backend.database_model import model
from backend.server import server
from backend.helper_files import gpx_parser

# Deletes and creates a brand new fitness_app database
os.system("dropdb fitness_app")
os.system("createdb fitness_app")

# Connects to the database and creates tables
model.connect_to_db(server.app)
model.db.create_all()

#creates a mew user
user = crud.create_user('adrianhuber17@gmail.com', 'Adrian', 'Huber', 'a230591h')
user_2 = crud.create_user('est0691@gmail.com', 'Ernesto', 'Torres', 'est111')

#create a new activity
curr_activity = gpx_parser.gpxParser()
curr_activity.complete_gpx_parser_main('/Users/adrianhuber/fitness-web-app/gpx_files/Adrian_Ride.gpx')
date = curr_activity.ride_date
ride_name = curr_activity.ride_name
ride_caption = "hey this is my latest ride"
max_min_elevation_json = curr_activity.elevation_stats_json
elevation_gain_loss_json = curr_activity.elevation_gain_loss_json
activity_json = curr_activity.map_json
activity = crud.create_activity(user,date,ride_name,ride_caption,max_min_elevation_json,elevation_gain_loss_json,activity_json)

curr_activity_2 = gpx_parser.gpxParser()
curr_activity_2.complete_gpx_parser_main('/Users/adrianhuber/fitness-web-app/gpx_files/Ernesto_Ride.gpx')
date_2 = curr_activity_2.ride_date
ride_name_2 = curr_activity_2.ride_name
ride_caption_2 = "hey this is my latest ride"
max_min_elevation_json_2 = curr_activity_2.elevation_stats_json
elevation_gain_loss_json_2 = curr_activity_2.elevation_gain_loss_json
activity_json_2 = curr_activity_2.map_json
activity_2 = crud.create_activity(user_2,date_2,
                                ride_name_2,ride_caption_2,
                                max_min_elevation_json_2,
                                elevation_gain_loss_json_2,
                                activity_json_2)

model.db.session.add(user)
model.db.session.add(activity)
model.db.session.add(user_2)
model.db.session.add(activity_2)

model.db.session.commit()
