import { useNavigate } from "react-router-dom";
export default function LogOut() {
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    const url = "/logout.json";
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === "ok") {
          navigate("/login");
          console.log(responseData.status);
        } else {
          alert("Something went wrong, please try again");
        }
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
}
