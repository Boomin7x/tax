import { ColumnDef } from "@tanstack/react-table";
import { IProduct } from "./types";
import { IColumnProps } from "../../types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilePenLine, ScrollText, Trash2 } from "lucide-react";

export const productColumn = ({
  onDelete = () => {},
  onDetails = () => {},
  onEdit = () => {},
}: IColumnProps<IProduct>): ColumnDef<IProduct>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "productId",
    header: "Product Id",
  },
  {
    accessorKey: "productCode",
    header: "Product Code",
  },
  {
    accessorKey: "isTaxable",
    header: "Is Taxable",
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
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDetails(newData)}
          >
            <ScrollText className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-700"
            onClick={() => onEdit(newData)}
          >
            <FilePenLine className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => onDelete(newData)}
            color="red"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
