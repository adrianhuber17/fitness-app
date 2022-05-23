import { useEffect, useState } from "react";

export const UseSessionInfo = () => {
  const [session, setSession] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    let url = "/session.json";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.email === null) {
          setSession(false);
        } else {
          setSession(true);
          setEmail(data.email);
        }
      });
  }, [session, email]);

  return [email, session, setSession];
};
