// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import GalleryBlock from "./pages/Gallery";

// import AdminLogin from "./components/AdminLogin";
// import AdminPanel from "./pages/AdminPage";

// import Footer from "./components/Footer";

// import "./global.css";
// import "./layout/respon.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/gallery" element={<GalleryBlock />} />

//         {/* Login do Admin */}
//         <Route path="/admin" element={<AdminLogin />} />

//         <Route path="/admin/panel" element={<AdminPanel />} />
//       </Routes>

//       <Footer />
//     </Router>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import GalleryBlock from "./pages/Gallery";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./pages/AdminPage";
import Footer from "./components/Footer";

import "./global.css";
import "./layout/respon.css";

function AppWrapper() {
  const location = useLocation();

  // Lista de rotas onde NÃO quer mostrar o footer
  const noFooterRoutes = ["/gallery", "/admin", "/admin/panel"];

  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryBlock />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
