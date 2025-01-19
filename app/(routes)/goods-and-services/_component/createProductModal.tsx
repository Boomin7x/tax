import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { IModal } from "../../types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProductPayload, productSchema } from "../_utils/validation";
import CustomButton from "@/components/CustomButton";
import { Button } from "@/components/ui/button";
import useMessage from "@/hooks/useMessage";
import useCreateProduct from "../_hooks/useCreateProduct";
import { v4 } from "uuid";
import TextInput from "@/components/TextInput";
import TextAreaInput from "@/components/TextAreaInput";
import SelectInput from "@/components/SelectInput";
import useGetAllIndustry from "../../industry/_hooks/useGetAllIndustry";

export type ICreateProductModal = IModal;
const CreateProductModal: React.FC<ICreateProductModal> = ({
  isOpen,
  onClose,
}) => {
  const message = useMessage();
  const form = useForm<IProductPayload>({
    mode: "onChange",
    resolver: yupResolver(productSchema),
  });

  const { data: industry } = useGetAllIndustry({ limit: 30, page: 1 });
  const { mutate, isPending } = useCreateProduct(v4());

  console.log({ industry });

  const onSubmit: SubmitHandler<IProductPayload> = (inputs) => {
    console.log({ inputs });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[0.3px]">
        <DialogHeader>
          <DialogTitle>Create industry</DialogTitle>
          <DialogDescription>
            The Industry represents sector of economic activity. Each industry
            is assigned a unique code that plays a role in determining
            applicable taxes when combined with other codes such as location and
            exemptions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 py-5 pb-7">
            <TextInput
              label="product name"
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
                  onValueChange={(value) =>
                    form.setValue("isTaxable", value === "true")
                  }
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
                    form.setValue("isTaxable", value === "true")
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
