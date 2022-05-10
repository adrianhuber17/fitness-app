# Cycling Tracker

Cycling Tracker is a social media app for cyclists to track their cycling
activities and share with their friends.
Users can upload their rides as a .gpx file and instantly view the
activity and associated activity data on the home page, along with their friends' latest activities.
Users can also view their overall statistics such as total miles, total elevation gain for a single ride
or their entire activity history.

This App is currently being built using ReactJS with a back-end stack of Python, PostgreSQL
and Flask as the web framework.

Immedediately after the user log-in the user's latest activity feed and user's followers activity
feed is displayed on a map, an upload form to submit a new activity, navigation capabilities to go to user's profile
as well as to search for other users.

# Tech Stack

**Client:** ReactJS, JavaScript

**Server:** Python, Flask, SQLAlchemy, PostgreSQL

# The App

## Log-in to the App

![](/ReadME/logIn.gif)

## Upload an activity

Upload a .gpx (GPS exchange format) from user's local drive, add an activity comment and upload the activity. File is parsed and rendered on a map displaying User's latest activity. Map component is rendered without refreshing the entire page.

![](/ReadME/uploadFile.gif)
