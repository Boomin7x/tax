"use client";
import React, { useEffect, useState } from "react";

import CreateIndustryModal, {
  ICreateIndustryModal,
} from "./createIndustryModal";
import { Button } from "@/components/ui/button";
import useStore from "@/app/store/useStore";

const IndustryMain = () => {
  const [createModal, setCreateModal] = useState<{
    data?: object;
    isopen: boolean;
  }>();

  const createIndustryModalProps: ICreateIndustryModal = {
    data: createModal?.data,
    isOpen: createModal?.isopen as boolean,
    onClose: () => setCreateModal(undefined),
  };

  const { handleTitle } = useStore();

  useEffect(() => {
    handleTitle("Industry");
  }, []);

  return (
    <div className="flex flex-col">
      <Button
        onClick={() => setCreateModal((prev) => ({ ...prev, isopen: true }))}
      >
        + create
      </Button>
      {createModal?.isopen ? (
        <CreateIndustryModal {...createIndustryModalProps} />
      ) : null}
    </div>
  );
};

export default IndustryMain;
