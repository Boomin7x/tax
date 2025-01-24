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

import { v4 as uuidv4 } from "uuid";
import { IModal, ISheet } from "../../types";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
      form.setValue("applicableToBrackets", newData?.applicableToBrackets);
      form.setValue("applicableToBreaks", newData?.applicableToBreaks);
      form.setValue("applicableToLocations", newData?.applicableToLocations);
      form.setValue(
        "applicableToProductService",
        newData?.applicableToProductService
      );
      form.setValue("description", newData?.description);
      form.setValue("flatRate", newData?.flatRate as number);
      form.setValue("name", newData?.name);
      form.setValue("rateType", newData?.rateType);
      form.setValue("taxRate", newData?.taxRate);
      form.setValue(
        "validityEndDate",
        newData?.validityEndDate
          ? new Date(newData?.validityEndDate as string)
          : ("" as unknown as Date)
      );
      form.setValue(
        "validityStartDate",
        newData?.validityStartDate
          ? new Date(newData?.validityStartDate as string)
          : ("" as unknown as Date)
      );
    }
  }, [isOpen, newData]);

  console.log({ error: form.formState.errors, valid: form.formState.isValid });

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="rounded-[0.3px] min-w-[50vw] ">
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
          <div className="grid grid-cols-2 gap-5 py-5 pb-7 max-h-[80vh] overflow-y-auto">
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
                  onBlur={field.onBlur}
                  error={form.formState.errors?.rateType}
                  className="w-full"
                  onValueChange={(value) =>
                    form.setValue(
                      "rateType",
                      value as ITaxationPayload["rateType"]
                    )
                  }
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
              label="applicable To Locations"
              isRequired
              placeholder={"applicable To Locations here ... "}
              {...form.register("applicableToLocations")}
              error={form.formState.errors?.applicableToLocations}
            />
            <TextInput
              label="applicable To Brackets"
              isRequired
              placeholder={"applicable To Brackets here ... "}
              {...form.register("applicableToBrackets")}
              error={form.formState.errors?.applicableToBrackets}
            />
            <TextInput
              label="applicable To Product / Service"
              isRequired
              placeholder={"applicable To Product / Service here ... "}
              {...form.register("applicableToProductService")}
              error={form.formState.errors?.applicableToProductService}
            />
            <TextInput
              label="applicable To applicable To Breaks"
              isRequired
              placeholder={"applicable To applicable To Breaks here ... "}
              {...form.register("applicableToBreaks")}
              error={form.formState.errors?.applicableToBreaks}
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

export default CreatetaxModal;
