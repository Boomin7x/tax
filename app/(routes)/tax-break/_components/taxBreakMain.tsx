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
import TaxBreakDetailsSheet from "./taxBreakDetailsSheet";
import { ISheet, ISheetState } from "../../types";

const TaxBreakMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Tax break");
  }, []);

  const [createModal, setCreateModal] = useState<ISheetState<ITaxBreak>>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<ITaxBreak>>();

  const createtaxBreakModalProps: ISheet<ITaxBreak> = {
    data: createModal?.data,
    isOpen: createModal?.isopen as boolean,
    onClose: () => setCreateModal(undefined),
  };

  const taxBreakDetailsProps: ISheet<ITaxBreak> = {
    data: detailsModal?.data,
    isOpen: detailsModal?.isopen as boolean,
    onClose: () => setDetailsModal(undefined),
  };

  const { data } = useGetAllTaxBreak({ page: 1, limit: 10 });
  const taxBreakData = data?.data as ITaxBreak[];
  console.log({ data });

  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, isopen: true })}>
        + create
      </Button>
      <DataTable
        columns={taxBreakColumn({
          onDelete: () => {},
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={taxBreakData ?? []}
      />
      {createModal?.isopen ? (
        <CreatetaxBreakModal {...createtaxBreakModalProps} />
      ) : null}
      {detailsModal?.isopen ? (
        <TaxBreakDetailsSheet {...taxBreakDetailsProps} />
      ) : null}
    </div>
  );
};

export default TaxBreakMain;
