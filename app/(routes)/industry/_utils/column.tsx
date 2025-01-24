import { ColumnDef } from "@tanstack/react-table";
import { IIndustry } from "./types";
import { Button } from "@/components/ui/button";
import { FilePenLine, ScrollText, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IColumnProps } from "../../types";

export const industryColumn = ({
  onDelete = () => {},
  onDetails = () => {},
  onEdit = () => {},
}: IColumnProps<IIndustry>): ColumnDef<IIndustry>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "industryId",
    header: "Industry Id",
  },
  {
    accessorKey: "industryCode",
    header: "Industry Code",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original?.createdAt).toLocaleString(),
  },
  {
    header: "Actions",
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
