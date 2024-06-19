import React, { useState, useEffect } from "react";
import API_USUARIOS from "../../api/usuarios";
import Notifications from "../../utils/Notifications";
/* eslint-disable react/prop-types */
const CreateUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [userRol, setUserRol] = useState(localStorage.getItem("role"));

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API_USUARIOS.create_usuario({ name, email, password, rol })
      .then(() => {
        Notifications.success("Usuario creado correctamente");
      })
      .catch((error) => {
        Notifications.error(error.response.data.error);
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
        {userRol == 4 && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rol"
            >
              Rol
            </label>
            <select
              id="rol"
              type="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="1">Cliente</option>
              <option value="2">Técnico</option>
              <option value="3">Administrador</option>
              <option value="4">Super Administrador</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
