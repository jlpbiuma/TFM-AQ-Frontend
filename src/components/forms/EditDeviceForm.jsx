import React, { useState, useEffect } from "react";
import API_MAGNITUDES from "../../api/magnitudes";
import API_DISPOSITIVOS from "../../api/dispositivos";
import API_ESTACIONES from "../../api/estaciones";
import Notifications from "../../utils/Notifications";

const EditDeviceForm = ({ id_dispositivo }) => {
  console.log("id_dispositivo", id_dispositivo);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [magnitudes, setMagnitudes] = useState([]);
  const [selectedMagnitudes, setSelectedMagnitudes] = useState([]);
  const [estaciones, setEstaciones] = useState([]);
  const [selectedEstacion, setSelectedEstacion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (magnitudes.length === 0) {
      API_MAGNITUDES.get_posibles_magnitudes()
        .then((magnitudes) => {
          API_ESTACIONES.get_estaciones()
            .then((estaciones) => {
              setEstaciones(estaciones);
              setMagnitudes(magnitudes);
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedMagnitudes((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((magnitudId) => magnitudId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMagnitudes.length === 0) {
      Notifications.error("Debe seleccionar al menos una magnitud");
      return;
    }
    if (!selectedEstacion) {
      Notifications.error("Debe seleccionar una estación");
      return;
    }
    API_DISPOSITIVOS.update_dispositivo(
      selectedEstacion,
      name,
      location,
      selectedMagnitudes
    )
      .then((response) => {
        Notifications.success("Dispositivo creado correctamente");
      })
      .catch((err) => Notifications.error("Error creando dispositivo"));
  };

  return (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre del sensor
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
              htmlFor="location"
            >
              Especifique la ubicación
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="estacion"
            >
              Estación
            </label>
            <select
              id="estacion"
              value={selectedEstacion}
              onChange={(e) => setSelectedEstacion(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Seleccione una estación</option>
              {estaciones.map((estacion) => (
                <option key={estacion.id} value={estacion.id}>
                  {estacion.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="magnitudes"
            >
              Magnitudes
            </label>
            <div id="magnitudes">
              {magnitudes.map((magnitud) => (
                <div key={magnitud.id_magnitud} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`magnitud-${magnitud.id_magnitud}`}
                    value={magnitud.id_magnitud}
                    checked={selectedMagnitudes.includes(magnitud.id_magnitud)}
                    onChange={() => handleCheckboxChange(magnitud.id_magnitud)}
                    className="mr-2"
                  />
                  <label htmlFor={`magnitud-${magnitud.id_magnitud}`}>
                    {magnitud.descripcion}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Actualizar
          </button>
        </form>
      )}
    </div>
  );
};

export default EditDeviceForm;
