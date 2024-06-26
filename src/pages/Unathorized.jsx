// src/pages/Unauthorized.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewUnauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-red-500 mb-4">No autorizado</h1>
        <p className="text-gray-700">
          No tienes permiso para ver este recurso.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Regresar al inicio
        </button>
      </div>
    </div>
  );
};

export default ViewUnauthorized;
