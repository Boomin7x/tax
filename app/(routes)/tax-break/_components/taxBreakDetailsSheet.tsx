import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ISheet } from "../../types";
import { ITaxBreak } from "../_utils/type";
import { filterOut } from "../../utils";
import { v4 } from "uuid";
import { Button } from "@/components/ui/button";

const TaxBreakDetailsSheet = ({ isOpen, onClose, data }: ISheet<ITaxBreak>) => {
  const newData = data as ITaxBreak;
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[30vw] flex flex-col">
        <SheetHeader>
          <SheetTitle>Goods and Services Details</SheetTitle>
          <SheetDescription>
            Goods/Services catalogs the products or services offered by
            businesses. Each entry is linked to a specific Industry for
            classification purposes
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 flex-grow  py-6 overflow-auto">
          {Object.keys(newData)
            .filter((a) => filterOut(a))
            .sort((a, b) => {
              if (a === "createdAt" || a === "updatedAt") return 1;
              if (b === "createdAt" || b === "updatedAt") return -1;
              return 0;
            })
            .map((items) => (
              <div key={v4()}>
                <p className="text-sm font-semibold capitalize">
                  {items.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p>
                  {typeof newData[items as keyof typeof newData] === "boolean"
                    ? newData[items as keyof typeof newData]
                      ? "Yes"
                      : "No"
                    : new Date(
                        String(newData[items as keyof typeof newData])
                      ).toString() !== "Invalid Date"
                    ? new Date(
                        String(newData[items as keyof typeof newData])
                      ).toLocaleString() // This will include both date and time
                    : newData[items as keyof typeof newData] ?? "N/A"}
                </p>
              </div>
            ))}
        </div>
        <SheetFooter>
          <Button onClick={onClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TaxBreakDetailsSheet;
