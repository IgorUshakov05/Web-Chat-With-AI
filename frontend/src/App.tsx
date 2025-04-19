import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import Chat from "./pages/Chat";
import IndexPage from "./pages/WelcomePage";
import AuthGuard from "./hook/GuardRote";
import Contact from "./pages/Contact";
import AboutMePage from "./pages/AboutDeveloper";
import Poprikolu from "./pages/Whats";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:id" element={<AuthGuard children={<Chat />} />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/developer" element={<AboutMePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<Poprikolu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
