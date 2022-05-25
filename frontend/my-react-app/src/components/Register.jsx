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
      <h1>Register</h1>
      <form className="register-form">
        <input
          onChange={handleEmail}
          placeholder="email"
          type="text"
          name="reg_email"
          id="reg_email"
          value={regEmail}
          required
        />
        <br></br>
        <input
          onChange={handlePassword}
          placeholder="password"
          type="password"
          name="reg_password"
          id="reg_password"
          value={regPassword}
          required
        />
        <br></br>
        <input
          onChange={handleFirstName}
          placeholder="first name"
          type="text"
          name="first_name"
          id="first_name"
          value={firstName}
          required
        />
        <br></br>
        <input
          onChange={handleLastName}
          type="text"
          placeholder="last name"
          name="last_name"
          id="last_name"
          value={lastName}
          required
        />
        <br></br>
        <button
          disabled={
            regEmail === "" ||
            regPassword === "" ||
            firstName === "" ||
            lastName === ""
          }
          onClick={handleClick}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
