// src/router/router.jsx
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./PublicRoutes";
import { privateRoutes } from "./PrivateRoutes";

const router = [...publicRoutes, ...privateRoutes];

export const Router = () => {
  return (
    <Routes>
      {router.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
