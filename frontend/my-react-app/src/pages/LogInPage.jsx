import Login from "../components/Login";
import Register from "../components/Register";
import { Navigate } from "react-router-dom";

export default function LogInPage({ session, setSession }) {
  return !session ? (
    <div className="App">
      <Login setSession={setSession} />
      <Register />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}
