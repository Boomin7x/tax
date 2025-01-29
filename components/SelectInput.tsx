import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISelectInput extends React.ComponentProps<typeof SelectContent> {
  isRequired?: boolean;
  label?: string;
  leftIcon?: ReactNode;
  error?: FieldError;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options?: { value: string; inputDisplay: ReactNode }[];
  value?: string;
}

const SelectInput: FC<ISelectInput> = ({
  isRequired = false,
  className,
  leftIcon,
  placeholder,
  label,
  error,
  onValueChange,
  options,
  value,
  ...rest
}) => {
  return (
    <div className="w-full">
      {!!label && (
        <p className="capitalize font-semibold">
          {label}{" "}
          {isRequired && <span className="text-red-400 font-bold">*</span>}
        </p>
      )}

      <div className="relative">
        {Boolean(leftIcon) ? (
          <div className=" absolute top-1/2 ml-4 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        ) : null}
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            className={cn(
              "rounded-[0.3px] h-[55px]",
              className,
              error && "outline-red-500 border-red-500"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent
            onChange={(e) => console.log((e.target as HTMLSelectElement).value)}
            {...rest}
          >
            {options
              ? options?.map((items) => (
                  <SelectItem key={uuidv4()} value={items?.value}>
                    {" "}
                    {items?.inputDisplay}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      </div>

      {error ? <p className="text-sm text-red-500">{error?.message}</p> : null}
    </div>
  );
};

export default SelectInput;
