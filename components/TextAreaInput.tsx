import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface ITextAreaInput extends React.ComponentProps<typeof Textarea> {
  isRequired?: boolean;
  label?: string;
  leftIcon?: ReactNode;
  error?: FieldError;
}

const TextAreaInput: FC<ITextAreaInput> = ({
  isRequired = false,
  className,
  leftIcon,
  label,
  error,
  ...rest
}) => {
  return (
    <div>
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
        <Textarea
          {...rest}
          className={cn(
            "min-h-[70px]",
            className,
            error && "outline-red-500 border-red-500"
          )}
        />
      </div>

      {error ? <p className="text-sm text-red-500">{error?.message}</p> : null}
    </div>
  );
};

export default TextAreaInput;
