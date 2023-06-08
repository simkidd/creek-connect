import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import AppAuth from "./pages/appAuth/AppAuth";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Chat from "./pages/chat/Chat";
import ChatContainer from "./components/chatContainer/ChatContainer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AppAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
        </Route>
        <Route element={<Chat />}>
          <Route path="/chat/3" element={<ChatContainer/>}  />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
