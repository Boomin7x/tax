import React, { FC, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { v4 } from "uuid";
import { IModal } from "../../types";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ILocationPayload, locationSchema } from "../_utils/validation";

import useMessage from "@/hooks/useMessage";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import CustomButton from "@/components/CustomButton";
import TextAreaInput from "@/components/TextAreaInput";
import useCreateLocation from "../_hooks/useCreateLocation";

export type ICreateLocationModal = IModal;
const CreateLocationModal: FC<ICreateLocationModal> = ({ isOpen, onClose }) => {
  const message = useMessage();
  const { mutate, isPending } = useCreateLocation(v4());

  const form = useForm<ILocationPayload>({
    mode: "onChange",
    resolver: yupResolver(locationSchema),
  });

  const onSubmit: SubmitHandler<ILocationPayload> = (inputs) => {
    console.log({ inputs });
    mutate(inputs, {
      onSuccess: () => {
        message({ status: "success", message: "Location created" });
      },
    });
  };

  useEffect(() => {
    form.setValue("type", "location");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[0.3px] ">
        <DialogHeader>
          <DialogTitle>Create location</DialogTitle>
          <DialogDescription>
            Location stores geographical information about where a business
            operates
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 py-5 pb-7 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center gap-5">
              <TextInput
                label="location name"
                isRequired
                placeholder={"e.g : location a"}
                {...form.register("name")}
                error={form.formState.errors?.name}
              />
              <TextInput
                label="address"
                isRequired
                placeholder={"e.g : adress a"}
                {...form.register("address")}
                error={form.formState.errors?.address}
              />
            </div>
            <div className="flex items-center gap-5">
              <TextInput
                label="town"
                isRequired
                placeholder={"e.g : town a"}
                {...form.register("town")}
                error={form.formState.errors?.town}
              />
              <TextInput
                label="city"
                isRequired
                placeholder={"e.g : city a"}
                {...form.register("city")}
                error={form.formState.errors?.city}
              />
            </div>
            <div className="flex items-center gap-5">
              <TextInput
                label="region"
                isRequired
                placeholder={"e.g : region a"}
                {...form.register("region")}
                error={form.formState.errors?.region}
              />
              <TextInput
                label="country"
                isRequired
                placeholder={"e.g : country a"}
                {...form.register("country")}
                error={form.formState.errors?.country}
              />
            </div>
            <div className="flex items-center gap-5">
              <TextInput
                label="prefix"
                isRequired
                placeholder={"e.g : LOC"}
                {...form.register("prefix")}
                error={form.formState.errors?.prefix}
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
                    className="w-full"
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
            </div>

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

export default CreateLocationModal;
