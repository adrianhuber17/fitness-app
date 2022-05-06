import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [apiData, setApiData] = useState("");

  useEffect(() => {
    let url = "/api-request";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data.ziggy);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>APIDATA:{apiData}</p>
      </header>
    </div>
  );
}

export default App;
