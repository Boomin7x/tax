"use client";
import { DataTable, payments } from "@/components/dataTable";
import { useEffect, useState } from "react";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import useStore from "@/app/store/useStore";
import { taxColumn } from "../_utils/column";
import CreatetaxModal, { ICreatetaxModal } from "./createtaxModal";

const TaxMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("tax");
  }, []);

  const [first] = useState(payments);
  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();

  const createtaxModalProps: ICreatetaxModal = {
    isOpen: createModal?.open as boolean,
    onClose: () => setCreateModal(undefined),
    data: createModal?.data,
  };
  return (
    <div>
      <div className="p-10 flex flex-col">
        <div className="flex h-fit items-end justify-between">
          <div className="w-1/2">
            <TextInput placeholder="Search all taxes" />
          </div>
          <Button
            onClick={() => setCreateModal({ data: undefined, open: true })}
          >
            + Create tax
          </Button>
        </div>
        <DataTable columns={taxColumn} data={first} />
        {createModal?.open ? <CreatetaxModal {...createtaxModalProps} /> : null}
      </div>
    </div>
  );
};

export default TaxMain;
