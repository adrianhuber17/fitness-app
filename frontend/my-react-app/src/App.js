import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import UserProfile from "./pages/UserProfile";
import OtherUser from "./pages/OtherUserProfile";
import HomePage from "./pages/HomePage";
import { StateParamWrapper } from "./helperFunction/StateParamWrapper";

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route element={<StateParamWrapper />}>
          <Route path="/other-user-profile" element={<OtherUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
