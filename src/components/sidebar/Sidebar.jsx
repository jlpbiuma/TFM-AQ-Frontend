// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white">
      <nav className="flex flex-col p-4">
        <Link to="/" className="py-2 px-4 hover:bg-gray-700">
          Home
        </Link>
        <Link to="/dispositivos" className="py-2 px-4 hover:bg-gray-700">
          Dispositivos
        </Link>
        <Link to="/usuarios" className="py-2 px-4 hover:bg-gray-700">
          Usuarios
        </Link>
        <Link to="/sensores" className="py-2 px-4 hover:bg-gray-700">
          Sensores
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
