import React from "react";
import { ISheet } from "../../types";
import { IProduct } from "../_utils/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { v4 } from "uuid";
import { filterOut, isValidISODate } from "../../utils";
import { Button } from "@/components/ui/button";

const ProductDetails = ({ isOpen, onClose, data }: ISheet<IProduct>) => {
  const newData = data as IProduct;
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
            .map((items) => (
              <div key={v4()}>
                <p className="text-sm font-semibold capitalize">
                  {items.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p>
                  {typeof newData[items as keyof typeof newData] === "object" &&
                  newData[items as keyof typeof newData] !== null
                    ? (
                        newData[items as keyof typeof newData] as {
                          name: string;
                        }
                      ).name
                    : newData[items as keyof typeof newData] === true ||
                      newData[items as keyof typeof newData] === false
                    ? String(newData[items as keyof typeof newData])
                    : !!newData[items as keyof typeof newData]
                    ? isValidISODate(
                        String(newData[items as keyof typeof newData])
                      )
                      ? new Date(
                          String(newData[items as keyof typeof newData])
                        ).toLocaleString()
                      : String(newData[items as keyof typeof newData])
                    : "N/A"}
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

export default ProductDetails;
