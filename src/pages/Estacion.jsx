import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/estaciones"; // Import your API module here
import Notifications from "../utils/Notifications"; // Import your Notifications module here
import LinkUserEstacionForm from "../components/forms/LinkUserEstacionForm"; // Import your LinkUserEstacionForm component here
import Modal from "../components/common/Modal";

const ViewEstacion = () => {
  const { id_estacion } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    fetchEstaciones();
  }, []);

  const fetchEstaciones = () => {
    API.get_usuario_by_id_estacion(id_estacion)
      .then((response) => {
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

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={handleAddUser}>Add New User</button>{" "}
        {/* Button to open modal */}
      </div>
      <h1>Estacion {id_estacion}</h1>
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id_usuario}>
              <h2>{usuario.nombre}</h2>
              <p>{usuario.email}</p>
            </li>
          ))}
        </ul>
      )}
      {/* Modal */}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <LinkUserEstacionForm id_estacion={id_estacion} />
        </Modal>
      )}
    </div>
  );
};

export default ViewEstacion;
