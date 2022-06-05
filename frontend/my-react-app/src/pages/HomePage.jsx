import { useEffect, useState } from "react";
import GpxUploader from "../components/GpxUploader";
import FriendFeed from "../components/FriendFeed";
// import { SocketProvider } from "../helper/socketProvider";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function HomePage({ email }) {
  const [loading, setLoading] = useState(true);
  const [friendsData, setFriendsData] = useState([]);
  const [socketInstance, setSocketInstance] = useState("");

  useEffect(() => {
    let url = "/friend-feed.json";
    if (email) {
      fetch(url)
        .then((response) => response.json())
        .then((respData) => {
          setFriendsData(respData);
          setLoading(false);
        });
    }
  }, [email]);

  useEffect(() => {
    if (loading === true || friendsData.length === 0) {
      return;
    }
    const socket = io("localhost:5001/", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
      },
    });
    setSocketInstance(socket);

    socket.on("connect", (data) => {
      console.log(data);
    });
    socket.on("disconnect", (data) => {
      console.log(data);
    });
    return function cleanup() {
      console.log("clean up");
      socket.disconnect();
    };
  }, [friendsData.length, loading]);

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  return (
    !loading && (
      <div className="App">
        <div className="feedBody">
          <GpxUploader socket={socketInstance} />
          {friendsData.length > 0 && (
            <div className="friendsFeed">
              <FriendFeed friendsData={friendsData} socket={socketInstance} />
            </div>
          )}
        </div>
      </div>
    )
  );
}
