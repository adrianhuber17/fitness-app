import { useEffect, useState } from "react";

export const UseSessionInfo = () => {
  const [session, setSession] = useState(() => {
    return JSON.parse(sessionStorage.getItem("session")) ?? false;
  });
  const [email, setEmail] = useState(() => {
    return JSON.parse(sessionStorage.getItem("email")) ?? "";
  });
  const [userData, setUserData] = useState(() => {
    return JSON.parse(sessionStorage.getItem("userData")) ?? "";
  });

  useEffect(() => {
    let url = "/session.json";
    if (!session) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.email === null) {
            setSession(false);
          } else {
            sessionStorage.setItem("session", JSON.stringify(true));
            sessionStorage.setItem("email", JSON.stringify(data.email));
            sessionStorage.setItem("userData", JSON.stringify(data.userData));
            setUserData(data.userData);
            setSession(true);
            setEmail(data.email);
          }
        });
    }
  }, [email, session, userData]);

  return [email, session, setSession, setEmail, userData, setUserData];
};
