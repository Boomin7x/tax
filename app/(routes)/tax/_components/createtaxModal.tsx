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
import { v4 as uuidv4, v4 } from "uuid";
import { IModal, ISheet } from "../../types";
import { ITaxationPayload, taxationSchema } from "../_utils/validation";

import CustomButton from "@/components/CustomButton";
import SelectInput from "@/components/SelectInput";
import TextAreaInput from "@/components/TextAreaInput";
import TextInput from "@/components/TextInput";
import { Separator } from "@/components/ui/separator";
import useMessage from "@/hooks/useMessage";
import { cn } from "@/lib/utils";
import { isAxiosError } from "axios";
import { MinusIcon } from "lucide-react";
import useGetAllProduct from "../../goods-and-services/_hooks/useGetAllProduct";
import useGetAllLocation from "../../location/_hooks/useGetAllLocation";
import useGetAllTaxtBracket from "../../tax-bracket/_hooks/useGetAllTaxtBracket";
import useGetAllTaxBreak from "../../tax-break/_hooks/useGetAllTaxBreak";
import useCreateTaxation from "../_hooks/useCreateTaxation";
import useUpdateTaxations from "../_hooks/useUpdateTaxations";
import { ITaxations } from "../_utils/types";

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
    defaultValues: {
      applicableToLocations: [{ uuid: "" }],
      applicableToBrackets: [{ uuid: "" }],
      applicableToProductServices: [{ uuid: "" }],
      applicableToBreaks: [{ uuid: "" }],
    },
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
        form.setValue(`applicableToBrackets.${i}.uuid`, items?.uuid);
      });
      newData?.applicableToLocations?.forEach((items, i) => {
        form.setValue(`applicableToLocations.${i}.uuid`, items?.uuid);
      });
      newData?.applicableToBreaks?.forEach((items, i) => {
        form.setValue(`applicableToBreaks.${i}.uuid`, items?.uuid);
      });
      newData?.applicableToProductService?.forEach((items, i) => {
        form.setValue(`applicableToProductServices.${i}.uuid`, items?.uuid);
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

  console.log({
    error: form.formState.errors,
    valid: form.formState.isValid,
    newData,
    data: form.watch(),
    date: new Date(newData?.validityEndDate as string),
  });

  const {
    fields: locationFields,
    append: locationsAppend,
    remove: locationRemove,
  } = useFieldArray<ITaxationPayload>({
    control: form.control,
    name: "applicableToLocations",
  });

  const {
    fields: bracketFields,
    append: bracketAppend,
    remove: bracketRemove,
  } = useFieldArray<ITaxationPayload>({
    control: form.control,
    name: "applicableToBrackets" as never,
  });

  const {
    fields: productFields,
    append: productAppend,
    remove: productRemove,
  } = useFieldArray<ITaxationPayload>({
    control: form.control,
    name: "applicableToProductServices" as never,
  });

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

  const {
    fields: applicableToBreaks,
    append: breakAppend,
    remove: breaksRemove,
  } = useFieldArray<ITaxationPayload>({
    control: form.control,
    name: "applicableToLocations",
  });

  const { data: locationData } = useGetAllLocation({ page: 1, limit: 100 });
  const { data: bracketData } = useGetAllTaxtBracket({ page: 1, limit: 100 });
  const { data: breakData } = useGetAllTaxBreak({ page: 1, limit: 100 });
  const { data: prodData } = useGetAllProduct({ page: 1, limit: 100 });

  const locationOptions =
    locationData?.data?.map((items) => ({
      inputDisplay: items?.name,
      value: items?.uuid,
    })) ?? [];

  const bracketOptions =
    bracketData?.data?.map((items) => ({
      inputDisplay: items?.taxBracketCode,
      value: items?.uuid,
    })) ?? [];

  const breakOptions =
    breakData?.data?.map((items) => ({
      inputDisplay: items?.name,
      value: items?.uuid,
    })) ?? [];

  const prodOptions =
    prodData?.data?.map((items) => ({
      inputDisplay: items?.name,
      value: items?.uuid,
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
                  (item2) => item2.uuid === item1.value
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
                  (item2) => item2.uuid === item1.value
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
                  (item2) => item2.uuid === item1.value
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
                  (item2) => item2.uuid === item1.value
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
  };
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
              <div className="flex flex-col gap-3">
                <SelectActions
                  onAppend={() => locationsAppend({ uuid: "" })}
                  onExclude={() => {
                    setApplicableToLocationsIncludeOrExclude(false);
                  }}
                  onInclude={() =>
                    setApplicableToLocationsIncludeOrExclude(true)
                  }
                  includeOrExclude={applicableToLocationsIncludeOrExclude}
                />
                {locationFields.map((_, i) => (
                  <div key={v4()} className="flex items-end gap-2">
                    <Controller
                      name={`applicableToLocations.${i}.uuid`}
                      control={form.control}
                      render={({ field }) => (
                        <SelectInput
                          label={"applicable To Locations " + (1 + i)}
                          isRequired
                          disabled={
                            applicableToLocationsIncludeOrExclude === undefined
                          }
                          onValueChange={(value) =>
                            form.setValue(
                              `applicableToLocations.${i}.uuid`,
                              value
                            )
                          }
                          placeholder={"applicable To Locations here ... "}
                          error={
                            form.formState.errors?.applicableToLocations?.[i]
                              ?.uuid
                          }
                          defaultValue={form.getValues(
                            `applicableToLocations.${i}.uuid`
                          )}
                          options={locationOptions}
                          {...field}
                        />
                      )}
                    />
                    {i > 0 ? (
                      <Button
                        onClick={() => locationRemove(i)}
                        size="icon"
                        className="h-10 w-10 "
                      >
                        <MinusIcon className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <SelectActions
                  onAppend={() => bracketAppend({ uuid: "" })}
                  onExclude={() => {
                    setApplicableToBracketsIcludeOrExclude(false);
                  }}
                  onInclude={() => setApplicableToBracketsIcludeOrExclude(true)}
                  includeOrExclude={applicableToBracketsIcludeOrExclude}
                />
                {bracketFields.map((_, i) => (
                  <div key={v4()} className="flex items-end gap-2">
                    <Controller
                      name={`applicableToBrackets.${i}.uuid`}
                      control={form.control}
                      render={({ field }) => (
                        <SelectInput
                          onValueChange={(value) =>
                            form.setValue(
                              `applicableToBrackets.${i}.uuid`,
                              value
                            )
                          }
                          defaultValue={form.getValues(
                            `applicableToBrackets.${i}.uuid`
                          )}
                          label={"applicable To Brackets " + (1 + i)}
                          isRequired
                          disabled={
                            applicableToBracketsIcludeOrExclude === undefined
                          }
                          placeholder={"applicable To Brackets here ... "}
                          error={
                            form.formState.errors?.applicableToBrackets?.[i]
                              ?.uuid
                          }
                          options={bracketOptions}
                          {...field}
                        />
                      )}
                    />
                    {i > 0 ? (
                      <Button
                        onClick={() => bracketRemove(i)}
                        size="icon"
                        className="h-10 w-10 "
                      >
                        <MinusIcon className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <SelectActions
                  onAppend={() => productAppend({ uuid: "" })}
                  onExclude={() => {
                    setapplicableToProductServicesInCludesOrExcludes(false);
                  }}
                  onInclude={() =>
                    setapplicableToProductServicesInCludesOrExcludes(true)
                  }
                  includeOrExclude={
                    applicableToProductServicesIncludesOrExcludes
                  }
                />
                {productFields?.map((_, i) => (
                  <div key={v4()} className="flex items-end gap-2">
                    <Controller
                      name={`applicableToProductServices.${i}.uuid`}
                      control={form.control}
                      render={({ field }) => (
                        <SelectInput
                          label={"applicable To Product / Service  " + (1 + i)}
                          isRequired
                          disabled={
                            applicableToProductServicesIncludesOrExcludes ===
                            undefined
                          }
                          options={prodOptions}
                          placeholder={
                            "applicable To Product / Service here ... "
                          }
                          onValueChange={(value) =>
                            form.setValue(
                              `applicableToProductServices.${i}.uuid`,
                              value
                            )
                          }
                          error={
                            form.formState.errors
                              ?.applicableToProductServices?.[i]?.uuid
                          }
                          {...field}
                        />
                      )}
                    />
                    {i > 0 ? (
                      <Button
                        onClick={() => productRemove(i)}
                        size="icon"
                        className="h-10 w-10 "
                      >
                        <MinusIcon className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <SelectActions
                  onAppend={() => breakAppend({ uuid: "" })}
                  onExclude={() => {
                    setapplicableToBreaksIncludeOrExclude(false);
                  }}
                  onInclude={() => setapplicableToBreaksIncludeOrExclude(true)}
                  includeOrExclude={applicableToBreaksIncludeOrExclude}
                />
                {applicableToBreaks?.map((_, i) => (
                  <div key={v4()} className={"flex items-end gap-2 "}>
                    <Controller
                      name={`applicableToBreaks.${i}.uuid`}
                      control={form.control}
                      render={({ field }) => (
                        <SelectInput
                          key={v4()}
                          label={
                            "applicable To applicable To Breaks " + (1 + i)
                          }
                          isRequired
                          disabled={
                            applicableToBreaksIncludeOrExclude === undefined
                          }
                          onValueChange={(value) =>
                            form.setValue(`applicableToBreaks.${i}.uuid`, value)
                          }
                          placeholder={
                            "applicable To applicable To Breaks here ... "
                          }
                          error={
                            form.formState.errors?.applicableToBreaks?.[i]?.uuid
                          }
                          options={breakOptions}
                          {...field}
                        />
                      )}
                    />
                    {i > 0 ? (
                      <Button
                        onClick={() => {
                          breaksRemove(i);
                        }}
                        size="icon"
                        className="h-10 w-10 "
                      >
                        <MinusIcon className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
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

interface ISelectActions {
  onInclude: () => void;
  onExclude: () => void;
  onAppend: () => void;
  includeOrExclude?: boolean;
}
const SelectActions: FC<ISelectActions> = ({
  onAppend = () => {},
  onExclude = () => {},
  onInclude = () => {},
  includeOrExclude,
}) => {
  return (
    <div className="flex text-xs gap-1 capitalize">
      <div
        className={cn(
          "border p-1 px-2 bg-blue-100 cursor-pointer",
          includeOrExclude === true && "bg-blue-600 text-white"
        )}
        onClick={onInclude}
      >
        include
      </div>
      <div
        className={cn(
          "border p-1 px-2 bg-red-100 cursor-pointer",
          includeOrExclude === false && "bg-red-600 text-white"
        )}
        onClick={onExclude}
      >
        exclude
      </div>
      <Separator orientation="vertical" className="h-5" />
      <div
        className="border p-1 px-2 bg-neutral-800 text-white cursor-pointer"
        onClick={onAppend}
      >
        {" "}
        + field
      </div>
    </div>
  );
};

export default CreatetaxModal;
