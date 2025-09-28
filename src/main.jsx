import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App'
import "./global.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import "./layout/respon.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
     <Home />
     <Menu />
     <About />
  </React.StrictMode>
);
