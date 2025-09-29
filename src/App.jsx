import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Cardapio from "./pages/Cardapio";
import Navbar from "./components/Navbar";
import "./global.css";
import "./layout/respon.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Página principal com Home + Menu + About juntos */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Menu />
              <About />
            </>
          }
        />
        {/* Página separada */}
        <Route path="/cardapio" element={<Cardapio />} />
      </Routes>
    </Router>
  );
}

export default App;
