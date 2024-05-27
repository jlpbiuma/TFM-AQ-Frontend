import React, { useState, useEffect } from "react";

const UpdateEstacionForm = ({ estacion, onUpdate, onClose }) => {
  const [nombre, setNombre] = useState("");
  const [localizacion, setLocalizacion] = useState("");

  // Populate the form fields when the component mounts or the estacion prop changes
  useEffect(() => {
    if (estacion) {
      setNombre(estacion.nombre);
      setLocalizacion(estacion.localizacion);
    }
  }, [estacion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onUpdate function passed from the parent, including the id for identification
    onUpdate({
      id: estacion.id,
      nombre,
      localizacion,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label htmlFor="localizacion">Localización:</label>
        <input
          id="localizacion"
          type="text"
          value={localizacion}
          onChange={(e) => setLocalizacion(e.target.value)}
          required
        />
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Update Estación
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEstacionForm;
