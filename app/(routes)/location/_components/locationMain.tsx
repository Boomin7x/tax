"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CreateLocationModal, {
  ICreateLocationModal,
} from "./createLocationModal";

const LocationMain = () => {
  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();

  const CreateModalProps: ICreateLocationModal = {
    isOpen: createModal?.open as boolean,
    onClose: () => setCreateModal(undefined),
  };
  return (
    <div className="flex flex-col">
      <Button
        onClick={() => setCreateModal((prev) => ({ ...prev, open: true }))}
      >
        + create
      </Button>

      {createModal?.open ? <CreateLocationModal {...CreateModalProps} /> : null}
    </div>
  );
};

export default LocationMain;
