import { useState, useEffect } from "react";
import Notifications from "../utils/Notifications.js";
import Estaciones from "../components/list/Estaciones.jsx";
import API from "../api/estaciones.js";
import Modal from "../components/common/Modal.jsx";
import CreateEstacionForm from "../components/forms/CreateEstacionForm.jsx";
import UpdateEstacionForm from "../components/forms/UpdateEstacionForm.jsx";
import DeleteEstacionForm from "../components/forms/DeleteEstacionForm.jsx";

const ViewEstaciones = () => {
  const [estaciones, setEstaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEstacion, setCurrentEstacion] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [estacionToDelete, setEstacionToDelete] = useState(null); // State to store estacion to delete
  const isTecnico = parseInt(localStorage.getItem("role"), 0) > 1;

  useEffect(() => {
    fetchEstaciones();
  }, []);

  const fetchEstaciones = () => {
    API.get_estaciones()
      .then((response) => {
        setEstaciones(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching estaciones:", error);
        Notifications.error("Error fetching estaciones");
        setIsLoading(false);
      });
  };

  const openModal = (estacion = null) => {
    setCurrentEstacion(estacion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEstacion(null);
  };

  const openDeleteModal = (estacion) => {
    setEstacionToDelete(estacion); // Set estacion to delete
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEstacionToDelete(null); // Reset estacion to delete
  };

  const handleCreateOrUpdateEstacion = (estacion) => {
    if (currentEstacion) {
      // Update logic
      API.update_estacion(estacion)
        .then(() => {
          Notifications.success("Estacion updated successfully");
          fetchEstaciones();
        })
        .catch((error) => {
          console.error("Error updating estacion:", error);
          Notifications.error("Error updating estacion");
        });
    } else {
      // Create logic
      API.create_estacion(estacion)
        .then(() => {
          Notifications.success("Estacion created successfully");
          fetchEstaciones();
        })
        .catch((error) => {
          console.error("Error creating estacion:", error);
          Notifications.error("Error creating estacion");
        });
    }
    closeModal();
  };

  const handleDelete = () => {
    if (estacionToDelete) {
      API.delete_estacion(estacionToDelete.id)
        .then(() => {
          Notifications.success("Estacion deleted successfully");
          fetchEstaciones();
          closeDeleteModal();
        })
        .catch((error) => {
          console.error("Error deleting estacion:", error);
          Notifications.error("Error deleting estacion");
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Estaciones</h1>
      {isTecnico && (
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          Create New Estacion
        </button>
      )}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Estaciones
          estaciones={estaciones}
          onEdit={openModal}
          onDelete={openDeleteModal} // Pass openDeleteModal as onDelete
          isTecnico={isTecnico}
        />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {currentEstacion ? (
            <UpdateEstacionForm
              estacion={currentEstacion}
              onUpdate={handleCreateOrUpdateEstacion}
              onClose={closeModal}
            />
          ) : (
            <CreateEstacionForm
              onCreate={handleCreateOrUpdateEstacion}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal onClose={closeDeleteModal}>
          <DeleteEstacionForm
            estacion={estacionToDelete} // Pass estacionToDelete
            onDelete={handleDelete} // Pass handleDelete
            onClose={closeDeleteModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewEstaciones;
