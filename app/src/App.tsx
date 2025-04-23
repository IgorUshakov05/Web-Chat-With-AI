import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/Index";
import ChatPage from "./pages/Chat";
import DevelopersPage from "./pages/Developers";
import ProductsPage from "./pages/Products";
import Documention from "./pages/Documention";

import React from "react"; 

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/documentation" element={<Documention />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/developers" element={<DevelopersPage />} />
      <Route path="/chat/:id" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
