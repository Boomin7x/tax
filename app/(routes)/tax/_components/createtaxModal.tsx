"use client";
import React, { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { v4 as uuidv4, v4 } from "uuid";
import { IModal, ISheet } from "../../types";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { ITaxationPayload, taxationSchema } from "../_utils/validation";

import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import CustomButton from "@/components/CustomButton";
import useCreateTaxation from "../_hooks/useCreateTaxation";
import useMessage from "@/hooks/useMessage";
import TextAreaInput from "@/components/TextAreaInput";
import { isAxiosError } from "axios";
import { ITaxations } from "../_utils/types";
import useUpdateTaxations from "../_hooks/useUpdateTaxations";
import { ComboboxPopover } from "@/components/Combobox";
import { Divide, MinusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  const onSubmit: SubmitHandler<ITaxationPayload> = (inputs) => {
    if (!!newData)
      update(inputs, {
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
      mutate(inputs, {
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
    // append: locationsAppend,
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

  const {
    fields: applicableToBreaks,
    // append: locationsAppend,
    remove: breaksRemove,
  } = useFieldArray<ITaxationPayload>({
    control: form.control,
    name: "applicableToLocations",
  });

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
          <div className="grid grid-cols-2 max-h-[80vh] gap-5 overflow-y-auto">
            <div className="grid grid-cols-2 gap-5 py-5 pb-7 border-r pr-5">
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
                    {...field}
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
            <div className="grid grid-cols-2 h-fit gap-5 py-5 pb-7">
              {locationFields.map((_, i) => (
                <div key={v4()} className="flex items-end gap-2">
                  <TextInput
                    actions={<SelectActions />}
                    label="applicable To Locations"
                    isRequired
                    placeholder={"applicable To Locations here ... "}
                    {...form.register(`applicableToLocations.${i}.uuid`)}
                    error={
                      form.formState.errors?.applicableToLocations?.[i]?.uuid
                    }
                  />
                  {i > 0 ? (
                    <Button
                      onClick={() => locationRemove()}
                      size="icon"
                      className="h-10 w-10 "
                    >
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                  ) : null}
                </div>
              ))}
              {bracketFields.map((_, i) => (
                <div key={v4()} className="flex items-end gap-2">
                  <TextInput
                    actions
                    label="applicable To Brackets"
                    isRequired
                    placeholder={"applicable To Brackets here ... "}
                    {...form.register(`applicableToBrackets.${i}.uuid`)}
                    error={
                      form.formState.errors?.applicableToBrackets?.[i]?.uuid
                    }
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
              {productFields?.map((_, i) => (
                <div key={v4()} className="flex items-end gap-2">
                  <TextInput
                    label="applicable To Product / Service"
                    isRequired
                    placeholder={"applicable To Product / Service here ... "}
                    {...form.register(`applicableToProductServices.${i}.uuid`)}
                    error={
                      form.formState.errors?.applicableToProductServices?.[i]
                        ?.uuid
                    }
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
              {applicableToBreaks?.map((_, i) => (
                <div key={v4()} className="flex items-end gap-2">
                  <TextInput
                    key={v4()}
                    label="applicable To applicable To Breaks"
                    isRequired
                    placeholder={"applicable To applicable To Breaks here ... "}
                    {...form.register(`applicableToBreaks.${i}.uuid`)}
                    error={form.formState.errors?.applicableToBreaks?.[i]?.uuid}
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

const SelectActions = () => {
  return (
    <div className="flex text-xs gap-1 capitalize">
      <div className="border p-1 px-2 bg-blue-100">include</div>
      <div className="border p-1 px-2 bg-red-100">exclude</div>
      <Separator orientation="vertical" className="h-5" />
      <div className="border p-1 px-2 bg-neutral-800 text-white"> + field</div>
    </div>
  );
};

export default CreatetaxModal;
