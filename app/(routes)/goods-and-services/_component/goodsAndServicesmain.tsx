"use client";
import useStore from "@/app/store/useStore";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import CreateProductModal, { ICreateProductModal } from "./createProductModal";

const GodsAndServicesmain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("goods and services");
  }, []);

  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();

  const createModalProps: ICreateProductModal = {
    isOpen: createModal?.open as boolean,
    onClose: () => setCreateModal(undefined),
  };
  return (
    <div className="flex flex-col">
      <Button>+ create</Button>

      {createModal?.open ? <CreateProductModal {...createModalProps} /> : null}
    </div>
  );
};

export default GodsAndServicesmain;
