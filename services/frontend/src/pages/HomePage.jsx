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
    let url = `${process.env.REACT_APP_BACKEND_SERVICE_URL}/friend-feed.json`;
    if (email) {
      fetch(url, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((respData) => {
          setFriendsData(respData);
          setLoading(false);
        });
    }
  }, [email]);

  useEffect(() => {
    if (loading === true || friendsData.length === 0) {
      console.log("HomePage, friendsData:", friendsData);
      console.log("HomePage, no friendsData");
      return;
    }
    const socket = io(`${process.env.REACT_APP_WEBSOCKET_SERVICE_URL}`, {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000/",
        withCredentials: true,
      },
    });
    setSocketInstance(socket);
    console.log("socket", socket);
    socket.on("connect", (data) => {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData.user_id;
      socket.emit("user_online", { data: userId });
      console.log("socket - connected users:", data);
    });
    socket.on("disconnect", (data) => {
      console.log(data);
      console.log("socket - disconnected users:", data);
    });

    socket.on("user_online", (data) => {
      console.log("socket - users_online:", data);
    });

    return function cleanup() {
      console.log("clean up");
      socket.disconnect();
    };
  }, [friendsData, loading]);

  if (socketInstance) {
    socketInstance.on("new_data", (data) => {
      setNewFeed(newFeed + 1);
    });
  }

  const updateFeed = (e) => {
    e.preventDefault();

    let url = `${process.env.REACT_APP_BACKEND_SERVICE_URL}/friend-feed.json`;
    fetch(url, { credentials: "include" })
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
        <div className="feedBody">
          <GpxUploader socket={socketInstance} userData={userData} />
          {friendsData.length > 0 && (
            <FriendFeed
              friendsData={friendsData}
              socket={socketInstance}
              newFeed={newFeed}
              updateFeed={updateFeed}
            />
          )}
        </div>
      </div>
    )
  );
}
