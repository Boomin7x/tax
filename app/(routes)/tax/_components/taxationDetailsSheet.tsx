import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
import { v4 } from "uuid";
import { ISheet } from "../../types";
import { ITaxations } from "../_utils/types";

const TaxationDetailsSheet = ({
  isOpen,
  onClose,
  data,
}: ISheet<ITaxations>) => {
  const newData = data as ITaxations;
  const displayData: { title: keyof ITaxations; value: ReactNode }[] = [
    { title: "name", value: newData?.name ?? "N/A" },
    { title: "rateType", value: newData?.rateType ?? "N/A" },
    { title: "taxCode", value: newData?.taxCode ?? "N/A" },
    { title: "flatRate", value: newData?.flatRate ?? "N/A" },
    { title: "taxId", value: newData?.taxId ?? "N/A" },
    {
      title: "validityStartDate",
      value: newData?.validityStartDate
        ? new Date(newData?.validityStartDate).toLocaleString()
        : "N/A",
    },
    {
      title: "validityEndDate",
      value: newData?.validityEndDate
        ? new Date(newData?.validityEndDate).toLocaleString()
        : "N/A",
    },
  ];
  const displayArray = [
    {
      title: "Tax bracket code",
      value: (
        <ul>
          {newData?.applicableToBrackets.length
            ? newData?.applicableToBrackets?.map((items) => (
                <li className="list-disc" key={v4()}>
                  {items?.taxBracketCode}
                </li>
              ))
            : "N/A"}
        </ul>
      ),
    },
    {
      title: "Tax break name",
      value: (
        <ul>
          {newData?.applicableToBreaks?.length
            ? newData?.applicableToBreaks?.map((items) => (
                <li className="list-disc" key={v4()}>
                  {items?.name}
                </li>
              ))
            : "N/A"}
        </ul>
      ),
    },
    {
      title: "Locations name",
      value: (
        <ul>
          {newData?.applicableToLocations?.length
            ? newData?.applicableToLocations?.map((items) => (
                <li className="list-disc" key={v4()}>
                  {items?.name}
                </li>
              ))
            : "N/A"}
        </ul>
      ),
    },
    {
      title: "Products / services name",
      value: (
        <ul>
          {newData?.applicableToProductService?.length
            ? newData?.applicableToProductService?.map((items) => (
                <li className="list-disc" key={v4()}>
                  {items?.name}
                </li>
              ))
            : "N/A"}
        </ul>
      ),
    },
  ];
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
        <div className="grid grid-cols-2 gap-5 flex-grow  py-6 overflow-auto">
          {displayData?.map((items) => (
            <div key={v4()}>
              <p className="text-sm font-semibold capitalize">{items?.title}</p>
              <p>{items?.value}</p>
            </div>
          ))}
          {displayArray?.map((items) => (
            <div key={v4()}>
              <p className="text-sm font-semibold capitalize">{items?.title}</p>
              <p className="pl-3">{items?.value}</p>
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
