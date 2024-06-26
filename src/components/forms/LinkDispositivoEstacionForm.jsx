import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_DISPOSITIVOS from "../../api/dispositivos"; // Import your API module here
import Notifications from "../../utils/Notifications";

const LinkDispositivoEstacionForm = ({ setActualData }) => {
  const [selectedDispositivos, setSelectedDispositivos] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { id_estacion } = useParams();
  // Assuming you have user data from API or somewhere else

  const handleDispositivoSelection = (event) => {
    const id_dispositivo = event.target.value;
    const isSelected = event.target.checked;
    if (isSelected) {
      setSelectedDispositivos([...selectedDispositivos, id_dispositivo]);
    } else {
      setSelectedDispositivos(
        selectedDispositivos.filter((id) => id !== id_dispositivo)
      );
    }
  };

  const handleLinkDispositivos = () => {
    if (selectedDispositivos.length > 0) {
      API_DISPOSITIVOS.link_dispositivo_estacion(
        selectedDispositivos,
        id_estacion
      )
        .then((response) => {
          // Delete linked_usuarios from usuarios array
          setDispositivos(
            dispositivos.filter(
              (dispositivo) =>
                !selectedDispositivos.includes(dispositivo.id_dispositivo)
            )
            // Now add the new linked_dispositivos to the dispositivos array
          );
          setActualData((previousDispositivos) => [
            ...previousDispositivos,
            ...response,
          ]);
          // Empty the selectedDispositivos array
          setSelectedDispositivos([]);
          Notifications.success("Dispositivos vinculados correctamente");
        })
        .catch((error) => {
          Notifications.error("Error vinculando dispositivos");
        });
    } else {
      Notifications.error("No se ha seleccionado ningún dispositivo");
    }
  };

  useEffect(() => {
    API_DISPOSITIVOS.get_dispositivos_no_id_estacion(id_estacion)
      .then((dispositivos) => {
        console.log(dispositivos);
        setDispositivos(dispositivos);
      })
      .catch((error) => {
        console.error("Error fetching dispositivo:", error);
        Notifications.error("Error fetching dispositivo");
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [id_estacion]);

  return (
    <div class="p-4">
      {isFetching ? (
        <div class="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <form class="max-h-60 overflow-y-auto space-y-2">
            {dispositivos.map((dispositivo) => (
              <label key={dispositivo.id_dispositivo} class="block">
                <input
                  type="checkbox"
                  value={dispositivo.id_dispositivo}
                  checked={selectedDispositivos.includes(
                    dispositivo.id_dispositivo
                  )}
                  onChange={handleDispositivoSelection}
                  class="mr-2"
                />
                {dispositivo.name}
              </label>
            ))}
          </form>
          <button
            type="button"
            onClick={handleLinkDispositivos}
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Vincular dispositivos
          </button>
        </>
      )}
    </div>
  );
};

export default LinkDispositivoEstacionForm;
