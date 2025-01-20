import React, { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { v4 } from "uuid";
import { IModal } from "../../types";
import { isAxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ItaxtBracketPayload, taxtBracketSchema } from "../_utils/validation";

import useMessage from "@/hooks/useMessage";
import TextInput from "@/components/TextInput";
import CustomButton from "@/components/CustomButton";
import TextAreaInput from "@/components/TextAreaInput";
import useCreateTaxBracket from "../_hooks/useCreateTaxtBracket";

export type ICreateTaxBracketModal = IModal;
const CreateTaxBracketModal: React.FC<ICreateTaxBracketModal> = ({
  isOpen,
  onClose,
}) => {
  const form = useForm<ItaxtBracketPayload>({
    mode: "onChange",
    resolver: yupResolver(taxtBracketSchema),
    defaultValues: {
      incomeMin: 0,
      incomeMax: 0,
      description: "",
      type: "tax bracket",
    },
  });

  const message = useMessage();
  const userId = useMemo(() => v4(), []);
  const { mutate, isPending } = useCreateTaxBracket(userId);

  const onSubmit: SubmitHandler<ItaxtBracketPayload> = (inputs) => {
    console.log(inputs);
    mutate(inputs, {
      onSuccess: () => {
        message({ message: "tax bracket created", status: "success" });
        onClose();
      },
      onError: (error) => {
        if (isAxiosError(error))
          message({ message: error?.response?.data?.message, status: "error" });
      },
    });
  };

  useEffect(() => {
    form.setValue("type", "tax bracket");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[0.3px] ">
        <DialogHeader>
          <DialogTitle>Create Tax Bracket</DialogTitle>
          <DialogDescription>
            Tax Bracket defines income thresholds for progressive taxation. Each
            bracket specifies the percentage of income to be taxed for entities
            falling within the bracket
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 py-5 pb-7 max-h-[80vh] overflow-y-auto">
            <Controller
              name="incomeMin"
              control={form.control}
              render={({ field }) => (
                <TextInput
                  label="Minimum income"
                  isRequired
                  type="number"
                  {...field}
                  placeholder={"e.g : 100000"}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    form.setValue("incomeMin", value);
                  }}
                  error={form.formState.errors?.incomeMin}
                />
              )}
            />
            <Controller
              name="incomeMax"
              control={form.control}
              render={({ field }) => (
                <TextInput
                  label="maximum income"
                  type="number"
                  isRequired
                  placeholder={"e.g : 2000000"}
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    form.setValue("incomeMax", value);
                  }}
                  error={form.formState.errors?.incomeMax}
                />
              )}
            />

            <TextAreaInput
              label="description"
              isRequired
              placeholder={" description here ...."}
              {...form.register("description")}
              error={form.formState.errors?.description}
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

export default CreateTaxBracketModal;
