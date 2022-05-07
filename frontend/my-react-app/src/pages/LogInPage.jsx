import Login from "../components/Login";
import Register from "../components/Register";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const navigate = useNavigate();
  useEffect(() => {
    let url = "/session.json";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.email !== null) {
          navigate("/");
        }
      });
  });

  return (
    <div className="App">
      <Login />
      <Register />
    </div>
  );
}
