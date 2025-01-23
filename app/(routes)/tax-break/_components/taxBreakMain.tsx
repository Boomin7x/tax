"use client";
import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IDeleteModalState, ISheet, ISheetState } from "../../types";
import useGetAllTaxBreak from "../_hooks/useGetAllTaxBreak";
import { taxBreakColumn } from "../_utils/column";
import { ITaxBreak } from "../_utils/type";
import CreatetaxBreakModal from "./createtaxBreakModal";
import TaxBreakDetailsSheet from "./taxBreakDetailsSheet";
import DeleteDailog, { IDeleteDailog } from "@/components/deleteDailog";
import useMessage from "@/hooks/useMessage";
import useDeleteTaxBreak from "../_hooks/useDeleteTaxBreak";
import { isAxiosError } from "axios";

const TaxBreakMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Tax break");
  }, []);

  const message = useMessage();
  const { mutate, isPending } = useDeleteTaxBreak();
  const { data } = useGetAllTaxBreak({ page: 1, limit: 10 });
  const taxBreakData = data?.data as ITaxBreak[];

  const [deleteModal, setDeleteModal] = useState<IDeleteModalState>();
  const [createModal, setCreateModal] = useState<ISheetState<ITaxBreak>>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<ITaxBreak>>();

  const deleteFn = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message({ message: "Tax break deleted", status: "success" });
        setDeleteModal(undefined);
      },
      onError: (error) => {
        if (isAxiosError(error))
          message({ message: error?.response?.data?.message, status: "error" });
      },
    });
  };

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

  const deleteModalProps: IDeleteDailog = {
    action: deleteFn,
    desc: "This will delete the Tax break and this process is irreversible",
    isLoading: isPending,
    onClose: () => setDeleteModal(undefined),
    open: deleteModal as IDeleteModalState,
  };

  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, isopen: true })}>
        + create
      </Button>
      <DataTable
        columns={taxBreakColumn({
          onDelete: (data) => setDeleteModal({ id: data?.uuid, open: true }),
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
      {deleteModal?.open ? <DeleteDailog {...deleteModalProps} /> : null}
    </div>
  );
};

export default TaxBreakMain;
