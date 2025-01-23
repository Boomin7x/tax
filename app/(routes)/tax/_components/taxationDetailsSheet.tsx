import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ITaxations } from "../_utils/types";
import { ISheet } from "../../types";
import { Button } from "@/components/ui/button";
import { filterOut } from "../../utils";
import { v4 } from "uuid";

const TaxationDetailsSheet = ({
  isOpen,
  onClose,
  data,
}: ISheet<ITaxations>) => {
  const newData = data as ITaxations;
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[30vw] flex flex-col">
        <SheetHeader>
          <SheetTitle>Taxation Details</SheetTitle>
          <SheetDescription>
            Taxes records the various types of taxes applicable within the
            system. Each tax entry specifies the tax rate, calculation method,
            and criteria it applies to (e.g., industry, location, tax bracket,
            or exemptions)
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 flex-grow  py-6 overflow-auto">
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

export default TaxationDetailsSheet;
