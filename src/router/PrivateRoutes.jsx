import Home from "../pages/Home";
import ViewUsuarios from "../pages/Usuarios.jsx";
import ViewDispositivos from "../pages/Dispositivos.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import ViewMisEstaciones from "../pages/MisEstaciones.jsx";
import ViewEstaciones from "../pages/Estaciones.jsx";
import ViewDashboard from "../pages/Dashboard.jsx";
import ViewEstacionUsuarios from "../pages/EstacionUsuarios.jsx";
import ViewHistorico from "../pages/Historico.jsx";
import ViewEstacionDispositivos from "../pages/EstacionDispositivos.jsx";

export const privateRoutes = [
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} requiredRole={1} />,
    roles: 1,
    name: "Home",
    visible: true,
  },
  {
    path: "/dispositivos",
    element: <ProtectedRoute element={<ViewDispositivos />} requiredRole={2} />,
    roles: 2,
    name: "Dispositivos",
    visible: true,
  },
  {
    path: "/usuarios",
    element: <ProtectedRoute element={<ViewUsuarios />} requiredRole={2} />,
    roles: 2,
    name: "Usuarios",
    visible: true,
  },
  {
    path: "/mis-estaciones",
    element: (
      <ProtectedRoute element={<ViewMisEstaciones />} requiredRole={1} />
    ),
    roles: 1,
    name: "Mis Estaciones",
    visible: true,
  },
  {
    path: "/mis-estaciones/:id_estacion/dashboard",
    element: <ProtectedRoute element={<ViewDashboard />} requiredRole={2} />,
    roles: 2,
    name: "Mis estaciones",
    visible: false,
  },
  {
    path: "/estaciones",
    element: <ProtectedRoute element={<ViewEstaciones />} requiredRole={2} />,
    roles: 0,
    name: "Estaciones",
    visible: true,
  },
  {
    path: "/estaciones/:id_estacion/usuarios",
    element: (
      <ProtectedRoute element={<ViewEstacionUsuarios />} requiredRole={2} />
    ),
    roles: 2,
    name: "Estaciones",
    visible: false,
  },
  {
    path: "/estaciones/:id_estacion/dispositivos",
    element: (
      <ProtectedRoute element={<ViewEstacionDispositivos />} requiredRole={2} />
    ),
    roles: 2,
    name: "Estaciones",
    visible: false,
  },
  {
    path: "/mis-estaciones/:id_estacion/dashboard/:id_magnitud/historico",
    element: <ProtectedRoute element={<ViewHistorico />} requiredRole={1} />,
    roles: 1,
    name: "Historico",
    visible: false,
  },
  {
    path: "*",
    element: <ProtectedRoute element={<Home />} requiredRole={1} />,
    name: "Home",
    visible: false,
  },
];
