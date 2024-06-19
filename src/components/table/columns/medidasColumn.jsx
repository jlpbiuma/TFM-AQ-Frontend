/* eslint-disable react/prop-types */
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const medidasColumn = [
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
  columnHelper.accessor("id_medida", {
    header: "ID",
  }),
  columnHelper.accessor("fecha_hora", {
    header: "Timestamp",
  }),
  columnHelper.accessor("valor", {
    header: "Valor",
  }),
];
