"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TextInput from "./TextInput";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

export function ComboboxPopover() {
  // const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );
  // const [text, setText] = React.useState<string[]>();
  const [array, setArray] = React.useState<Status[]>();
  React.useEffect(() => {
    setArray(statuses);
  }, [statuses]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const isPositive = e.target.value.toLowerCase().startsWith("+");
    // const isNegative = e.target.value.toLowerCase().startsWith("-");

    // setText(e.target.value.toLowerCase().split(","));

    setArray(
      statuses?.filter((items) =>
        items?.label
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase().slice(1))
      )
    );
  };

  console.log({ selectedStatus });

  const ref = useOutsideClick(() => setOpenOptions(false));
  // const onSelect = (status: Status) => {
  //   setSelectedStatus(status);
  // };

  const [openOptions, setOpenOptions] = React.useState(false);

  return (
    <div className="flex flex-col items-start space-x-4 ">
      <p className="text-sm text-muted-foreground">Status</p>
      <Button variant="outline" className="w-[150px] justify-start">
        {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
      </Button>
      <div ref={ref} className="relative">
        <TextInput
          onFocus={() => setOpenOptions(true)}
          onChange={onInputChange}
        />
        <SelectContent open={openOptions}>
          {array?.map((status) => (
            <div
              key={status.value}
              onClick={() => {
                setSelectedStatus(status);
                setOpenOptions(false);
              }}
              className="hover:bg-gray-200/30 cursor-pointer  min-h-[55px] flex items-center p-3 "
            >
              {status.label}
            </div>
          ))}
        </SelectContent>
      </div>
    </div>
  );
}
const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

interface ISelectContent {
  children: React.ReactNode;
  open: boolean;
}
const SelectContent: React.FC<ISelectContent> = ({ children, open }) => {
  return open ? (
    <div
      className={cn(
        "absolute bg-white border grid grid-cols-1 min-w-[12rem]",
        "top-0 left-0 -translate-y-full"
      )}
    >
      {children}
    </div>
  ) : null;
};
