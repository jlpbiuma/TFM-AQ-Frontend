import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../Modal";
import EditUserForm from "../../forms/EditUserForm";
import API_USERS from "../../../api/usuarios";
import Notifications from "../../../utils/Notifications";

const columnHelper = createColumnHelper();

const handleDelete = (id_usuario, setData) => {
  console.log("Deleting user with id:", id_usuario);
  API_USERS.delete_usuario(id_usuario)
    .then(() => {
      // Filter out the deleted user
      setData((prevData) =>
        prevData.filter((user) => user.id_usuario !== id_usuario)
      );
      Notifications.success("Usuario eliminado correctamente");
    })
    .catch(() => {
      Notifications.error("Error eliminando usuario");
    });
};

export const userColumns = [
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
    cell: ({ column, cell, table }) => {
      const setData = table.options.meta.setData;
      const rowId = cell.row.id;
      const header = column.columnDef.header;
      const id_usuario = cell.row.original._id;
      console.log("id_usuario", id_usuario);
      return (
        <>
          <Modal>
            <Modal.Button className="inline-flex text-emerald-700 p-0.5 bg-emerald-200 rounded-md px-2.5">
              {`Editar usuario`}
            </Modal.Button>

            <Modal.Content title={`Editar usuario ${rowId}`}>
              <EditUserForm id_usuario={id_usuario} />
            </Modal.Content>
          </Modal>
          <button
            className="inline-flex text-red-700 p-0.5 bg-red-200 rounded-md px-2.5 mx-3"
            onClick={() => handleDelete(id_usuario, setData)}
          >
            Eliminar usuario
          </button>
        </>
      );
    },
    meta: {
      className: "non-pointer",
    },
  }),
];
