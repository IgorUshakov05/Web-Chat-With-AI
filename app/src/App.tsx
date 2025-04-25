import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index";
import ChatPage from "./pages/Chat";
import DevelopersPage from "./pages/Developers";
import ProductsPage from "./pages/Products";
import Documention from "./pages/Documention";
import { GoogleOAuthProvider } from "@react-oauth/google";

import React from "react";
import RequireProtect from "./Auth/ProtectedRoute";
import ProtectNotRequire from "./Auth/NotProtectedAuth";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID || "11"}>
      <Routes>
        <Route
          path="/"
          element={<ProtectNotRequire children={<IndexPage />} />}
        />
        <Route
          path="/documentation"
          element={<ProtectNotRequire children={<Documention />} />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/developers"
          element={<ProtectNotRequire children={<DevelopersPage />} />}
        />
        <Route
          path="/chat/:id"
          element={<RequireProtect children={<ChatPage />} />}
        />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
