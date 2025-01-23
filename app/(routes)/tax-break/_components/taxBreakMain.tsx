"use client";
import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IDeleteModalState, Imeta, ISheet, ISheetState } from "../../types";
import useGetAllTaxBreak from "../_hooks/useGetAllTaxBreak";
import { taxBreakColumn } from "../_utils/column";
import { ITaxBreak } from "../_utils/type";
import CreatetaxBreakModal from "./createtaxBreakModal";
import TaxBreakDetailsSheet from "./taxBreakDetailsSheet";
import DeleteDailog, { IDeleteDailog } from "@/components/deleteDailog";
import useMessage from "@/hooks/useMessage";
import useDeleteTaxBreak from "../_hooks/useDeleteTaxBreak";
import { isAxiosError } from "axios";
import Pagination, { IPagination } from "@/components/pagination";

const TaxBreakMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Tax break");
  }, []);

  const message = useMessage();
  const { mutate, isPending } = useDeleteTaxBreak();
  const [page, setPage] = useState(1);
  const { data } = useGetAllTaxBreak({ page, limit: 10 });
  const taxBreakData = data?.data as ITaxBreak[];
  const taxBreakPagination = data?.meta as Imeta;

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
  const paginationProps: IPagination = {
    itemsPerPage: taxBreakPagination?.itemsPerPage,
    onPageChange: (page) => setPage(page),
    totalItems: taxBreakPagination?.totalItems,
    align: "end",
  };

  return (
    <div className="flex flex-col p-8">
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
      <div className="my-4 ">
        <Pagination {...paginationProps} />
      </div>
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
