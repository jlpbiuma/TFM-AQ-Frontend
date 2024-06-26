import { createColumnHelper } from "@tanstack/react-table";
import API_USUARIOS from "../../../api/usuarios";
import Notifications from "../../../utils/Notifications";

const columnHelper = createColumnHelper();

const handleDeleteLinkUsuarioEstacion = (
  id_estacion,
  id_usuario,
  setUsuarios
) => {
  API_USUARIOS.delete_link_usuario_from_estacion_by_id_usuario_id_estacion(
    id_estacion,
    id_usuario
  )
    .then(() => {
      // Filter out the deleted device
      setUsuarios((prevData) =>
        prevData.filter((device) => device.id_usuario !== id_usuario)
      );
      Notifications.success("Dispositivo eliminado correctamente");
    })
    .catch(() => {
      Notifications.error("Error eliminando dispositivo");
    });
};

export const estacion_user_columns = (id_estacion, setUsuarios) => {
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
    columnHelper.accessor("username", {
      header: "Usuario",
    }),
    columnHelper.accessor("phone", {
      header: "Teléfono",
    }),
    columnHelper.accessor("email", {
      header: "Correo",
    }),
    columnHelper.accessor("role", {
      header: "Rol",
    }),
    columnHelper.accessor("opciones", {
      header: "Opciones",
      //table
      cell: ({ cell }) => {
        const { id_usuario } = cell.row.original;
        return (
          <>
            <button
              className="inline-flex text-red-700 p-0.5 bg-red-200 rounded-md px-2.5 mx-3"
              onClick={() =>
                handleDeleteLinkUsuarioEstacion(
                  id_estacion,
                  id_usuario,
                  setUsuarios
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
