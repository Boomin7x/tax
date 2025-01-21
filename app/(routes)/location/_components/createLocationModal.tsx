import React, { FC, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { v4 } from "uuid";
import { IModal, ISheet } from "../../types";
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
import { isAxiosError } from "axios";
import { ILocation } from "../_utils/types";
import useUpdateLocation from "../_hooks/useUpdateLocation";

const CreateLocationModal: FC<ISheet<ILocation>> = ({
  isOpen,
  onClose,
  data,
}) => {
  const userId = useMemo(() => v4(), []);
  const newData = data as ILocation;
  const message = useMessage();
  const { mutate: updateFn, isPending: isUpdating } = useUpdateLocation(
    newData?.uuid,
    userId
  );
  const { mutate, isPending } = useCreateLocation(userId);

  const form = useForm<ILocationPayload>({
    mode: "onChange",
    resolver: yupResolver(locationSchema),
  });

  const onSubmit: SubmitHandler<ILocationPayload> = (inputs) => {
    console.log({ inputs });

    if (!!newData)
      updateFn(inputs, {
        onSuccess: () => {
          message({ status: "success", message: "Location updated" });
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
          message({ status: "success", message: "Location created" });
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
    form.setValue("type", "location");
  }, [isOpen]);

  useEffect(() => {
    if (!!newData) {
      form.setValue("address", newData?.address);
      form.setValue("city", newData?.city);
      form.setValue("country", newData?.country);
      form.setValue("description", newData?.description);
      form.setValue("name", newData?.name);
      //  form.setValue("prefix", newData?.prefix);
      form.setValue("region", newData?.region);
      form.setValue("town", newData?.town);
    }
  }, [newData, isOpen]);

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
              Create
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLocationModal;
