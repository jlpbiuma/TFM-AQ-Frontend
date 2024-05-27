import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../Modal";
import DeleteEstacionUserForm from "../../forms/DeleteEstacionUserForm";
import React, { useState } from "react";

const columnHelper = createColumnHelper();

export const estacion_user_columns = (id_estacion, setUsuarios, usuarios) => {
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
      header: "Name",
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("role", {
      header: "Role",
    }),
    columnHelper.accessor("opciones", {
      header: "Opciones",
      //table
      cell: ({ column, cell }) => {
        const rowId = cell.row.id;
        const header = column.columnDef.header;
        const usuario = cell.row.original;

        // State to control modal open/close
        const [isModalOpen, setIsModalOpen] = useState(false);

        const handleCloseModal = () => {
          setIsModalOpen(false);
        };

        return (
          <>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <Modal.Button
                className="inline-flex text-red-700 p-0.5 bg-red-200 rounded-md px-2.5"
                onClick={() => setIsModalOpen(true)}
              >
                {`Eliminar usuario`}
              </Modal.Button>

              <Modal.Content
                title={`Eliminar usuario ${rowId} de la estación`}
                onClose={handleCloseModal}
              >
                <DeleteEstacionUserForm
                  usuario={usuario}
                  id_estacion={id_estacion}
                  setUsuarios={setUsuarios}
                  usuarios={usuarios}
                  onClose={handleCloseModal}
                />
              </Modal.Content>
            </Modal>
          </>
        );
      },
      meta: {
        className: "non-pointer",
      },
    }),
  ];
};
