"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { FC, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IModal, ISheet } from "../../types";
import { ITaxationPayload, taxationSchema } from "../_utils/validation";

import CustomButton from "@/components/CustomButton";
import SelectInput from "@/components/SelectInput";
import TextAreaInput from "@/components/TextAreaInput";
import TextInput from "@/components/TextInput";
import useMessage from "@/hooks/useMessage";
import { cn } from "@/lib/utils";
import { isAxiosError } from "axios";
import useGetAllProduct from "../../goods-and-services/_hooks/useGetAllProduct";
import useGetAllLocation from "../../location/_hooks/useGetAllLocation";
import useGetAllTaxtBracket from "../../tax-bracket/_hooks/useGetAllTaxtBracket";
import useGetAllTaxBreak from "../../tax-break/_hooks/useGetAllTaxBreak";
import useCreateTaxation from "../_hooks/useCreateTaxation";
import useUpdateTaxations from "../_hooks/useUpdateTaxations";
import { ITaxations } from "../_utils/types";
import ChipSelect from "./ChipSelect";

export type ICreatetaxModal = IModal;
const CreatetaxModal: React.FC<ISheet<ITaxations>> = ({
  isOpen,
  onClose,
  data,
}) => {
  const newData = data as ITaxations;
  const form = useForm<ITaxationPayload>({
    mode: "onChange",
    resolver: yupResolver(taxationSchema),
  });

  const message = useMessage();
  const userId = useMemo(() => uuidv4(), []);
  const { mutate, isPending } = useCreateTaxation(userId);
  const { mutate: update, isPending: updating } = useUpdateTaxations(
    newData?.uuid,
    userId
  );

  useEffect(() => {
    if (!!newData) {
      newData?.applicableToBrackets?.forEach((items, i) => {
        form.setValue(`applicableToBrackets.${i}`, {
          value: items?.uuid,
          label: "+ " + items?.taxBracketCode,
        });
      });
      newData?.applicableToLocations?.forEach((items, i) => {
        form.setValue(`applicableToLocations.${i}`, {
          value: items?.uuid,
          label: "+ " + items?.name,
        });
      });
      newData?.applicableToBreaks?.forEach((items, i) => {
        form.setValue(`applicableToBreaks.${i}`, {
          value: items?.uuid,
          label: "+ " + items?.name,
        });
      });
      newData?.applicableToProductService?.forEach((items, i) => {
        form.setValue(`applicableToProductServices.${i}`, {
          value: items?.uuid,
          label: "+ " + items?.name,
        });
      });

      form.setValue("description", newData?.description);
      form.setValue("flatRate", newData?.flatRate as number);
      form.setValue("name", newData?.name);
      form.setValue("rateType", newData?.rateType);
      form.setValue("taxRate", newData?.taxRate);
      form.setValue(
        "validityEndDate",
        newData?.validityEndDate
          ? (newData?.validityEndDate.split("T")[0] as unknown as Date)
          : // new Date(newData?.validityEndDate as string)
            ("" as unknown as Date)
      );
      form.setValue(
        "validityStartDate",
        newData?.validityStartDate
          ? (newData?.validityStartDate.split("T")[0] as unknown as Date)
          : // new Date(newData?.validityStartDate as string)
            ("" as unknown as Date)
      );
    }
  }, [isOpen, newData]);

  const [
    applicableToLocationsIncludeOrExclude,
    setApplicableToLocationsIncludeOrExclude,
  ] = useState<boolean>();
  const [
    applicableToBracketsIcludeOrExclude,
    setApplicableToBracketsIcludeOrExclude,
  ] = useState<boolean>();

  const [
    applicableToBreaksIncludeOrExclude,
    setapplicableToBreaksIncludeOrExclude,
  ] = useState<boolean>();

  const [
    applicableToProductServicesIncludesOrExcludes,
    setapplicableToProductServicesInCludesOrExcludes,
  ] = useState<boolean>();

  // const prodOptions =
  //   prodData?.data?.map((item) => ({
  //     value: item.uuid,
  //     label: item.name,
  //   })) ?? [];

  // const locationOptions = locationData?.data?.map((item) => ({
  //   value: item.uuid,
  //   label: item.name,
  // })) ?? [];

  // const bracketOptions = bracketData?.data?.map((item) => ({
  //   value: item.uuid,
  //   label: item.taxBracketCode,
  // })) ?? [];

  // const breakOptions = breakData?.data?.map((item) => ({
  //   value: item.uuid,
  //   label: item.name,
  // })) ?? [];

  // const fakeData = [
  //   { value: "1", label: "Option 1" },
  //   { value: "2", label: "Option 2" },
  //   { value: "3", label: "Option 3" },
  //   { value: "4", label: "Option 4" },
  // ];

  const { data: locationData } = useGetAllLocation({ limit: 100, page: 1 });
  const { data: prodData } = useGetAllProduct({ limit: 100, page: 1 });
  const { data: breakData } = useGetAllTaxBreak({ limit: 100, page: 1 });
  const { data: bracketData } = useGetAllTaxtBracket({ limit: 100, page: 1 });

  const prodOptions =
    prodData?.data?.map((items) => ({
      value: items?.uuid,
      label: `${
        typeof applicableToProductServicesIncludesOrExcludes === "boolean"
          ? applicableToProductServicesIncludesOrExcludes
            ? "+ "
            : "- "
          : ""
      }${items?.name}`,
    })) ?? [];

  const locationOptions =
    locationData?.data?.map((items) => ({
      value: items?.uuid,
      label: `${
        typeof applicableToLocationsIncludeOrExclude === "boolean"
          ? applicableToLocationsIncludeOrExclude
            ? "+ "
            : "- "
          : ""
      }${items?.name}`,
    })) ?? [];

  const bracketOptions =
    bracketData?.data?.map((items) => ({
      value: items?.uuid,
      label: `${
        typeof applicableToBracketsIcludeOrExclude === "boolean"
          ? applicableToBracketsIcludeOrExclude
            ? "+ "
            : "- "
          : ""
      }${items?.taxBracketCode}`,
    })) ?? [];

  const breakOptions =
    breakData?.data?.map((items) => ({
      value: items?.uuid,
      label: `${
        typeof applicableToBreaksIncludeOrExclude === "boolean"
          ? applicableToBreaksIncludeOrExclude
            ? "+ "
            : "- "
          : ""
      }${items?.name}`,
    })) ?? [];

  const onSubmit: SubmitHandler<ITaxationPayload> = (inputs) => {
    const inputData = {
      ...inputs,
      ...(applicableToBracketsIcludeOrExclude === undefined
        ? undefined
        : applicableToBracketsIcludeOrExclude === false
        ? {
            applicableToBrackets: bracketOptions.filter(
              (item1) =>
                !inputs?.applicableToBrackets?.some(
                  (item2) => item2.value === item1.value
                )
            ),
          }
        : { applicableToBrackets: inputs?.applicableToBrackets }),
      ...(applicableToBreaksIncludeOrExclude === undefined
        ? undefined
        : applicableToBreaksIncludeOrExclude === false
        ? {
            applicableToBreaks: breakOptions.filter(
              (item1) =>
                !inputs?.applicableToBreaks?.some(
                  (item2) => item2.value === item1.value
                )
            ),
          }
        : { applicableToBreaks: inputs?.applicableToBreaks }),
      ...(applicableToLocationsIncludeOrExclude === undefined
        ? undefined
        : applicableToLocationsIncludeOrExclude === false
        ? {
            applicableToLocations: locationOptions.filter(
              (item1) =>
                !inputs?.applicableToLocations?.some(
                  (item2) => item2.value === item1.value
                )
            ),
          }
        : { applicableToLocations: inputs?.applicableToLocations }),
      ...(applicableToProductServicesIncludesOrExcludes === undefined
        ? undefined
        : applicableToProductServicesIncludesOrExcludes === false
        ? {
            applicableToProductServices: prodOptions?.filter(
              (item1) =>
                !inputs?.applicableToProductServices?.some(
                  (item2) => item2.value === item1.value
                )
            ),
          }
        : { applicableToProductServices: inputs?.applicableToProductServices }),
    };
    if (!!newData)
      update(inputData as unknown as ITaxationPayload, {
        onSuccess: () => {
          message({ message: "Tax Updated", status: "success" });
          onClose();
        },
        onError: (error) => {
          if (isAxiosError(error))
            message({
              message: error?.response?.data?.message,
              status: "error",
            });
        },
      });
    else
      mutate(inputData as unknown as ITaxationPayload, {
        onSuccess: () => {
          message({ message: "Tax Created", status: "success" });
          onClose();
        },
        onError: (error) => {
          if (isAxiosError(error))
            message({
              message: error?.response?.data?.message,
              status: "error",
            });
        },
      });

    console.log({ inputData });
  };

  console.log({ objectvalues: form.watch() });
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="rounded-[0.3px] min-w-[85vw] ">
        <DialogHeader>
          <DialogTitle>{!!newData ? "Update" : "Create"} Tax </DialogTitle>
          <DialogDescription>
            Taxes records the various types of taxes applicable within the
            system. Each tax entry specifies the tax rate, calculation method,
            and criteria it applies to (e.g., industry, location, tax bracket,
            or exemptions)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid  max-h-[80vh] gap-5 overflow-y-auto">
            <div className="grid grid-cols-4 gap-5 py-5 pb-7 border-r pr-5">
              <TextInput
                label="tax name"
                isRequired
                placeholder={"e.g : tax  a"}
                {...form.register("name")}
                error={form.formState.errors?.name}
              />

              <Controller
                name="rateType"
                control={form.control}
                render={({ field }) => (
                  <SelectInput
                    isRequired
                    label="Rate type"
                    className="w-full"
                    onValueChange={(value) =>
                      form.setValue(
                        "rateType",
                        value as ITaxationPayload["rateType"]
                      )
                    }
                    error={form.formState.errors?.rateType}
                    options={[
                      { inputDisplay: "Percentage", value: "percentage" },
                      { inputDisplay: "Flat", value: "flat" },
                    ]}
                    placeholder={"e.g : select ..."}
                    {...field}
                  />
                )}
              />

              <Controller
                name="taxRate"
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    label="Tax rate"
                    isRequired
                    type="number"
                    placeholder={"e.g : 20.35"}
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      form.setValue("taxRate", value);
                    }}
                    error={form.formState.errors?.taxRate}
                  />
                )}
              />
              <Controller
                name="flatRate"
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    label="Flat rate"
                    isRequired
                    type="number"
                    placeholder={"e.g : 20.35"}
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      form.setValue("flatRate", value);
                    }}
                    error={form.formState.errors?.flatRate}
                  />
                )}
              />

              <TextInput
                label="validity Start Date"
                type="date"
                isRequired
                {...form.register("validityStartDate")}
                error={form.formState.errors?.validityStartDate}
              />
              <TextInput
                label="validity End Date"
                type="date"
                isRequired
                {...form.register("validityEndDate")}
                error={form.formState.errors?.validityEndDate}
              />
              <div className="col-span-2">
                <TextAreaInput
                  label="description"
                  isRequired
                  placeholder={"description here ... "}
                  {...form.register("description")}
                  error={form.formState.errors?.description}
                  className="min-h-[6rem]"
                />
              </div>
              {/* <ComboboxPopover /> */}
            </div>
            <div className="grid grid-cols-4 h-fit gap-5 py-5 pb-7">
              <Controller
                name="applicableToBrackets"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="capitalize font-semibold">
                      Applicable To Brackets
                    </p>
                    <ActionButtons
                      boolean={applicableToBracketsIcludeOrExclude}
                      setBoolean={setApplicableToBracketsIcludeOrExclude}
                    />
                    <ChipSelect
                      {...field}
                      error={
                        form?.formState?.errors?.applicableToBrackets?.message
                      }
                      options={bracketOptions}
                      className="rounded-none"
                      isDisabled={
                        applicableToBracketsIcludeOrExclude === undefined
                      }
                    />
                    <p className="text-sm text-red-600">
                      {form?.formState?.errors?.applicableToBrackets?.message}
                    </p>
                  </div>
                )}
              />
              <Controller
                name="applicableToLocations"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="capitalize font-semibold">
                      Applicable To Locations
                    </p>
                    <ActionButtons
                      boolean={applicableToLocationsIncludeOrExclude}
                      setBoolean={setApplicableToLocationsIncludeOrExclude}
                    />
                    <ChipSelect
                      {...field}
                      error={
                        form?.formState?.errors?.applicableToLocations?.message
                      }
                      options={locationOptions}
                      className="rounded-none"
                      isDisabled={
                        applicableToLocationsIncludeOrExclude === undefined
                      }
                    />
                    <p className="text-sm text-red-600">
                      {form?.formState?.errors?.applicableToLocations?.message}
                    </p>
                  </div>
                )}
              />
              <Controller
                name="applicableToBreaks"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="capitalize font-semibold">
                      Applicable To Breaks
                    </p>
                    <ActionButtons
                      boolean={applicableToBreaksIncludeOrExclude}
                      setBoolean={setapplicableToBreaksIncludeOrExclude}
                    />
                    <ChipSelect
                      {...field}
                      error={
                        form?.formState?.errors?.applicableToBreaks?.message
                      }
                      options={breakOptions}
                      className="rounded-none"
                      isDisabled={
                        applicableToBreaksIncludeOrExclude === undefined
                      }
                    />
                    <p className="text-sm text-red-600">
                      {form?.formState?.errors?.applicableToBreaks?.message}
                    </p>
                  </div>
                )}
              />
              <Controller
                name="applicableToProductServices"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <p className="capitalize font-semibold">
                      Applicable To Products
                    </p>
                    <ActionButtons
                      boolean={applicableToProductServicesIncludesOrExcludes}
                      setBoolean={
                        setapplicableToProductServicesInCludesOrExcludes
                      }
                    />
                    <ChipSelect
                      {...field}
                      error={
                        form?.formState?.errors?.applicableToProductServices
                          ?.message
                      }
                      options={prodOptions}
                      className="rounded-none"
                      isDisabled={
                        applicableToProductServicesIncludesOrExcludes ===
                        undefined
                      }
                    />
                    <p className="text-sm text-red-600">
                      {
                        form?.formState?.errors?.applicableToProductServices
                          ?.message
                      }
                    </p>
                  </div>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <CustomButton
              // disabled={!form.formState.isValid}
              type="submit"
              isLoading={isPending || updating}
            >
              {!!newData ? "Update" : "Create"}
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface IActionButtons {
  setBoolean: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  boolean?: boolean;
}
const ActionButtons: FC<IActionButtons> = ({ setBoolean, boolean }) => {
  return (
    <div className="flex items-center gap-3 ">
      <button
        type="button"
        onClick={() => setBoolean(true)}
        className={cn(
          "flex border px-3 w-fit bg-green-100",
          typeof boolean === "boolean" &&
            boolean &&
            "border-green-600 cursor-pointer  bg-green-600 text-white font-bold"
        )}
      >
        Include
      </button>
      <button
        type="button"
        onClick={() => setBoolean(false)}
        className={cn(
          "flex border px-3 w-fit bg-red-100",
          typeof boolean === "boolean" &&
            !boolean &&
            "border-red-600 cursor-pointer bg-red-600 text-white font-bold"
        )}
      >
        Exclude
      </button>
    </div>
  );
};

// interface ISelectActions {
//   onInclude: () => void;
//   onExclude: () => void;
//   onAppend: () => void;
//   includeOrExclude?: boolean;
// }
// const SelectActions: FC<ISelectActions> = ({
//   onAppend = () => {},
//   onExclude = () => {},
//   onInclude = () => {},
//   includeOrExclude,
// }) => {
//   return (
//     <div className="flex text-xs gap-1 capitalize">
//       <div
//         className={cn(
//           "border p-1 px-2 bg-blue-100 cursor-pointer",
//           includeOrExclude === true && "bg-blue-600 text-white"
//         )}
//         onClick={onInclude}
//       >
//         include
//       </div>
//       <div
//         className={cn(
//           "border p-1 px-2 bg-red-100 cursor-pointer",
//           includeOrExclude === false && "bg-red-600 text-white"
//         )}
//         onClick={onExclude}
//       >
//         exclude
//       </div>
//       <Separator orientation="vertical" className="h-5" />
//       <div
//         className="border p-1 px-2 bg-neutral-800 text-white cursor-pointer"
//         onClick={onAppend}
//       >
//         {" "}
//         + field
//       </div>
//     </div>
//   );
// };

export default CreatetaxModal;
