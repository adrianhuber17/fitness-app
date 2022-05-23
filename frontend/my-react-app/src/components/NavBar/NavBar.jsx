import LogOut from "../LogOutBtn";
import { MenuItems } from "./MenuItems";
import { useNavigate } from "react-router-dom";

export default function NavBar({ setSession }) {
  const navigate = useNavigate();
  console.log("NavBar");

  const handleLogOut = (event) => {
    event.preventDefault();
    const url = "/logout.json";
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === "ok") {
          setSession(false);
          navigate("/login");
          console.log(responseData.status);
        } else {
          alert("Something went wrong, please try again");
        }
      });
    sessionStorage.clear();
  };

  return (
    <nav>
      <ul>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
      <LogOut handleClick={handleLogOut} />
    </nav>
  );
}
