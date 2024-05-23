// src/App.js
import "./App.css";
import { Router } from "./router/router.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Footer from "./components/footer/Footer.jsx";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { privateRoutes } from "./router/PrivateRoutes";
import Header from "./components/header/Header.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id_usuario = localStorage.getItem("id_usuario");
    const rol = localStorage.getItem("role");

    const isPrivateRoute = privateRoutes.some((route) =>
      location.pathname.startsWith(route.path)
    );

    if (token && id_usuario && rol) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (isPrivateRoute) {
        navigate("/login");
      }
    }
  }, [navigate, location]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1">
          <Router />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
