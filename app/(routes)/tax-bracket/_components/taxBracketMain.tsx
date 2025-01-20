"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CreateTaxBracketModal, {
  ICreateTaxBracketModal,
} from "./createTaxBracketModal";

import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import useGetAllTaxtBracket from "../_hooks/useGetAllTaxtBracket";
import { ITaxBracket } from "../_utils/type";
import { taxtBracketColumn } from "../_utils/column";
import TaxBracketDetailsSheet from "./taxBracketDetailsSheet";
import { ISheet, ISheetState } from "../../types";

const TaxBracketMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Tax bracket");
  }, []);

  const { data } = useGetAllTaxtBracket({ page: 1, limit: 10 });
  const texBracketData = data?.data as ITaxBracket[];

  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<ITaxBracket>>();

  const createModalProps: ICreateTaxBracketModal = {
    data: createModal?.data,
    isOpen: createModal?.open as boolean,
    onClose: () => setCreateModal(undefined),
  };

  const detailsModalProps: ISheet<ITaxBracket> = {
    isOpen: detailsModal?.isopen as boolean,
    data: detailsModal?.data,
    onClose: () => setDetailsModal(undefined),
  };

  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, open: true })}>
        + create
      </Button>
      <DataTable
        columns={taxtBracketColumn({
          onDelete: () => {},
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: () => {},
        })}
        data={texBracketData ?? []}
      />
      {createModal?.open ? (
        <CreateTaxBracketModal {...createModalProps} />
      ) : null}
      {detailsModal?.isopen ? (
        <TaxBracketDetailsSheet {...detailsModalProps} />
      ) : null}
    </div>
  );
};

export default TaxBracketMain;
