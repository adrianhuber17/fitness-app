import { useEffect, useState, useContext } from "react";
import { GetOtherUserId } from "../helper/StateParamWrapper";
import ActivityMap from "../components/ActivityMap";
import OtherUserTable from "../components/OtherUserTable";
import { Plot } from "../components/Plot";
import { UnitContext } from "../helper/UnitsContext";

const OtherUser = ({ session }) => {
  const [centerLatitude, setCenterLatitude] = useState("");
  const [centerLongitude, setCenterLongitude] = useState("");
  const [coordinates, setCoordinates] = useState([""]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState({});
  const [totalElevationGain, setTotalElevationGain] = useState({});
  const [totalActivites, setTotalActivities] = useState({});
  const [rideCaption, setRideCaption] = useState("");
  const [date, setDate] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [elevationGain, setElevationGain] = useState({});
  const [loading, setLoading] = useState(true);

  const unitContext = useContext(UnitContext);
  const { changeElevation } = unitContext;

  const userId = GetOtherUserId();

  useEffect(() => {
    const data = { userId: userId };
    if (session) {
      fetch("/other-user.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((respData) => {
          if (respData.userLatestRide !== null) {
            setCenterLatitude(respData.userLatestRide.latitude);
            setCenterLongitude(respData.userLatestRide.longitude);
            setCoordinates(respData.userLatestRide.coordinates);
            setTotalElevationGain(respData.totalElevationGain);
            setTotalActivities(respData.totalActivities);
            setUserData(respData.userData);
            setRideCaption(respData.rideCaption);
            setDate(respData.date);
            setElevationGain(respData.elevationGainLossJson);
            setIsFollowing(respData.isFollowing);
            setTotalDistance(respData.activityJson.totalDistance);
            setTotalTime(respData.activityJson.totalTime);
            setLoading(false);
          } else {
            setCenterLatitude("37.773972");
            setCenterLongitude("-122.431297");
            setCoordinates(["37.773972", "-122.431297"]);
            setUserData(respData.userData);
            setIsFollowing(respData.isFollowing);
            setLoading(false);
          }
        });
    }
  }, [userId, session]);

  const handleFollowClick = (event) => {
    const follow = event.target.value;
    const data = { userId: userId, follow: follow };
    fetch("/follow-user.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setIsFollowing(true);
      });
  };

  const handleUnfollowClick = (event) => {
    const unfollow = event.target.value;
    const data = { userId: userId, unfollow: unfollow };
    fetch("/unfollow-user.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("handleUnfollowClick response:", response);
        setIsFollowing(false);
      });
  };

  return (
    <>
      {!loading && (
        <div className="user-profile-page component-shadow ">
          <h1>Welcome to {userData.first_name}'s profile!</h1>
          <OtherUserTable
            userData={userData}
            isFollowing={isFollowing}
            handleFollowClick={handleFollowClick}
            handleUnfollowClick={handleUnfollowClick}
          />
          <div className="activityCard friendCard bottom-shadow">
            <h2 style={{ marginBottom: "20px" }}>
              {date ? "Latest Ride" : "User Has Not Uploaded a Ride"}
            </h2>
            {date !== "" && (
              <div className="cardHeader">
                <p className="cardCaption">{rideCaption}</p>
                <p className="cardDate">
                  Date: {`${date.slice(0, -12)} at ${date.slice(17, 30)}`}
                </p>
                <div className="cardData">
                  <div className="cardDatum">
                    <p className="cardElevation">Elev Gain</p>
                    <p className="cardElevationData">
                      {elevationGain ? (
                        changeElevation ? (
                          <>{`${elevationGain.elevation_gain_feet} ft`}</>
                        ) : (
                          <>{`${elevationGain.elevation_loss_meters} m`}</>
                        )
                      ) : (
                        <div>n/a</div>
                      )}
                    </p>
                  </div>
                  <div className="cardDatum">
                    <p className="cardElevation">Distance</p>
                    <p className="cardElevationData">
                      {totalDistance ? (
                        changeElevation ? (
                          <>{`${totalDistance.mi} mi`}</>
                        ) : (
                          <>{`${totalDistance.km} km`}</>
                        )
                      ) : (
                        "n/a"
                      )}
                    </p>
                  </div>
                  <div className="cardDatum">
                    <p className="cardElevation">Time</p>
                    <p className="cardElevationData">
                      {totalTime
                        ? `${totalTime.slice(0, 2)} h ${totalTime.slice(
                            3,
                            5
                          )} m `
                        : "n/a"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <ActivityMap
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              coordinates={coordinates}
            />
          </div>
          {Object.keys(totalElevationGain).length !== 0 &&
            Object.keys(totalActivites).length !== 0 && (
              <div className="chart-container">
                <Plot
                  totalElevationGain={totalElevationGain}
                  totalActivites={totalActivites}
                />
              </div>
            )}
        </div>
      )}
    </>
  );
};
export default OtherUser;
