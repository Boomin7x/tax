"use client";
import React from "react";

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
import { IModal } from "../../types";
import { IProductPayload, productSchema } from "../_utils/validation";

export type ICreateProductModal = IModal;
const CreateProductModal: React.FC<ICreateProductModal> = ({
  isOpen,
  onClose,
}) => {
  const form = useForm<IProductPayload>({
    mode: "onChange",
    resolver: yupResolver(productSchema),
  });

  const message = useMessage();
  //   const { data: industry } = useGetAllIndustry({ limit: 100, page: 1 });
  const { mutate, isPending } = useCreateProduct(v4());

  //   console.log({ industry });

  const onSubmit: SubmitHandler<IProductPayload> = (inputs) => {
    console.log({ inputs });
    mutate(inputs, {
      onSuccess: () => {
        onClose();
        message({ message: "product created", status: "success" });
      },
      onError: (error) => {
        if (isAxiosError(error))
          message({ message: error?.response?.data?.message, status: "error" });
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[0.3px]">
        <DialogHeader>
          <DialogTitle>Create Goods/Services</DialogTitle>
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
                  onBlur={field.onBlur}
                  error={form.formState.errors?.isTaxable}
                  onValueChange={(value) =>
                    form.setValue("isTaxable", value === "true")
                  }
                  options={[
                    { inputDisplay: "TRUE", value: "true" },
                    { inputDisplay: "FALSE", value: "false" },
                  ]}
                  placeholder={"e.g : select ..."}
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
                  onBlur={field.onBlur}
                  error={form.formState.errors?.industryId}
                  onValueChange={(value) => form.setValue("industryId", value)}
                  options={[]}
                  placeholder={"e.g : select ..."}
                />
              )}
            />
            <Controller
              name="type"
              control={form.control}
              render={({ field }) => (
                <SelectInput
                  isRequired
                  label="Type"
                  onBlur={field.onBlur}
                  error={form.formState.errors?.type}
                  onValueChange={(value) =>
                    form.setValue(
                      "type",
                      value as "exemption" | "non-exemption"
                    )
                  }
                  options={[]}
                  placeholder={"e.g : select ..."}
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
            <CustomButton type="submit" isLoading={isPending}>
              Create
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
