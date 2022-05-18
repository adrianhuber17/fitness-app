import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogOut from "../components/LogOutBtn";
import UserProfileBtn from "../components/UserProfileBtn";
import GpxUploader from "../components/GpxUploader";
import UserSearchBar from "../components/UserSearchBar";
import FriendFeed from "../components/FriendFeed";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let url = "/session.json";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.email === null) {
          navigate("/login");
        }
        setEmail(data.email);
      });
  });

  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    let url = "/friend-feed.json";
    fetch(url)
      .then((response) => response.json())
      .then((respData) => {
        console.log(respData);
        setFriendsData(respData);
        setLoading(false);
      });
  }, []);

  return (
    loading === false && (
      <div className="App">
        <h1>Hello {email}</h1>
        <LogOut />
        <UserProfileBtn />
        <UserSearchBar />
        <div className="feedBody">
          <GpxUploader />
          {friendsData.length > 0 && (
            <div className="friendsFeed">
              <FriendFeed friendsData={friendsData} />
            </div>
          )}
        </div>
      </div>
    )
  );
}
