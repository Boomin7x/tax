import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";
import { Input } from "./ui/input";
import { FieldError } from "react-hook-form";

interface ITextInput extends React.ComponentProps<typeof Input> {
  isRequired?: boolean;
  label?: string;
  leftIcon?: ReactNode;
  error?: FieldError;
  actions?: ReactNode;
}

const TextInput: FC<ITextInput> = ({
  isRequired = false,
  className,
  leftIcon,
  label,
  error,
  actions,
  ...rest
}) => {
  return (
    <div className="w-full">
      {!!label && (
        <div className="flex flex-col ">
          <p className="capitalize font-semibold">
            {label}{" "}
            {isRequired && <span className="text-red-400 font-bold">*</span>}
          </p>
          {actions}
        </div>
      )}

      <div className="relative">
        {Boolean(leftIcon) ? (
          <div className=" absolute top-1/2 ml-4 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        ) : null}
        <Input
          {...rest}
          className={cn(className, error && "outline-red-500 border-red-500")}
        />
      </div>

      {error ? <p className="text-sm text-red-500">{error?.message}</p> : null}
    </div>
  );
};

export default TextInput;
