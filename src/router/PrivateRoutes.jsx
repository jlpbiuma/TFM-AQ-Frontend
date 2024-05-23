import Home from "../pages/Home";
import ViewUsuarios from "../pages/Usuarios.jsx";
import ViewDispositivos from "../pages/Dispositivos.jsx";
import ViewSensores from "../pages/Sensores.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import ViewMisEstaciones from "../pages/MisEstaciones.jsx";
import ViewEstaciones from "../pages/Estaciones.jsx";
import ViewDashboard from "../pages/Dashboard.jsx";

export const privateRoutes = [
  {
    path: "/",
    element: <ProtectedRoute element={<Home />} />,
    roles: 1,
    name: "Home",
    visible: true,
  },
  {
    path: "/dispositivos",
    element: <ProtectedRoute element={<ViewDispositivos />} />,
    roles: 2,
    name: "Dispositivos",
    visible: true,
  },
  {
    path: "/usuarios",
    element: <ProtectedRoute element={<ViewUsuarios />} />,
    roles: 2,
    name: "Usuarios",
    visible: true,
  },
  {
    path: "/sensores",
    element: <ProtectedRoute element={<ViewSensores />} />,
    roles: 2,
    name: "Sensores",
    visible: true,
  },
  {
    path: "/mis-estaciones",
    element: <ProtectedRoute element={<ViewMisEstaciones />} />,
    roles: 2,
    name: "Mis Estaciones",
    visible: true,
  },
  {
    path: "/estaciones",
    element: <ProtectedRoute element={<ViewEstaciones />} />,
    roles: 2,
    name: "Estaciones",
    visible: true,
  },
  {
    path: "/mis-estaciones/:id_estacion/dashboard",
    element: <ProtectedRoute element={<ViewDashboard />} />,
    roles: 2,
    name: "Mis estaciones",
    visible: false,
  },
];
