from flask_restx import Api
from app.api.ping import ping_namespace
from app.api.session import session_nampespace
from app.api.login import login_namespace
from app.api.get_user import get_user_nampespace
from app.api.friend_feed import friend_feed_nampespace
from app.api.map import map_nampespace
from app.api.logout import logout_namespace
from app.api.register import register_namespace
from app.api.user_data import user_data_nampespace
from app.api.post_gpx import post_gpx_namespace
from app.api.other_user import other_user_namespace
from app.api.follow_user import follow_user_namespace
from app.api.unfollow import unfollow_user_namespace


api = Api(version="1.0", title="APIs", doc="/docs/")

api.add_namespace(ping_namespace,path="/ping")
api.add_namespace(session_nampespace,path="/session.json")
api.add_namespace(login_namespace,path="/login-user.json")
api.add_namespace(get_user_nampespace,path="/get-user-json")
api.add_namespace(friend_feed_nampespace,path="/friend-feed.json")
api.add_namespace(map_nampespace,path="/map.json")
api.add_namespace(logout_namespace,"/logout.json")
api.add_namespace(register_namespace,"/register-user.json")
api.add_namespace(user_data_nampespace,"/user-data.json")
api.add_namespace(post_gpx_namespace,"/post-gpx-parser")
api.add_namespace(other_user_namespace,"/other-user.json")
api.add_namespace(follow_user_namespace,"/follow-user.json")
api.add_namespace(unfollow_user_namespace,"/unfollow-user.json")
