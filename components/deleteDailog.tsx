import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import CustomButton from "./CustomButton";
import { Button } from "./ui/button";

export interface IDeleteDailog {
  open: {
    id: string;
    open: boolean;
  };
  onClose: () => void;
  desc: string;
  action: (id: string) => void;
  isLoading: boolean;
}
const DeleteDailog: FC<IDeleteDailog> = ({
  action,
  desc,
  isLoading,
  onClose,
  open,
}) => {
  return (
    <Dialog open={open.open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            cancel
          </Button>
          <CustomButton
            variant="destructive"
            isLoading={isLoading}
            onClick={() => action(open?.id)}
          >
            Continue
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDailog;
