import React, { useState, useEffect } from "react";
import API_MAGNITUDES from "../../api/magnitudes";
import API_DISPOSITIVOS from "../../api/dispositivos";
import API_ESTACIONES from "../../api/estaciones";
import Notifications from "../../utils/Notifications";

const CreateDeviceForm = ({ setData }) => {
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
    API_DISPOSITIVOS.create_dispositivo(
      selectedEstacion,
      name,
      location,
      selectedMagnitudes
    )
      .then((dispositivo) => {
        // Download json object from the response
        const { id_dispositivo, name } = dispositivo; // Assuming `id_dispositivo` is a field in the response
        downloadJson(dispositivo, id_dispositivo, name);
        // Add the new device to the list
        // setData((prevData) => [...prevData, dispositivo]);
        Notifications.success("Dispositivo creado correctamente");
      })
      .catch((err) => {
        // Get data from err
        const { data } = err.response;
        Notifications.error(data.error);
      });
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
            Guardar
          </button>
        </form>
      )}
    </div>
  );
};

// Function to download JSON
const downloadJson = (response, id_dispositivo, name) => {
  // Create the JSON object from the response
  const jsonObject = JSON.stringify(response, null, 2);

  // Create a blob from the JSON object
  const blob = new Blob([jsonObject], { type: "application/json" });

  // Create a link element
  const link = document.createElement("a");

  // Set the download attribute with the desired file name
  link.download = `${id_dispositivo}_${name}.json`;

  // Create a URL for the blob and set it as the href attribute
  link.href = window.URL.createObjectURL(blob);

  // Append the link to the body
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};

export default CreateDeviceForm;
