import ViewLanding from "../pages/prelogin/Landing.jsx"; // Public page
import ViewContact from "../pages/prelogin/Contact.jsx"; // Public page
import ViewLogin from "../pages/prelogin/Login.jsx";
import ViewEstacionesPublic from "../pages/prelogin/EstacionesPublic.jsx";
import ViewRegister from "../pages/prelogin/Register.jsx";

export const publicRoutes = [
  {
    path: "/",
    element: <ViewLanding />,
  },
  {
    path: "/contact",
    element: <ViewContact />,
  },
  {
    path: "/login",
    element: <ViewLogin />,
  },
  {
    path: "/estaciones-public",
    element: <ViewEstacionesPublic />,
  },
  {
    path: "/register",
    element: <ViewRegister />,
  },
];
