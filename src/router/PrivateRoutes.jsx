import Home from "../pages/Home";
import ViewUsuarios from "../pages/Usuarios.jsx";
import ViewDispositivos from "../pages/Dispositivos.jsx";
import ViewSensores from "../pages/Sensores.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import ViewMisEstaciones from "../pages/MisEstaciones.jsx";
import ViewEstaciones from "../pages/Estaciones.jsx";
import ViewDashboard from "../pages/Dashboard.jsx";
import ViewEstacionUsuarios from "../pages/EstacionUsuarios.jsx";
import ViewHistorico from "../pages/Historico.jsx";


export const privateRoutes = [
  {
    path: "/home",
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
    roles: 1,
    name: "Mis Estaciones",
    visible: true,
  },
  {
    path: "/mis-estaciones/:id_estacion/dashboard",
    element: <ProtectedRoute element={<ViewDashboard />} />,
    roles: 1,
    name: "Mis estaciones",
    visible: false,
  },
  {
    path: "/estaciones",
    element: <ProtectedRoute element={<ViewEstaciones />} />,
    roles: 1,
    name: "Estaciones",
    visible: true,
  },
  {
    path: "/estaciones/:id_estacion/usuarios",
    element: <ProtectedRoute element={<ViewEstacionUsuarios />} />,
    roles: 2,
    name: "Estaciones",
    visible: false,
  },
  {
    path: "/mis-estaciones/:id_estacion/historico/:id_unidad",
    element: <ProtectedRoute element={<ViewHistorico />} />,
    roles: 1,
    name: "Historico",
    visible: false,
  },
];
