import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
  };
  const handlePassword = (event) => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const loginData = { email: email, password: password };
    const url = "/login-user.json";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((responseData) => console.log(responseData));
  };

  return (
    <div className="login">
      <h1>Log-in</h1>
      <form>
        <label htmlFor="ex_email">Email: </label>
        <input
          onChange={handleEmail}
          type="text"
          name="email"
          id="email"
          required
        />
        <br></br>
        <label htmlFor="ex_password">Password: </label>
        <input
          onChange={handlePassword}
          type="password"
          name="password"
          id="password"
          required
        />
        <br></br>
        <button onClick={handleClick}>Log in</button>
      </form>
    </div>
  );
}
