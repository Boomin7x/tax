import TableActions from "@/components/tableActions";
import { ColumnDef } from "@tanstack/react-table";
import { IColumnProps } from "../../types";
import { ILocation } from "./types";

export const locationColumn = ({
  onDelete = () => {},
  onDetails = () => {},
  onEdit = () => {},
}: IColumnProps<ILocation>): ColumnDef<ILocation>[] => [
  {
    accessorKey: "name",
    header: "Location Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isTaxExempt",
    header: "Is Tax Exempt",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original?.createdAt).toLocaleString(),
  },
  {
    header: "actions",
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
