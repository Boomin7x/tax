import React, { FC } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ITextInput extends React.ComponentProps<typeof Input> {
  isRequired?: boolean;
  label?: string;
}

const TextInput: FC<ITextInput> = ({
  isRequired = false,
  className,
  label,
  ...rest
}) => {
  return (
    <div>
      {!!label && (
        <p>
          name {isRequired && <span className="text-red-400 font-bold">*</span>}
        </p>
      )}

      <div className="relative">
        <SearchIcon className="w-4 h-4 absolute top-1/2 ml-4 -translate-y-1/2 text-muted-foreground" />
        <Input {...rest} className={cn(className, "pl-12")} />
      </div>
    </div>
  );
};

export default TextInput;
