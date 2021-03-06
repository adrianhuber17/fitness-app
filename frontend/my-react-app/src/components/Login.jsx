import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setSession, setEmail, setUserData }) {
  const navigate = useNavigate();
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    const inputEmail = event.target.value;
    setFormEmail(inputEmail);
  };
  const handlePassword = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    const loginData = { email: formEmail, password: password };
    setFormEmail("");
    setPassword("");
    const url = "/login-user.json";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === "wrong email") {
          alert("Email enetered is incorrect, please try again");
        } else if (responseData.status === "wrong password") {
          alert("Password enetered is incorrect, please try again");
        }
        if (responseData.email) {
          sessionStorage.setItem("session", JSON.stringify(true));
          sessionStorage.setItem("email", JSON.stringify(responseData.email));
          sessionStorage.setItem(
            "userData",
            JSON.stringify(responseData.userData)
          );
          setSession(true);
          setEmail(responseData.email);
          setUserData(responseData.userData);
          navigate("/");
        }
      });
  };

  return (
    <div className="login component-shadow">
      <h1>Log-in</h1>
      <form className="login-form">
        <input
          onChange={handleEmail}
          placeholder="email"
          type="text"
          name="email"
          id="email"
          value={formEmail}
          required
        />
        <input
          onChange={handlePassword}
          placeholder="password"
          type="password"
          name="password"
          id="password"
          autoComplete="on"
          value={password}
          required
        />
        <button
          disabled={formEmail === "" || password === ""}
          onClick={handleLogIn}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
