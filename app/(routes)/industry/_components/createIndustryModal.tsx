import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomButton from "@/components/CustomButton";
import TextAreaInput from "@/components/TextAreaInput";
import TextInput from "@/components/TextInput";
import useMessage from "@/hooks/useMessage";
import useCreateIndustry from "../_hooks/useCreateIndustry";

import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import { FC, useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 } from "uuid";
import { IIndustryPayload, industrySchema } from "../_utils/validation";
import { ISheet } from "../../types";
import { IIndustry } from "../_utils/types";
import useUpdateIndustry from "../_hooks/useUpdateIndustry";

const CreateIndustryModal: FC<ISheet<IIndustry>> = ({
  isOpen,
  onClose,
  data,
}) => {
  const newData = data as IIndustry;
  const form = useForm<IIndustryPayload>({
    mode: "onChange",
    resolver: yupResolver(industrySchema),
  });

  const userId = useMemo(() => v4(), []);
  const message = useMessage();
  const { mutate, isPending } = useCreateIndustry(userId);
  const { mutate: updateFn, isPending: isUpdating } = useUpdateIndustry(
    newData?.uuid,
    userId
  );

  const onSubmit: SubmitHandler<IIndustryPayload> = (inputs) => {
    console.log({ inputs });
    if (!!newData)
      updateFn(inputs, {
        onSuccess: () => {
          onClose();
          message({ message: "industry updated", status: "success" });
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
          onClose();
          message({ message: "industry created", status: "success" });
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
    form.setValue("type", "industry");
  }, [isOpen]);

  useEffect(() => {
    if (!!newData) {
      form.setValue("description", newData?.description);
      form.setValue("name", newData?.name);
    }
  }, [isOpen, newData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[0.3px]">
        <DialogHeader>
          <DialogTitle>{!!newData ? "Update" : "Create"} industry</DialogTitle>
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
            <CustomButton type="submit" isLoading={isPending || isUpdating}>
              {!!newData ? "Update" : "Create"}
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIndustryModal;
