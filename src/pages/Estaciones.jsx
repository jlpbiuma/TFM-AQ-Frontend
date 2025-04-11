import { useState, useEffect } from "react";
import Notifications from "../utils/Notifications.js";
import Estaciones from "../components/list/Estaciones.jsx";
import API from "../api/estaciones.js";
import Modal from "../components/common/Modal.jsx";
// import CreateEstacionForm from "../components/forms/CreateEstacionForm.jsx";
import UpdateEstacionForm from "../components/forms/UpdateEstacionForm.jsx";
import DeleteEstacionForm from "../components/forms/DeleteEstacionForm.jsx";
import Table from "../components/table/Table";
import { columnasEstaciones } from "../components/table/columns";
import { getEstacionesFromFlask } from "../api/zflask";

const ViewEstaciones = () => {
  const [estaciones, setEstaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEstacion, setCurrentEstacion] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [estacionToDelete, setEstacionToDelete] = useState(null); // State to store estacion to delete
  const isTecnico = parseInt(localStorage.getItem("role"), 0) >= 0;

  // useEffect(() => {
  //   fetchEstaciones();
  // }, []);

  const transformarEstaciones = (datos) =>
    datos.map((fila) => ({
      id_estacion: fila[0],
      id_administrador: fila[1],
      nombre: fila[2],
      localizacion: fila[3],
      ip_gateway: fila[4],
      ip_local: fila[5],
      fecha_hora_ip: fila[6],
    }));

    //console.log("Estaciones transformadas:", transformadas);

    useEffect(() => {
      const fetchData = async () => {
        const rawData = await getEstacionesFromFlask();
        console.log("📦 Datos crudos del backend:", rawData);
        const transformadas = transformarEstaciones(rawData);
        console.log("🔄 Datos transformados:", transformadas);
        setEstaciones(transformadas);
      };
      fetchData();
    }, []);
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Listado de empresas</h1>
        <Table data={estaciones} columns={columnasEstaciones} />
      </div>
    );
  };
  


//   const fetchEstaciones = () => {
//     API.get_estaciones()
//       .then((response) => {
//         setEstaciones(response);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching estaciones:", error);
//         Notifications.error("Error fetching estaciones");
//         setIsLoading(false);
//       });
//   };

//   const openModal = (estacion = null) => {
//     setCurrentEstacion(estacion);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentEstacion(null);
//   };

//   const openDeleteModal = (estacion) => {
//     setEstacionToDelete(estacion); // Set estacion to delete
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setEstacionToDelete(null); // Reset estacion to delete
//   };

//   const handleCreateOrUpdateEstacion = (estacion) => {
//     if (currentEstacion) {
//       // Update logic
//       API.update_estacion(estacion)
//         .then(() => {
//           Notifications.success("Estacion updated successfully");
//           fetchEstaciones();
//         })
//         .catch((error) => {
//           console.error("Error updating estacion:", error);
//           Notifications.error("Error updating estacion");
//         });
//     } else {
//       // Create logic
//       API.create_estacion(estacion)
//         .then(() => {
//           Notifications.success("Estacion created successfully");
//           fetchEstaciones();
//         })
//         .catch((error) => {
//           console.error("Error creating estacion:", error);
//           Notifications.error("Error creating estacion");
//         });
//     }
//     closeModal();
//   };

//   const handleDelete = () => {
//     if (estacionToDelete) {
//       API.delete_estacion(estacionToDelete.id)
//         .then(() => {
//           Notifications.success("Estacion deleted successfully");
//           fetchEstaciones();
//           closeDeleteModal();
//         })
//         .catch((error) => {
//           console.error("Error deleting estacion:", error);
//           Notifications.error("Error deleting estacion");
//         });
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">Estaciones</h1>
//       {isTecnico && (
//         <button
//           onClick={() => openModal()}
//           className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
//         >
//           + Nueva estación
//         </button>
//       )}
//       {isLoading ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <Estaciones
//           estaciones={estaciones}
//           onEdit={openModal}
//           onDelete={openDeleteModal} // Pass openDeleteModal as onDelete
//           isTecnico={isTecnico}
//         />
//       )}
//       {isModalOpen && (
//         <Modal onClose={closeModal}>
//           {currentEstacion ? (
//             <UpdateEstacionForm
//               estacion={currentEstacion}
//               onUpdate={handleCreateOrUpdateEstacion}
//               onClose={closeModal}
//             />
//           ) : (
//             <CreateEstacionForm
//               setActualData={setEstaciones}
//               onCreate={handleCreateOrUpdateEstacion}
//             />
//           )}
//         </Modal>
//       )}
//       {isDeleteModalOpen && (
//         <Modal onClose={closeDeleteModal}>
//           <DeleteEstacionForm
//             estacion={estacionToDelete} // Pass estacionToDelete
//             onDelete={handleDelete} // Pass handleDelete
//             onClose={closeDeleteModal}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default ViewEstaciones;
