import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleClick}>Home</button>
    </div>
  );
}
