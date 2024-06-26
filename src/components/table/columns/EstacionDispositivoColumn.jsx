import { createColumnHelper } from "@tanstack/react-table";
import API_DISPOSITIVOS from "../../../api/dispositivos";
import Notifications from "../../../utils/Notifications";

const columnHelper = createColumnHelper();

const handleDeleteLinkDispositivoEstacion = (
  id_estacion,
  id_dispositivo,
  setDispositivos
) => {
  API_DISPOSITIVOS.delete_link_dispositivo_estacion(id_estacion, id_dispositivo)
    .then(() => {
      // Filter out the deleted device
      setDispositivos((prevData) =>
        prevData.filter((device) => device.id_dispositivo !== id_dispositivo)
      );
      Notifications.success("dispositivo eliminado correctamente");
    })
    .catch(() => {
      Notifications.error("Error eliminando dispositivo");
    });
};

export const estacion_dispositivo_columns = (id_estacion, setDispositivos) => {
  return [
    columnHelper.accessor("", {
      id: "select-user-col",
      header: ({ table }) => {
        return (
          <input
            id="select-col"
            className="bg-stone-50 border-stone-400 text-stone-400 focus:ring-0 rounded-sm cursor-pointer"
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        );
      },
      cell: ({ row }) => {
        return (
          <input
            className="bg-stone-50 border-stone-400 text-stone-400 focus:ring-0 rounded-sm cursor-pointer"
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        );
      },
    }),
    columnHelper.accessor("name", {
      header: "Nombre",
    }),
    columnHelper.accessor("location", {
      header: "Localización",
    }),
    columnHelper.accessor("state", {
      header: "Estado",
    }),
    columnHelper.accessor("opciones", {
      header: "Opciones",
      //table
      cell: ({ cell }) => {
        const { id_dispositivo } = cell.row.original;
        return (
          <>
            <button
              className="inline-flex text-red-700 p-0.5 bg-red-200 rounded-md px-2.5 mx-3"
              onClick={() =>
                handleDeleteLinkDispositivoEstacion(
                  id_estacion,
                  id_dispositivo,
                  setDispositivos
                )
              }
            >
              Eliminar relación
            </button>
          </>
        );
      },
      meta: {
        className: "non-pointer",
      },
    }),
  ];
};
