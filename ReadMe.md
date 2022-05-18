# Cycling Tracker 🚲

## 🚧 under construction 🚧

Cycling Tracker is a social media app for cyclists to track their cycling
activities and share with their friends.
Users can upload their rides using a .gpx file and instantly view the activity data on the home page, along with their friends' latest activities.

Users can also view their overall statistics such as total miles, total elevation gain for a single ride or their entire activity history.

Immediately after the user logs in their latest activity data and the user's friends activity feed are displayed on a map. Also displayed are an upload form to submit a new activity, and navigation capabilities to go to the user's profile
as well as to search for other users.

I'm currently building the front-end using ReactJS. Then I will add styling with CSS, and a near-real-time Friends Activity Feed component that automatically updates the feed data using WebSockets.

# Tech Stack 📚

**Client:** ReactJS, JavaScript, React Router, Chart.js, Leaflet

**Server:** Python, Flask, SQLAlchemy, PostgreSQL, Pandas, gpxpy

# The App

## App Log-In

![](/ReadME/logIn.gif)

## Uploading an activity

Upload a .gpx (GPS exchange format) from user's local drive, add an activity comment and upload the activity. File is parsed and rendered on a map displaying User's latest activity. Map component is rendered without refreshing the entire page.

![](/ReadME/uploadFile.gif)

## Searching for a user

Use search bar to look for another user in the data base and click on their name
to navigate to their profile page.

![](/ReadME/searchUser.gif)

## Follow/Unfollow a user

Follow button will be available in another user's profile if you are not following them. Otherwise an unfollow button will appear.
You can then see users you are following on your profile page.

![](/ReadME/followUser.gif)

## Check user profile and stats

![](/ReadME/userStats.gif)

## Scroll throught the latest friend's activity feed

![](/ReadME/friendsFeed.gif)
