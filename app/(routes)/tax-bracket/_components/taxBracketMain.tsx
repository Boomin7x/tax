"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CreateTaxBracketModal from "./createTaxBracketModal";

import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import { ISheet, ISheetState } from "../../types";
import useGetAllTaxtBracket from "../_hooks/useGetAllTaxtBracket";
import { taxtBracketColumn } from "../_utils/column";
import { ITaxBracket } from "../_utils/type";
import TaxBracketDetailsSheet from "./taxBracketDetailsSheet";

const TaxBracketMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Tax bracket");
  }, []);

  const { data } = useGetAllTaxtBracket({ page: 1, limit: 10 });
  const texBracketData = data?.data as ITaxBracket[];

  const [createModal, setCreateModal] = useState<ISheetState<ITaxBracket>>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<ITaxBracket>>();

  const createModalProps: ISheet<ITaxBracket> = {
    data: createModal?.data,
    isOpen: createModal?.isopen as boolean,
    onClose: () => setCreateModal(undefined),
  };

  const detailsModalProps: ISheet<ITaxBracket> = {
    isOpen: detailsModal?.isopen as boolean,
    data: detailsModal?.data,
    onClose: () => setDetailsModal(undefined),
  };

  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, isopen: true })}>
        + create
      </Button>
      <DataTable
        columns={taxtBracketColumn({
          onDelete: () => {},
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={texBracketData ?? []}
      />
      {createModal?.isopen ? (
        <CreateTaxBracketModal {...createModalProps} />
      ) : null}
      {detailsModal?.isopen ? (
        <TaxBracketDetailsSheet {...detailsModalProps} />
      ) : null}
    </div>
  );
};

export default TaxBracketMain;
