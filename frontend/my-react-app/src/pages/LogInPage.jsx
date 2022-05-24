import Login from "../components/Login";
import Register from "../components/Register";
import { Navigate } from "react-router-dom";

export default function LogInPage({
  session,
  setSession,
  setEmail,
  setUserData,
}) {
  console.log("loginPageSession", session);
  return !session ? (
    <div className="App">
      <Login
        setUserData={setUserData}
        setSession={setSession}
        setEmail={setEmail}
      />
      <Register />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}
