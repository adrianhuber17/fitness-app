import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import UserProfile from "./pages/UserProfile";
import OtherUser from "./pages/OtherUserProfile";
import HomePage from "./pages/HomePage";
import { StateParamWrapper } from "./helper/StateParamWrapper";
import { UseSessionInfo } from "./helper/useSessionInfo";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [email, session, setSession] = UseSessionInfo();
  return (
    <BrowserRouter>
      <div className="App"></div>
      {session && <NavBar setSession={setSession} />}
      <Routes>
        <Route path="/login" element={<LogInPage setSession={setSession} />} />
        <Route path="/" element={<HomePage email={email} />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route element={<StateParamWrapper />}>
          <Route path="/other-user-profile" element={<OtherUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
