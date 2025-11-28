import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import GalleryBlock from "./pages/Gallery";
import "./global.css";
import "./layout/respon.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryBlock />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
