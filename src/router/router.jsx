import { createBrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import ViewUsuarios from "../pages/Usuarios.jsx";
import ViewDispositivos from "../pages/Dispositivos.jsx";
import ViewSensores from "../pages/Sensores.jsx";

const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dispositivos",
    element: <ViewDispositivos />,
  },
  {
    path: "/usuarios",
    element: <ViewUsuarios />,
  },
  {
    path: "/sensores",
    element: <ViewSensores />,
  },
];

const routerBrowser = createBrowserRouter(router);

export const Router = () => {
  return (
    <Routes>
      {router.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
