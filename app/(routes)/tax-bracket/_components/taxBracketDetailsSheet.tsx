import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { v4 } from "uuid";
import { ISheet } from "../../types";
import { filterOut } from "../../utils";
import { ITaxBracket } from "../_utils/type";
import { Button } from "@/components/ui/button";

/**
 * Component for displaying detailed information about a tax bracket in a sheet.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the sheet is open.
 * @param {function} props.onClose - Function to call when the sheet is closed.
 * @param {ITaxBracket} props.data - The data object containing tax bracket details.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * The component sorts the keys of the `data` object, ensuring that `createdAt` and `updatedAt` fields
 * are always at the end of the list. It then maps over the sorted keys to display each key-value pair.
 * Boolean values are displayed as "Yes" or "No", date strings are formatted to a locale string, and
 * other values are displayed as-is or as "N/A" if they are null or undefined.
 */
const TaxBracketDetailsSheet = ({
  isOpen,
  onClose,
  data,
}: ISheet<ITaxBracket>) => {
  const newData = data as ITaxBracket;
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

export default TaxBracketDetailsSheet;
