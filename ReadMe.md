# Stravers -> a cycling tracker app 🚲

STRAVERS is a social media app for cyclists to track their cycling
activities and share with their friends.
Users can upload their rides using a .gpx file and instantly view the activity data on the home page, along with their friends' latest activities.

Users can also view their overall statistics such as total miles, total elevation gain for a single ride or their entire activity history.

Immediately after the user logs in their latest activity data and the user's friends activity feed are displayed on a map. Also displayed are an upload form to submit a new activity, and navigation capabilities to go to the user's profile
as well as to search for other users.

The app updates the friends activity feed in real-time using WebSocket communication protocols. If a friend uploads an activity, the user will immediately see a button pop up alerting them of the update. The button will display the count of new activities available to display.

# Tech Stack 📚

**Client:** ReactJS, JavaScript, React Router, socket.io, Chart.js, Leaflet

**Server:** Python, Flask, SQLAlchemy, PostgreSQL, flask-socketio, Pandas, gpxpy

# The App

## App Log-In

Log-in to the app with an exisiting user name and password. A register form is also availble for new users. After log-in, the user will be routed to the home page where they will have access to their latest activity, their friends latest activity feed, and a navigation bar to access their profile page, search for a user, or log out.

On log-in, the users information is stored in the session storage and as a global state to be used to fetch back-end data throughout the app. The session storage is delted when logging out.

![](/ReadME/log-in-home.gif)

## Uploading a new activity

The `+Upload Ride` button will open a form for a user to upload a new activity.
Upload a .gpx (GPS exchange format) file from the user's local drive, add an activity caption and upload the activity. The file is sent to the back-end for parsing and storing in the database. After the file is parsed and stored, it is returned to the front-end to be rendered on a map displaying the latest activity and associated data such as total elevetaion gain, total distance, total time as well as a plot with the elevation provile throughout the activity. This user's latest ride component is rendered without refreshing the entire page.

![](/ReadME/upload-latest-ride.gif)

## Live feed using WebSocket

The app uses WebSocket communication protocols to give a real-time friends feed update, without having to refresh the page to fetch for new activities. As it can be seen in the gif below, two users that are following each other are connected to the app at the same time. User1 is on Google Chrome (browser on the left) and User2 is on Firefox (browser on the right).

Immediately after User2 uploads a new activity, User1 will get notified via the `NEW ACTIVITY +1` button that a new friends activity is available. If more activities become availble while the user is connected the new activity counter will increase. When the user clicks on the `NEW ACTIVITY` button, the feed will refresh with the new data.

![](/ReadME/WebSocketLiveFeed.gif)

## Scroll throught the latest friend's activity feed

The latest friends activity feed is displayed on the home page. A user can scroll through their friends feed which is ordered by the activity date in descending order. The friends acitivy feed has an activity card for each activity which displays the name of the user, ride caption, ride date, total elevation gain, total distance, total time, and a map of the activity,

![](/ReadME/scroll-friends-feed.gif)

## Searching and Following a user

In the navbar, a `Search user` feature is available for a user to search for other users in the database. Once a user is found, their name can be clicked to navigate to that user's profile page.

After navigating to the other user's profile page, their information is available as well as a `FOLLOW` and `UNFOLLOW` button. A map of their latest ride is also available, as well as a plot with the user's total activities for the current year.

The `FOLLOW` button will be available in another user's profile if you are not following them. Otherwise an unfollow button will appear.

Navigate to your profile page to see all the users that you are following or that are following you.

![](/ReadME/search-and-follow-user.gif)

## Check user profile and stats

In the user's profile page, you can see your Profile Information, a list of all the users you are following, a list of all the users that are following you, and a plot with the user's activity stats for the entire year.

![](/ReadME/check-profile-information.gif)

## Changing Units from imperial to metric globally

In the home page, a `UNITS` button is available to toggle between imperial and metric units for the entire app. This will toggle the distances between meters and feet for elevation gain, and miles and kilometers for total distance. A Context provider was used for this implementation in order to change the state of the units globally and apply them to different componets in the app without having to pass them down as props. The session storage was also used to store the state of the units, in order to keep the current state even when the page is refreshed or when user navigates to another route.

![](/ReadME/context-provider-units.gif)
