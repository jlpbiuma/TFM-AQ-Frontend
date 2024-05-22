/* eslint-disable react/prop-types */
import { createColumnHelper } from "@tanstack/react-table";
import { Modal } from "../Modal";
import EditSensorForm from "../../forms/EditSensorForm";

const columnHelper = createColumnHelper();

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
  columnHelper.accessor("station-name", {
    header: "Station name",
  }),
  columnHelper.accessor("opciones", {
    header: "Opciones",
    //table
    cell: ({ column, cell }) => {
      const rowId = cell.row.id;
      const header = column.columnDef.header;
      return (
        <>
          <Modal>
            <Modal.Button className="inline-flex text-emerald-700 p-0.5 bg-emerald-200 rounded-md px-2.5">
              {`Editar sensor`}
            </Modal.Button>

            <Modal.Content title={`Editar sensor ${rowId}`}>
              <EditSensorForm rowId={rowId} />
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
