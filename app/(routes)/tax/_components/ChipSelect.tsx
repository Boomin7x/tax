import React, { FC } from "react";
import Select from "react-select";
import "./style.css";
import { appRouterContext } from "next/dist/server/route-modules/app-route/shared-modules";

export type IChipSelect = React.ComponentProps<typeof Select> & {
  options: { value: string; label: string }[];
};

const ChipSelect: FC<IChipSelect> = ({ options, ...rest }) => {
  return (
    <Select
      isMulti
      name="colors"
      options={options}
      className="custom-select-container" // Add your custom class name here
      classNamePrefix="custom-select" // Add your custom class prefix here
      styles={{
        indicatorsContainer(base, props) {
          return {
            ...base,
            display: "flex",
            justifyContent: "flex-end",
          };
        },
        container(base, state) {
          return {
            ...base,
            outline: "none",
            boxShadow: "none",
            border: "none",
            borderRadius: "none",
            ":focus": {
              outline: "none",
              border: "none",
            },
          };
        },
        input(base, props) {
          return {
            ...base,
            border: "0",
            outline: "none",
            boxShadow: "none",
            borderRadius: "none",
            ":focus": {
              outline: "none",
              border: "none",
            },
          };
        },
        control(base, props) {
          return {
            ...base,
            height: "55px",
            outline: "none",
            boxShadow: "none",
            borderRadius: "0.3px",
            ":focus": {
              outline: "none",
              border: "none",
            },
            ":focus-visible": {
              outline: "2px solid black", // Ensure the outline is black
              border: "none",
            },
          };
        },
      }}
      {...rest}
    />
  );
};

export default ChipSelect;
