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
import { ILocation } from "../_utils/types";
import { filterOut } from "../../utils";
import { v4 } from "uuid";
import { Button } from "@/components/ui/button";

const LocationDetailsSheet = ({ isOpen, onClose, data }: ISheet<ILocation>) => {
  const newData = data as ILocation;
  console.log({ newData });
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
        <div className="grid grid-cols-2 gap-5 flex-grow  py-6 overflow-auto">
          {Object.keys(newData)
            .filter((a) => filterOut(a))
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

export default LocationDetailsSheet;
