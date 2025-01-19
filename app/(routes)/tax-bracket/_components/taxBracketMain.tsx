"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CreateTaxBracketModal, {
  ICreateTaxBracketModal,
} from "./createTaxBracketModal";

import useStore from "@/app/store/useStore";

const TaxBracketMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Tax bracket");
  }, []);

  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();

  const createModalProps: ICreateTaxBracketModal = {
    data: createModal?.data,
    isOpen: createModal?.open as boolean,
    onClose: () => setCreateModal(undefined),
  };

  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, open: true })}>
        + create
      </Button>
      {createModal?.open ? (
        <CreateTaxBracketModal {...createModalProps} />
      ) : null}
    </div>
  );
};

export default TaxBracketMain;
