import { useEffect, useState } from "react";
import UserProfileBtn from "../components/UserProfileBtn";
import GpxUploader from "../components/GpxUploader";
import UserSearchBar from "../components/UserSearchBar";
import FriendFeed from "../components/FriendFeed";

export default function HomePage({ email }) {
  const [loading, setLoading] = useState(true);
  const [friendsData, setFriendsData] = useState([]);

  useEffect(() => {
    let url = "/friend-feed.json";
    fetch(url)
      .then((response) => response.json())
      .then((respData) => {
        setFriendsData(respData);
        setLoading(false);
      });
  }, []);

  return (
    !loading && (
      <div className="App">
        <h1>Hello {email}</h1>
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
