import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import useMessage from "@/hooks/useMessage";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import CustomButton from "@/components/CustomButton";
import TextAreaInput from "@/components/TextAreaInput";
import useCreateIndustry from "../_hooks/useCreateIndustry";

import { v4 } from "uuid";
import { FC } from "react";
import { isAxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IIndustryPayload, industrySchema } from "../_utils/validation";

export interface ICreateIndustryModal {
  isOpen: boolean;
  onClose: () => void;
  data?: object;
}
const CreateIndustryModal: FC<ICreateIndustryModal> = ({ isOpen, onClose }) => {
  const form = useForm<IIndustryPayload>({
    mode: "onChange",
    resolver: yupResolver(industrySchema),
  });

  const message = useMessage();
  const { mutate, isPending } = useCreateIndustry(v4());

  const onSubmit: SubmitHandler<IIndustryPayload> = (inputs) => {
    console.log({ inputs });
    mutate(inputs, {
      onSuccess: () => {
        onClose();
        message({ message: "industry created", status: "success" });
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
          <DialogTitle>Create industry</DialogTitle>
          <DialogDescription>
            The Industry represents sector of economic activity.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 py-5 pb-7">
            <TextInput
              label="name"
              isRequired
              placeholder={"e.g : ABC industry ltd"}
              {...form.register("name")}
              error={form.formState.errors?.name}
            />
            <Controller
              name="type"
              control={form.control}
              render={({ field }) => (
                <SelectInput
                  isRequired
                  label="type"
                  onBlur={field.onBlur}
                  error={form.formState.errors?.type}
                  onValueChange={(value) =>
                    form.setValue("type", value as "tax bracket")
                  }
                  options={[
                    { inputDisplay: "Tax bracket", value: "tax bracket" },
                  ]}
                  placeholder={"e.g : select ..."}
                />
              )}
            />
            <TextAreaInput
              isRequired
              label="description"
              {...form.register("description")}
              error={form.formState.errors?.description}
              placeholder={"e.g : ABC industry ltd specialise in ..."}
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

export default CreateIndustryModal;
