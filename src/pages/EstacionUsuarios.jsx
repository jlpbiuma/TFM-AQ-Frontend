import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_USUARIOS from "../api/usuarios"; // Import your API module here
import Notifications from "../utils/Notifications"; // Import your Notifications module here
import LinkUserEstacionForm from "../components/forms/LinkUserEstacionForm"; // Import your LinkUserEstacionForm component here
import Table from "../components/table/Table";
// import { estacion_user_columns } from "../components/table/columns/EstacionUsuarioColumn";

const ViewEstacionUsuarios = () => {
  const { id_estacion } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEstaciones();
  }, []);

  const fetchEstaciones = () => {
    API_USUARIOS.get_usuario_by_id_estacion(id_estacion)
      .then((response) => {
        console.log(response);
        setUsuarios(response);
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
    <div class="p-4 bg-gray-100 min-h-screen">
      <div class="flex justify-between items-center mb-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <h1 class="text-3xl font-bold mb-6">
        Usuarios de la estación nº{id_estacion}
      </h1>
      {isLoading ? (
        <div class="loading-spinner text-center">Loading...</div>
      ) : (
        <Table
          data={usuarios}
          column={estacion_user_columns(id_estacion, setUsuarios)}
          setData={setUsuarios}
          buttonText="Vincular un nuevo usuario"
          modalTitle="Vincular usuario"
          CreateFormComponent={LinkUserEstacionForm}
          type="usuarios"
        />
      )}
    </div>
  );
};

export default ViewEstacionUsuarios;
