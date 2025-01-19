import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FC } from "react";
import { IIndustryPayload, industrySchema } from "../_utils/validation";

export interface ICreateIndustryModal {
  isOpen: boolean;
  onClose: () => void;
  data?: object;
}
const CreateIndustryModal: FC<ICreateIndustryModal> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IIndustryPayload>({
    mode: "onChange",
    resolver: yupResolver(industrySchema),
  });

  const onSubmit: SubmitHandler<IIndustryPayload> = (inputs) => {
    console.log({ inputs });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[0.3px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div></div>
          <DialogFooter>
            <Button variant="outline">Close</Button>
            <Button>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIndustryModal;
