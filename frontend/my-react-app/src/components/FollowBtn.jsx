import { useState } from "react";

export default function FollowBtn(props) {
  const [isFollowing, setIsFollowing] = useState(props.isFollowing);
  const [userId, setUserId] = useState(props.userId);

  console.log("children page ", isFollowing);
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
        console.log(response);
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
        console.log(response);
        setIsFollowing(false);
      });
  };

  return (
    <div>
      {isFollowing ? (
        <button value={"unfollow"} onClick={handleUnfollowClick}>
          unfollow
        </button>
      ) : (
        <button value={"follow"} onClick={handleFollowClick}>
          follow
        </button>
      )}
    </div>
  );
}
