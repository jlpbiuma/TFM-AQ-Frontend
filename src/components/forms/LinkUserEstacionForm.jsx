import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_USUARIOS from "../../api/usuarios"; // Import your API module here
import Notifications from "../../utils/Notifications";

const LinkUserEstacionForm = ({ setActualData }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { id_estacion } = useParams();
  // Assuming you have user data from API or somewhere else

  const handleUserSelection = (event) => {
    const userId = event.target.value;
    const isSelected = event.target.checked;
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleLinkUsers = () => {
    if (selectedUsers.length > 0) {
      API_USUARIOS.link_usuarios_by_id_estacion(id_estacion, selectedUsers)
        .then((response) => {
          console.log(response);
          // Delete linked_usuarios from usuarios array
          setUsuarios(
            usuarios.filter((user) => !selectedUsers.includes(user.id_usuario))
          );
          // Add to the actual data
          setActualData((previousUsers) => [...previousUsers, ...response]);
          // Empty the selectedUsers array
          setSelectedUsers([]);
          Notifications.success("Usuarios vinculados exitosamente");
        })
        .catch((error) => {
          console.error("Error linking users:", error);
          Notifications.error("Error vinculando usuarios");
        });
    } else {
      Notifications.error("No se ha seleccionado ningun usuario");
    }
  };

  useEffect(() => {
    API_USUARIOS.get_usuarios_no_id_estacion(id_estacion)
      .then((usuarios) => {
        console.log(usuarios);
        setUsuarios(usuarios);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        Notifications.error("Error fetching users");
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [id_estacion]);

  return (
    <div class="p-2">
      {isFetching ? (
        <div class="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* <h2 class="text-xl font-semibold mb-4">
            Selecciona un usuario para vincular con la estación {id_estacion}:
          </h2> */}
          <form class="max-h-60 overflow-y-auto space-y-2">
            {usuarios.map((user) => (
              <label key={user.id_usuario} class="block">
                <input
                  type="checkbox"
                  value={user.id_usuario}
                  checked={selectedUsers.includes(user.id_usuario)}
                  onChange={handleUserSelection}
                  class="mr-2"
                />
                {user.username}
              </label>
            ))}
          </form>
          <button
            type="button"
            onClick={handleLinkUsers}
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Vincular usuarios
          </button>
        </>
      )}
    </div>
  );
};

export default LinkUserEstacionForm;
