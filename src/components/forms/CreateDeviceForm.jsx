import React, { useState, useEffect } from "react";
import MultiSelectComboBox from "../common/MultipleSelectionCombobox";
import API_MAGNITUDES from "../../api/magnitudes";
import API_DISPOSITIVOS from "../../api/dispositivos";
import Notifications from "../../utils/Notifications";

const CreateDeviceForm = ({ estacion }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [magnitudes, setMagnitudes] = useState([]);
  const [selectedMagnitudes, setSelectedMagnitudes] = useState([]);

  useEffect(() => {
    if (magnitudes.length === 0) {
      API_MAGNITUDES.get_posibles_magnitudes()
        .then((response) => {
          setMagnitudes(response);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API_DISPOSITIVOS.create_dispositivo(
      estacion.id,
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
            htmlFor="magnitud"
          >
            Magnitud
          </label>
          <MultiSelectComboBox
            items={magnitudes}
            selectedItems={selectedMagnitudes}
            setSelectedItems={setSelectedMagnitudes}
            idField="id_posible_magnitud"
            descriptionField="descripcion"
          />
        </div>
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

export default CreateDeviceForm;
