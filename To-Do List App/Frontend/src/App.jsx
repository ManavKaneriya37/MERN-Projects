import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home";
import UserProtectedWrapper from "./components/UserProtectedWrapper";
import Welcome from "./pages/Welcome";
import CreateTask from "./pages/CreateTask";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
