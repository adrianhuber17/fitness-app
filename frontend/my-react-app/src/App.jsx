import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import UserProfile from "./pages/UserProfile";
import OtherUserProfile from "./pages/OtherUserProfile";
import HomePage from "./pages/HomePage";
import { StateParamWrapper } from "./helper/StateParamWrapper";
import { UseSessionInfo } from "./helper/useSessionInfo";
import NavBar from "./components/NavBar/NavBar";
import { UnitContextPorvider } from "./helper/UnitsContext";

function App() {
  const [email, session, setSession, setEmail, userData, setUserData] =
    UseSessionInfo();
  return (
    <UnitContextPorvider>
      <BrowserRouter>
        {session && <NavBar setSession={setSession} userData={userData} />}
        <Routes>
          <Route
            path="/login"
            element={
              <LogInPage
                session={session}
                setSession={setSession}
                setEmail={setEmail}
                setUserData={setUserData}
              />
            }
          />
          <Route
            path="/"
            element={<HomePage email={email} userData={userData} />}
          />
          <Route
            path="/user-profile"
            element={<UserProfile session={session} />}
          />
          <Route element={<StateParamWrapper />}>
            <Route
              path="/other-user-profile"
              element={<OtherUserProfile session={session} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UnitContextPorvider>
  );
}

export default App;
