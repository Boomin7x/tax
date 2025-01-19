"use client";
import useStore from "@/app/store/useStore";
import React, { useEffect, useState } from "react";
import CreatetaxBreakModal, {
  ICreatetaxBreakModal,
} from "./createtaxBreakModal";
import { Button } from "@/components/ui/button";

const TaxBreakMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Tax break");
  }, []);

  const [createModal, setCreateModal] = useState<{
    data?: object;
    open: boolean;
  }>();

  const createtaxBreakModalProps: ICreatetaxBreakModal = {
    isOpen: createModal?.open as boolean,
    data: createModal?.data,
    onClose: () => setCreateModal(undefined),
  };

  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, open: true })}>
        + create
      </Button>
      {createModal?.open ? (
        <CreatetaxBreakModal {...createtaxBreakModalProps} />
      ) : null}
    </div>
  );
};

export default TaxBreakMain;
