export default function FollowBtn(props) {
  return (
    <div className="follow-unfollow">
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
