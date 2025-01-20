import TableActions from "@/components/tableActions";
import { ColumnDef } from "@tanstack/react-table";
import { IColumnProps } from "../../types";
import { ITaxBracket } from "./type";

export const taxtBracketColumn = ({
  onDelete = () => {},
  onDetails = () => {},
  onEdit = () => {},
}: IColumnProps<ITaxBracket>): ColumnDef<ITaxBracket>[] => [
  {
    accessorKey: "incomeMin",
    header: "Min Income",
  },
  {
    accessorKey: "incomeMax",
    header: "Man Income",
  },
  {
    accessorKey: "taxBracketId",
    header: "tax Bracket Id",
  },
  {
    accessorKey: "taxBracketCode",
    header: "tax Bracket Code",
  },
  {
    accessorKey: "createdAt",
    header: "created At",
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
