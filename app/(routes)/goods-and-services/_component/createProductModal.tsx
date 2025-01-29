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

import CustomButton from "@/components/CustomButton";
import SelectInput from "@/components/SelectInput";
import TextAreaInput from "@/components/TextAreaInput";
import TextInput from "@/components/TextInput";
import useMessage from "@/hooks/useMessage";
import useCreateProduct from "../_hooks/useCreateProduct";

import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import useGetAllIndustry from "../../industry/_hooks/useGetAllIndustry";
import { IIndustry } from "../../industry/_utils/types";
import { ISheet } from "../../types";
import useUpdateProduct from "../_hooks/useUpdateProduct";
import { IProduct } from "../_utils/types";
import { IProductPayload, productSchema } from "../_utils/validation";

const CreateProductModal: React.FC<ISheet<IProduct>> = ({
  isOpen,
  onClose,
  data,
}) => {
  const newData = data as IProduct;
  const form = useForm<IProductPayload>({
    mode: "onChange",
    resolver: yupResolver(productSchema),
  });

  const message = useMessage();
  const userId = useMemo(() => v4(), []);
  const { data: industry } = useGetAllIndustry({ limit: 100, page: 1 });
  const { mutate, isPending } = useCreateProduct(userId);
  const { mutate: updateFn, isPending: isUpdating } = useUpdateProduct(
    newData?.uuid,
    userId
  );

  const onSubmit: SubmitHandler<IProductPayload> = (inputs) => {
    console.log({ inputs });
    if (!!newData)
      updateFn(inputs, {
        onSuccess: () => {
          onClose();
          message({ message: "product updated", status: "success" });
        },
        onError: (error) => {
          if (isAxiosError(error))
            message({
              message: error?.response?.data?.message,
              status: "error",
            });
          else
            message({
              message: "an error occured",
              status: "error",
            });
        },
      });
    else
      mutate(inputs, {
        onSuccess: () => {
          onClose();
          message({ message: "product created", status: "success" });
        },
        onError: (error) => {
          if (isAxiosError(error))
            message({
              message: error?.response?.data?.message ?? "an error occured",
              status: "error",
            });
          else
            message({
              message: "an error occured",
              status: "error",
            });
        },
      });
  };

  const industryData = industry?.data as IIndustry[];

  const industryOptions = !!industryData
    ? industryData?.map((items) => ({
        inputDisplay: items?.name,
        value: items?.uuid,
      }))
    : [];

  useEffect(() => {
    form.setValue("type", "product");
  }, [isOpen]);

  useEffect(() => {
    if (!!newData) {
      form.setValue("description", newData?.description);
      form.setValue("industryId", newData?.industry?.uuid);
      form.setValue(
        "isTaxable",
        String(newData?.isTaxable) as IProductPayload["isTaxable"]
      );
      form.setValue("name", newData?.name);
    }
  }, [isOpen, newData, industryData]);

  console.log({ data: form.watch(), newData });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[0.3px]">
        <DialogHeader>
          <DialogTitle>
            {!!newData ? "Update" : "Create"} Goods/Services
          </DialogTitle>
          <DialogDescription>
            Goods/Services catalogs the products or services offered by
            businesses. Each entry is linked to a specific Industry for
            classification purposes
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 py-5 pb-7">
            <TextInput
              label="Goods/Services name"
              isRequired
              placeholder={"e.g : product a"}
              {...form.register("name")}
              error={form.formState.errors?.name}
            />
            <Controller
              name="isTaxable"
              control={form.control}
              render={({ field }) => (
                <SelectInput
                  isRequired
                  label="is taxable"
                  error={form.formState.errors?.isTaxable}
                  options={[
                    { inputDisplay: "TRUE", value: "true" },
                    { inputDisplay: "FALSE", value: "false" },
                  ]}
                  onValueChange={(value) =>
                    form.setValue(
                      "isTaxable",
                      value as IProductPayload["isTaxable"]
                    )
                  }
                  placeholder={"e.g : select ..."}
                  {...field}
                  defaultValue={form.getValues("isTaxable")}
                />
              )}
            />
            <Controller
              name="industryId"
              control={form.control}
              render={({ field }) => (
                <SelectInput
                  isRequired
                  label="Industry"
                  {...field}
                  error={form.formState.errors?.industryId}
                  onValueChange={(value) => form.setValue("industryId", value)}
                  options={industryOptions}
                  placeholder={"e.g : select ..."}
                  defaultValue={form.getValues("industryId")}
                />
              )}
            />

            <TextAreaInput
              isRequired
              label="description"
              {...form.register("description")}
              error={form.formState.errors?.description}
              placeholder={"e.g : product a is a product by ..."}
            />
          </div>
          <DialogFooter>
            <Button variant="outline">Close</Button>
            <CustomButton type="submit" isLoading={isPending || isUpdating}>
              {!!newData ? "Update" : "Create"}
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
