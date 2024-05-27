import { useState } from "react";
import Notifications from "../../utils/Notifications.js";
import API from "../../api/estaciones";

const DeleteEstacionUserForm = ({
  usuario,
  id_estacion,
  usuarios,
  setUsuarios,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Enable the delete button only if the typed value matches the estacion name
    setIsButtonDisabled(value !== usuario.name);
  };

  const handleSubmit = () => {
    if (inputValue === usuario.name) {
      API.delete_link_usuario_from_estacion_by_id_usuario_id_estacion(
        usuario.id_usuario,
        id_estacion
      ).then((usuario) => {
        console.log(usuario);
        // Verify if usuario is in the usuarios array
        const index = usuarios.findIndex(
          (u) => u.id_usuario === usuario.id_usuario
        );
        if (index !== -1) {
          // Remove usuario from usuarios array
          const newUsuarios = [...usuarios];
          console.log("newUsuarios", newUsuarios);
          newUsuarios.splice(index, 1);
          setUsuarios(newUsuarios);
          // Close the modal
          onClose();
          Notifications.success(
            `${usuario.name} ha sido desvinculado de la estación ${id_estacion} correctamente`,
            "#fff",
            "#00f"
          );
        }
      });
    } else {
      Notifications.error("Estacion name does not match. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        Eliminando usuario de estación
      </h2>
      <p>
        Está seguro de que quiere eliminar al usuario "{usuario.name}" de la
        estación nº{id_estacion}?
      </p>
      <p>Por favor, escriba su nombre para eliminarlo:</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-2 py-1 mt-2 mb-4"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className={`${
            isButtonDisabled ? "bg-red-200 cursor-not-allowed" : "bg-red-500"
          } text-white px-4 py-2 rounded`}
          disabled={isButtonDisabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteEstacionUserForm;
