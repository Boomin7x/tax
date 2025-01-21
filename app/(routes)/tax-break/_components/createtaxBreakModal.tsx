import CustomButton from "@/components/CustomButton";
import SelectInput from "@/components/SelectInput";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMessage from "@/hooks/useMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { ISheet } from "../../types";
import useCreateTaxBreak from "../_hooks/useCreateTaxBreak";
import { ITaxBreak } from "../_utils/type";
import { ITaxBreakPayload, taxBreakSchema } from "../_utils/validation";

const CreatetaxBreakModal: React.FC<ISheet<ITaxBreak>> = ({
  isOpen,
  onClose,
  data,
}) => {
  const newData = data as ITaxBreak;
  const form = useForm<ITaxBreakPayload>({
    mode: "onChange",
    resolver: yupResolver(taxBreakSchema),
  });

  const message = useMessage();
  const { mutate, isPending } = useCreateTaxBreak(v4());
  const onSubmit: SubmitHandler<ITaxBreakPayload> = (inputs) => {
    console.log({ inputs });
    mutate(inputs, {
      onSuccess: () => {
        message({ message: "tax break created", status: "success" });
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
    form.setValue("type", "exemption");
  }, [open]);

  useEffect(() => {
    if (!!newData) {
      form.setValue(
        "applicableTo",
        newData?.applicableTo as ITaxBreakPayload["applicableTo"]
      );
      form.setValue("documentRequired", newData?.documentRequired);
      form.setValue("eligilityCriteria", newData?.eligilityCriteria);
      form.setValue("name", newData?.name);
    }
  }, [newData, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[0.3px] ">
        <DialogHeader>
          <DialogTitle>
            {!!newData ? "Update" : "Create"} Tax Breaks
          </DialogTitle>
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
              label="tax break name"
              isRequired
              placeholder={"e.g : tax break a"}
              {...form.register("name")}
              error={form.formState.errors?.name}
            />
            <TextInput
              label="document required"
              isRequired
              placeholder={"e.g : Income Tax Declaration"}
              {...form.register("documentRequired")}
              error={form.formState.errors?.documentRequired}
            />

            <TextInput
              label="eligilityCriteria"
              isRequired
              placeholder={"e.g : above 40k"}
              {...form.register("eligilityCriteria")}
              error={form.formState.errors?.eligilityCriteria}
            />

            <Controller
              name="applicableTo"
              control={form.control}
              render={({ field }) => (
                <SelectInput
                  isRequired
                  label="applicable To"
                  onBlur={field.onBlur}
                  error={form.formState.errors?.applicableTo}
                  className="w-full"
                  onValueChange={(value) =>
                    form.setValue(
                      "applicableTo",
                      value as ITaxBreakPayload["applicableTo"]
                    )
                  }
                  options={[
                    { inputDisplay: "corporate", value: "corporate" },
                    { inputDisplay: "personal", value: "personal" },
                  ]}
                  placeholder={"e.g : select ..."}
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button variant="outline">Close</Button>
            <CustomButton type="submit" isLoading={isPending}>
              {!!newData ? "Update" : "Create"}
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatetaxBreakModal;
