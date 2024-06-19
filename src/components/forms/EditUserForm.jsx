import React, { useState, useEffect } from "react";
import API_USERS from "../../api/usuarios";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const EditUserForm = ({ id_usuario, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the token from the local storage
    const token = localStorage.getItem("token");
    console.log("token", token);
    console.log("id_usuario", id_usuario);
    if (!token) {
      // Redirect to login if there is no token
      navigate("/login");
    }
    API_USERS.update_usuario(id_usuario, { name, email, password, rol }, token)
      .then(() => {
        onSave();
      })
      .catch(() => {
        console.error("Error updating user");
      });
  };

  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rol"
          >
            Rol
          </label>
          <input
            id="rol"
            type="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
