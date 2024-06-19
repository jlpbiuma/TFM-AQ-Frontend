import { useState, useEffect } from "react";
import Notifications from "../utils/Notifications.js";
import API from "../api/estaciones.js";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/table/Modal.jsx";
import CreateDeviceForm from "../components/forms/CreateDeviceForm.jsx";
import usuarios from "../api/usuarios.js";

const ViewMisEstaciones = () => {
  const [estaciones, setEstaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEstacion, setSelectedEstacion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstaciones = async () => {
      try {
        const id_usuario = localStorage.getItem("id_usuario");
        const estacionesData = await API.get_estaciones_by_user(id_usuario);
        setEstaciones(estacionesData);
        setIsLoading(false);
      } catch (error) {
        Notifications.error("Error fetching estaciones");
        setIsLoading(false);
      }
    };

    fetchEstaciones();
  }, []);

  const handleAddDeviceClick = (estacion) => {
    setSelectedEstacion(estacion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Mis Estaciones</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {estaciones.map((estacion) => (
            <li
              onClick={() =>
                !isModalOpen &&
                navigate("/mis-estaciones/" + estacion.id + "/dashboard")
              }
              key={estacion.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold">{estacion.nombre}</h2>
              <p>{estacion.localizacion}</p>
              {/* <Modal onOpenChange={setIsModalOpen}>
                <Modal.Button asChild>
                  <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddDeviceClick(estacion);
                    }}
                    disabled={isModalOpen}
                  >
                    Agregar un dispositivo
                  </button>
                </Modal.Button>
                <Modal.Content title="Agregar un dispositivo">
                  <CreateDeviceForm
                    estacion={selectedEstacion}
                    handleCloseModal={handleCloseModal}
                  />
                </Modal.Content>
              </Modal> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewMisEstaciones;
