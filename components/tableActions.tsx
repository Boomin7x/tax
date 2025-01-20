import React from "react";
import { Button } from "./ui/button";
import { FilePenLine, ScrollText, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { IColumnProps } from "@/app/(routes)/types";

const TableActions = <T,>({
  newData,
  onDelete,
  onDetails,
  onEdit,
}: IColumnProps<T> & { newData: T }) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={() => onDetails(newData)}>
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
};

export default TableActions;
