export default function FollowBtn(props) {
  console.log("FollowBtn, isFollowing props: ", props.isFollowing);

  return (
    <div>
      {props.isFollowing ? (
        <button value={"unfollow"} onClick={props.handleUnfollowClick}>
          unfollow
        </button>
      ) : (
        <button value={"follow"} onClick={props.handleFollowClick}>
          follow
        </button>
      )}
    </div>
  );
}
