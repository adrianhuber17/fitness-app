import { useNavigate } from "react-router-dom";

export default function UserProfileBtn() {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate("/user-profile");
  };

  return (
    <div>
      <button onClick={handleClick}>User Profile</button>
    </div>
  );
}
