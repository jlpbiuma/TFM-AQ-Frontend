import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_DISPOSITIVOS from "../api/dispositivos"; // Import your API module here
import Notifications from "../utils/Notifications"; // Import your Notifications module here
import LinkDispositivoEstacionForm from "../components/forms/LinkDispositivoEstacionForm"; // Import your LinkUserEstacionForm component here
import Table from "../components/table/Table";
// import { estacion_dispositivo_columns } from "../components/table/columns/EstacionDispositivoColumn";

const ViewEstacionDispositivos = () => {
  const { id_estacion } = useParams();
  const [dispositivos, setDispositivos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEstaciones();
  }, []);

  const fetchEstaciones = () => {
    API_DISPOSITIVOS.get_dispositivos_by_id_estacion(id_estacion)
      .then((response) => {
        console.log(response);
        setDispositivos(response);
      })
      .catch((error) => {
        console.error("Error fetching estaciones:", error);
        Notifications.error("Error fetching estaciones");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">
        Dispositivos de estación nº{id_estacion}
      </h1>
      {isLoading ? (
        <div className="loading-spinner text-center">Loading...</div>
      ) : (
        <Table
          data={dispositivos}
          column={estacion_dispositivo_columns(id_estacion, setDispositivos)}
          setData={setDispositivos}
          buttonText="Vincular un nuevo dispositivo"
          modalTitle="Vincular dispositivo"
          CreateFormComponent={LinkDispositivoEstacionForm}
          type="dispositivos"
        />
      )}
    </div>
  );
};

export default ViewEstacionDispositivos;
