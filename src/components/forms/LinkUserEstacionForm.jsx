import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/estaciones"; // Import your API module here
import Notifications from "../../utils/Notifications";

const LinkUserEstacionForm = () => {
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
      API.link_list_usuarios_id_estacion(id_estacion, selectedUsers)
        .then(() => {
          // Delete linked_usuarios from usuarios array
          setUsuarios(
            usuarios.filter((user) => !selectedUsers.includes(user.id_usuario))
          );
          Notifications.success("Usuarios vinculados exitosamente");
          // Optionally refresh the list of users or perform other actions
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
    API.get_usuarios_no_id_estacion(id_estacion)
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
    <div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>
            Selecciona un usuario para vincular con la estación {id_estacion}:
          </h2>
          <form>
            {usuarios.map((user) => (
              <label key={user.id_usuario}>
                <input
                  type="checkbox"
                  value={user.id_usuario}
                  checked={selectedUsers.includes(user.id_usuario)}
                  onChange={handleUserSelection}
                />
                {user.name}
              </label>
            ))}
          </form>
          <button type="button" onClick={handleLinkUsers}>
            Link Users
          </button>
        </>
      )}
    </div>
  );
};

export default LinkUserEstacionForm;
