import { useState, useEffect } from "react";
import Notifications from "../utils/Notifications.js";
import API from "../api/estaciones.js";

const ViewEstaciones = () => {
  const [estaciones, setEstaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchEstaciones = async () => {
      try {
        const estacionesData = await API.get_estaciones();
        setEstaciones(estacionesData);
        setIsLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        console.error("Error fetching estaciones:", error);
        Notifications.error("Error fetching estaciones");
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchEstaciones();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Estaciones</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div> // Show loading indicator while fetching data
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {estaciones.map((estacion) => (
            <li
              key={estacion.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold">{estacion.nombre}</h2>
              <p>{estacion.descripcion}</p>
              <p className="mt-2 text-gray-600">{estacion.direccion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewEstaciones;
