/* eslint-disable react/prop-types */
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../Modal";
import EditdispositivoForm from "../../forms/EditDeviceForm";
import API_DISPOSITIVOS from "../../../api/dispositivos";
import Notifications from "../../../utils/Notifications";

const columnHelper = createColumnHelper();

const handleDelete = (id_dispositivo, setData) => {
  API_DISPOSITIVOS.delete_dispositivo(id_dispositivo)
    .then(() => {
      // Filter out the deleted device
      setData((prevData) =>
        prevData.filter((device) => device.id_dispositivo !== id_dispositivo)
      );
      Notifications.success("dispositivo eliminado correctamente");
    })
    .catch(() => {
      Notifications.error("Error eliminando dispositivo");
    });
};

export const deviceColumns = [
  columnHelper.accessor("", {
    id: "select-device-col",
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
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("location", {
    header: "Location",
  }),
  columnHelper.accessor("nombre_estacion", {
    header: "Station name",
  }),
  columnHelper.accessor("opciones", {
    header: "Opciones",
    //table
    cell: ({ row, column, cell, table }) => {
      const setData = table.options.meta.setData;
      const header = column.columnDef.header;
      const id_dispositivo = row.original.id_dispositivo;
      const name = row.original.name;
      return (
        <>
          <Modal>
            <Modal.Button className="inline-flex text-emerald-700 p-0.5 bg-emerald-200 rounded-md px-2.5">
              {`Editar dispositivo`}
            </Modal.Button>

            <Modal.Content title={`Editar sensor ${name}`}>
              <EditdispositivoForm id_dispositivo={id_dispositivo} />
            </Modal.Content>
          </Modal>
          <button
            className="inline-flex text-red-700 p-0.5 bg-red-200 rounded-md px-2.5 mx-3"
            onClick={() => handleDelete(id_dispositivo, setData)}
          >
            Eliminar dispositivo
          </button>
        </>
      );
    },
    meta: {
      className: "non-pointer",
    },
  }),
];
