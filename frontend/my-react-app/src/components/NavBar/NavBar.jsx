import LogOut from "../LogOutBtn";
import UserSearchBar from "../UserSearchBar";
import { MenuItems } from "./MenuItems";
import { useNavigate } from "react-router-dom";
import logo from "./logo4.svg";

export default function NavBar({ setSession, userData }) {
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
    <header className="primary-header">
      <div>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <nav>
        <ul id="primary-navigation" className="primary-navigation flex">
          {MenuItems.map((item, index) => (
            <li className="nav-list" key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
          <UserSearchBar />
          <LogOut handleClick={handleLogOut} />
          <div className="avatar">
            {userData.first_name[0]}
            {userData.last_name[0]}
          </div>
        </ul>
      </nav>
    </header>
  );
}
