import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Notifications from "../../utils/Notifications.js";

/* eslint-disable react/prop-types */
const EditSensorForm = ({ rowId, onSave }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [magnitude, setMagnitude] = useState("");

  useEffect(() => {
    // Replace with your actual fetch URL and logic
    const fetchSensorData = async () => {
      try {
        // TODO: HACER FETCH A LA API PARA OBTENER LA INFO DE UN SENSOR DADO SU ID DE SENSOR
        const response = await fetch(`/api/sensors/${rowId}`);
        const data = await response.json();
        setName(data.name);
        setLocation(data.location);
        setMagnitude(data.magnitude);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
  }, [rowId]);

  const updateSensorData = async (updatedSensor) => {
    // try {
    // TODO: HACER FETCH A LA API PARA EDITAR LA INFO DE UN SENSOR DADO SU ID DE SENSOR
    //   const response = await fetch(`/api/sensors/${rowId}`, {
    //     method: "PUT", // or 'POST' depending on your API
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(updatedSensor),
    //   });
    //   if (response.ok) {
    //     console.log("Sensor data updated successfully");
    //     onSave(updatedSensor); // Call the onSave prop to handle the updated data
    //     toast.success("Sensor data updated successfully"); // Show success notification
    //   } else {
    //     console.error("Failed to update sensor data");
    //     toast.error("Failed to update sensor data"); // Show error notification
    //   }
    // } catch (error) {
    // console.error("Error updating sensor data:", error);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    toast.error("Error updating sensor data"); // Show error notification
    const updatedSensor = { id: rowId, name, location, magnitude };
    updateSensorData(updatedSensor);
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
            htmlFor="magnitude"
          >
            Magnitud
          </label>
          <select
            id="magnitude"
            value={magnitude}
            onChange={(e) => setMagnitude(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seleccione una magnitud</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
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

export default EditSensorForm;
