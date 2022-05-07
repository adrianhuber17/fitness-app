import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let url = "/session.json";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.email === null) {
          navigate("/login");
        }
        setEmail(data.email);
        setLoading(false);
      });
  });
  //useState update with fetcehed user data
  // useEffect to fetch homepage data for that user

  return loading === false && <h1>Home: {email}</h1>;
}
