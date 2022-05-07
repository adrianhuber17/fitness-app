import { useState } from "react";

export default function Register() {
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEmail = (event) => {
    const inputEmail = event.target.value;
    setRegEmail(inputEmail);
  };
  const handlePassword = (event) => {
    const inputPassword = event.target.value;
    setRegPassword(inputPassword);
  };
  const handleFirstName = (event) => {
    const inputFirstName = event.target.value;
    setFirstName(inputFirstName);
  };
  const handleLastName = (event) => {
    const inputLastName = event.target.value;
    setLastName(inputLastName);
  };
  const handleClick = (event) => {
    event.preventDefault();
    const regData = {
      email: regEmail,
      password: regPassword,
      firstName: firstName,
      lastName: lastName,
    };
    setRegEmail("");
    setRegPassword("");
    setFirstName("");
    setLastName("");
    const url = "/register-user.json";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === "Success") {
          alert("Account created successfully");
        } else {
          alert("No account created, email already exists");
        }
      });
  };
  return (
    <div className="register">
      <h1>Register Account</h1>
      <form>
        <label htmlFor="reg_email">Email: </label>
        <input
          onChange={handleEmail}
          type="text"
          name="reg_email"
          id="reg_email"
          value={regEmail}
          required
        />
        <br></br>
        <label htmlFor="reg_password">Password: </label>
        <input
          onChange={handlePassword}
          type="password"
          name="reg_password"
          id="reg_password"
          value={regPassword}
          required
        />
        <br></br>
        <label htmlFor="first_name">First Name: </label>
        <input
          onChange={handleFirstName}
          type="text"
          name="first_name"
          id="first_name"
          value={firstName}
          required
        />
        <br></br>
        <label htmlFor="last_name">Last Name: </label>
        <input
          onChange={handleLastName}
          type="text"
          name="last_name"
          id="last_name"
          value={lastName}
          required
        />
        <br></br>
        <button onClick={handleClick}>Create Account</button>
      </form>
    </div>
  );
}
