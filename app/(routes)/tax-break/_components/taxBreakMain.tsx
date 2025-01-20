"use client";
import useStore from "@/app/store/useStore";
import React, { useEffect, useState } from "react";
import CreatetaxBreakModal, {
  ICreatetaxBreakModal,
} from "./createtaxBreakModal";
import { Button } from "@/components/ui/button";
import useGetAllTaxBreak from "../_hooks/useGetAllTaxBreak";
import { ITaxBreak } from "../_utils/type";
import { taxBreakColumn } from "../_utils/column";
import { DataTable } from "@/components/dataTable";

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

  const { data } = useGetAllTaxBreak({ page: 1, limit: 10 });
  const taxBreakData = data?.data as ITaxBreak[];
  console.log({ data });

  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, open: true })}>
        + create
      </Button>
      <DataTable
        columns={taxBreakColumn({
          onDelete: () => {},
          onDetails: () => {},
          onEdit: () => {},
        })}
        data={taxBreakData ?? []}
      />
      {createModal?.open ? (
        <CreatetaxBreakModal {...createtaxBreakModalProps} />
      ) : null}
    </div>
  );
};

export default TaxBreakMain;
