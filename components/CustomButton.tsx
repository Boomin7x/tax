import React from "react";
import { Button } from "./ui/button";

interface ICustomButton extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
}
const CustomButton: React.FC<ICustomButton> = ({
  disabled,
  isLoading,
  children,
  ...rest
}) => {
  return (
    <Button disabled={disabled || isLoading} {...rest}>
      {isLoading && (
        <div className="w-4 h-4 rounded-full animate-spin border border-border border-t-transparent" />
      )}
      {children}
    </Button>
  );
};

export default CustomButton;
