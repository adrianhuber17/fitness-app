import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setSession, setEmail }) {
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
          setSession(true);
          setEmail(responseData.email);
          navigate("/");
        }
      });
  };

  return (
    <div className="login">
      <h1>Log-in</h1>
      <form>
        <label htmlFor="email">Email: </label>
        <input
          onChange={handleEmail}
          type="text"
          name="email"
          id="email"
          value={formEmail}
          required
        />
        <br></br>
        <label htmlFor="password">Password: </label>
        <input
          onChange={handlePassword}
          type="password"
          name="password"
          id="password"
          value={password}
          required
        />
        <br></br>
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
