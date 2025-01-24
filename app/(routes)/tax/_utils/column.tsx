"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ITaxations } from "./types";
import { IColumnProps } from "../../types";
import TableActions from "@/components/tableActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const taxColumn = ({
  onDelete = () => {},
  onDetails = () => {},
  onEdit = () => {},
}: IColumnProps<ITaxations>): ColumnDef<ITaxations>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "taxCode",
    header: "Tax code",
  },
  {
    accessorKey: "rateType",
    header: "Rate type",
  },
  {
    accessorKey: "taxRate",
    header: "tax rate",
  },
  {
    accessorKey: "validityStartDate",
    header: "Validity start date",
    cell: ({ row }) =>
      row.original?.validityStartDate
        ? new Date(row.original?.validityStartDate as string).toLocaleString()
        : "N/A",
  },
  {
    accessorKey: "validityEndDate",
    header: "Validity end date",
    cell: ({ row }) =>
      row.original?.validityEndDate
        ? new Date(row.original?.validityEndDate as string).toLocaleString()
        : "N/A",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const newData = row?.original;
      return (
        <TableActions
          newData={newData}
          onDelete={onDelete}
          onDetails={onDetails}
          onEdit={onEdit}
        />
      );
    },
  },
];
