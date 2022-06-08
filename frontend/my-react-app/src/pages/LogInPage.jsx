import Login from "../components/Login";
import Register from "../components/Register";
import { Navigate } from "react-router-dom";
import logo from "../components/svg/logo4.svg";

export default function LogInPage({
  session,
  setSession,
  setEmail,
  setUserData,
}) {
  console.log("loginPageSession", session);
  return !session ? (
    <div className="login-page-wrapper">
      <div className="login-logo">
        <img src={logo} alt="logo" className="logo" />
        <h1>Stravers</h1>
      </div>
      <div className="login-page">
        <Login
          setUserData={setUserData}
          setSession={setSession}
          setEmail={setEmail}
        />
        <Register />
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}
