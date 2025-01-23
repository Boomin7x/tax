"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CreateTaxBracketModal from "./createTaxBracketModal";

import useStore from "@/app/store/useStore";
import { ITaxBracket } from "../_utils/type";
import { DataTable } from "@/components/dataTable";
import { taxtBracketColumn } from "../_utils/column";
import TaxBracketDetailsSheet from "./taxBracketDetailsSheet";
import useDeleteTaxBracket from "../_hooks/useDeleteTaxBracket";
import useGetAllTaxtBracket from "../_hooks/useGetAllTaxtBracket";
import { IDeleteModalState, Imeta, ISheet, ISheetState } from "../../types";
import DeleteDailog, { IDeleteDailog } from "@/components/deleteDailog";
import useMessage from "@/hooks/useMessage";
import { isAxiosError } from "axios";
import Pagination, { IPagination } from "@/components/pagination";

const TaxBracketMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Tax bracket");
  }, []);

  const message = useMessage();
  const { mutate, isPending } = useDeleteTaxBracket();
  const [page, setPage] = useState(1);
  const { data } = useGetAllTaxtBracket({ page, limit: 10 });
  const texBracketData = data?.data as ITaxBracket[];
  const taxBracketPagination = data?.meta as Imeta;

  const [deleteModal, setDeleteModal] = useState<IDeleteModalState>();
  const [createModal, setCreateModal] = useState<ISheetState<ITaxBracket>>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<ITaxBracket>>();

  const deleteFn = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message({ message: "Tax bracket deleted", status: "success" });
        setDeleteModal(undefined);
      },
      onError: (error) => {
        if (isAxiosError(error))
          message({ message: error?.response?.data?.message, status: "error" });
      },
    });
  };

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

  const deleteModalProps: IDeleteDailog = {
    action: deleteFn,
    desc: "This will delete the tax bracket, and this process is irreversible",
    isLoading: isPending,
    onClose: () => setDeleteModal(undefined),
    open: deleteModal as IDeleteModalState,
  };
  const paginationProps: IPagination = {
    itemsPerPage: taxBracketPagination?.itemsPerPage,
    onPageChange: (page) => setPage(page),
    totalItems: taxBracketPagination?.totalItems,
    align: "end",
  };

  return (
    <div className="flex flex-col p-8">
      <Button onClick={() => setCreateModal({ data: undefined, isopen: true })}>
        + create
      </Button>
      <DataTable
        columns={taxtBracketColumn({
          onDelete: (data) => setDeleteModal({ open: true, id: data?.uuid }),
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={texBracketData ?? []}
      />
      <div className="my-4 ">
        <Pagination {...paginationProps} />
      </div>
      {createModal?.isopen ? (
        <CreateTaxBracketModal {...createModalProps} />
      ) : null}
      {detailsModal?.isopen ? (
        <TaxBracketDetailsSheet {...detailsModalProps} />
      ) : null}

      {deleteModal?.open ? <DeleteDailog {...deleteModalProps} /> : null}
    </div>
  );
};

export default TaxBracketMain;
