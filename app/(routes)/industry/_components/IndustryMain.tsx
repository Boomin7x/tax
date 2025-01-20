"use client";
import React, { useEffect, useState } from "react";

import CreateIndustryModal, {
  ICreateIndustryModal,
} from "./createIndustryModal";
import { Button } from "@/components/ui/button";
import useStore from "@/app/store/useStore";
import { DataTable, payments } from "@/components/dataTable";
import { taxColumn } from "../../tax/_utils/column";

const IndustryMain = () => {
  const [first] = useState(payments);
  const { handleTitle } = useStore();
  const [createModal, setCreateModal] = useState<{
    data?: object;
    isopen: boolean;
  }>();

  const createIndustryModalProps: ICreateIndustryModal = {
    data: createModal?.data,
    isOpen: createModal?.isopen as boolean,
    onClose: () => setCreateModal(undefined),
  };

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
      <DataTable columns={taxColumn} data={first} />
      {createModal?.isopen ? (
        <CreateIndustryModal {...createIndustryModalProps} />
      ) : null}
    </div>
  );
};

export default IndustryMain;
