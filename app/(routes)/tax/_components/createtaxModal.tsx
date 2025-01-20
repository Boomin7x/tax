"use client";
import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { v4 as uuidv4 } from "uuid";
import { IModal } from "../../types";
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

export type ICreatetaxModal = IModal;
const CreatetaxModal: React.FC<ICreatetaxModal> = ({ isOpen, onClose }) => {
  const form = useForm<ITaxationPayload>({
    mode: "onChange",
    resolver: yupResolver(taxationSchema),
  });

  const message = useMessage();
  const userId = useMemo(() => uuidv4(), []);
  const { mutate, isPending } = useCreateTaxation(userId);
  const onSubmit: SubmitHandler<ITaxationPayload> = (inputs) => {
    console.log({ inputs });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="rounded-[0.3px] ">
        <DialogHeader>
          <DialogTitle>Create Tax Breaks</DialogTitle>
          <DialogDescription>
            Exemptions/Reductions captures details about specific tax benefits,
            such as exemptions, reductions, or breaks. These may be granted to
            businesses based on industry, location, or qualifying conditions
            (e.g., startups, certifications)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 py-5 pb-7 max-h-[80vh] overflow-y-auto">
            <TextInput
              label="tax name"
              isRequired
              placeholder={"e.g : tax  a"}
              {...form.register("name")}
              error={form.formState.errors?.name}
            />
            <TextAreaInput
              label="description"
              isRequired
              placeholder={"description here ... "}
              {...form.register("description")}
              error={form.formState.errors?.description}
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
              name="flateRate"
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
                    form.setValue("flateRate", value);
                  }}
                  error={form.formState.errors?.flateRate}
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
          </div>
          <DialogFooter>
            <Button variant="outline">Close</Button>
            <CustomButton type="submit" isLoading={isPending}>
              Create
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatetaxModal;
