import { useEffect, useState } from "react";
import GpxUploader from "../components/GpxUploader";
import FriendFeed from "../components/FriendFeed";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import logo from "../components/svg/logo4.svg";

export default function HomePage({ email, userData }) {
  const [loading, setLoading] = useState(true);
  const [friendsData, setFriendsData] = useState([]);
  const [socketInstance, setSocketInstance] = useState("");
  const [newFeed, setNewFeed] = useState(0);

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

  if (socketInstance) {
    socketInstance.on("new_data", (data) => {
      setNewFeed(newFeed + 1);
    });
  }
  const updateFeed = (e) => {
    e.preventDefault();

    let url = "/friend-feed.json";
    fetch(url)
      .then((response) => response.json())
      .then((respData) => {
        setFriendsData(respData);
      });
    setNewFeed(0);
  };

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  return (
    !loading && (
      <div className="App">
        <img src={logo} alt="logo" className="logo" />
        {newFeed > 0 && (
          <div className="updateButtonDiv">
            <button className="updateButton" onClick={updateFeed}>
              new activity + {newFeed}
            </button>
          </div>
        )}
        <div className="feedBody">
          <GpxUploader socket={socketInstance} userData={userData} />
          {friendsData.length > 0 && (
            <FriendFeed friendsData={friendsData} socket={socketInstance} />
          )}
        </div>
      </div>
    )
  );
}
