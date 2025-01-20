import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ISheet } from "../../types";
import { IIndustry } from "../_utils/types";
import { v4 } from "uuid";
import { Button } from "@/components/ui/button";
import { filterOut } from "../../utils";

const IndustryDetailsSheet = ({ isOpen, onClose, data }: ISheet<IIndustry>) => {
  const newData = data as IIndustry;
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[30vw] flex flex-col">
        <SheetHeader>
          <SheetTitle>Industry Details</SheetTitle>
          <SheetDescription>
            The Industry represents sector of economic activity.
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
                <p>{newData[items as keyof typeof newData] ?? "N/A"}</p>
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

export default IndustryDetailsSheet;
