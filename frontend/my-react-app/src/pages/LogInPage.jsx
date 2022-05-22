import Login from "../components/Login";
import Register from "../components/Register";

export default function LogInPage({ setSession }) {
  return (
    <div className="App">
      <Login setSession={setSession} />
      <Register />
    </div>
  );
}
