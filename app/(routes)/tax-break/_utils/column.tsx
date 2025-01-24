import { ColumnDef } from "@tanstack/react-table";
import { ITaxBreak } from "./type";
import { IColumnProps } from "../../types";
import TableActions from "@/components/tableActions";

export const taxBreakColumn = ({
  onDelete = () => {},
  onDetails = () => {},
  onEdit = () => {},
}: IColumnProps<ITaxBreak>): ColumnDef<ITaxBreak>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "documentRequired",
    header: "Document Required",
  },
  {
    accessorKey: "applicableTo",
    header: "Applicable To",
  },

  {
    accessorKey: "taxBreaksCode",
    header: "Tax Breaks Code",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
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
