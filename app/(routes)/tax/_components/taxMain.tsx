"use client";
import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import DeleteDailog, { IDeleteDailog } from "@/components/deleteDailog";
import Pagination, { IPagination } from "@/components/pagination";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import useMessage from "@/hooks/useMessage";
import { isAxiosError } from "axios";
import { RotateCcw, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { IDeleteModalState, Imeta, ISheet, ISheetState } from "../../types";
import useDeleteTaxations from "../_hooks/useDeleteTaxations";
import useGetAllTaxations from "../_hooks/useGetAll";
import { taxColumn } from "../_utils/column";
import { ITaxations } from "../_utils/types";
import CreatetaxModal from "./createtaxModal";
import TaxationDetailsSheet from "./taxationDetailsSheet";

const TaxMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("taxations");
  }, []);

  const [page, setPage] = useState(1);

  const message = useMessage();
  const [search, setSearch] = useState("");
  const { mutate, isPending } = useDeleteTaxations();
  const [deleteModal, setDeleteModal] = useState<IDeleteModalState>();
  const [createModal, setCreateModal] = useState<ISheetState<ITaxations>>();
  const { data, isLoading } = useGetAllTaxations({ page, limit: 10, search });
  const [detailsModal, setDetailsModal] = useState<ISheetState<ITaxations>>();

  const taxationData = data?.data as ITaxations[];
  const taxationMeta = data?.meta as Imeta;

  const deleteFn = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message({ message: "Taxation deleted", status: "success" });
        setDeleteModal(undefined);
      },
      onError: (error) => {
        if (isAxiosError(error))
          message({ message: error?.response?.data?.message, status: "error" });
      },
    });
  };

  const createTaxModalProps: ISheet<ITaxations> = useMemo(
    () => ({
      data: createModal?.data,
      isOpen: createModal?.isopen as boolean,
      onClose: () => setCreateModal(undefined),
    }),
    [createModal]
  );
  const detailsModalProps: ISheet<ITaxations> = {
    data: detailsModal?.data,
    isOpen: detailsModal?.isopen as boolean,
    onClose: () => setDetailsModal(undefined),
  };
  const deletModalProps: IDeleteDailog = {
    action: deleteFn,
    desc: "This will delete the taxation, and this process is irreversible",
    isLoading: isPending,
    onClose: () => setDeleteModal(undefined),
    open: deleteModal as IDeleteModalState,
  };
  const paginationProps: IPagination = {
    itemsPerPage: taxationMeta?.itemsPerPage,
    onPageChange: (page) => setPage(page),
    totalItems: taxationMeta?.totalItems,
    align: "end",
  };
  const onReset = () => {
    setPage(1);
    setSearch("");
  };

  // const createtaxModalProps: ICreatetaxModal = {
  //   data: createModal?.data,
  //   isOpen: createModal?.open as boolean,
  //   onClose: () => setCreateModal({ open: false, data: undefined }),
  // };
  return (
    <div>
      <div className="p-10 flex flex-col gap-2">
        <h4 className="text-2xl"> List</h4>
        <div className="flex items-center gap-2">
          <p>Total items - {taxationMeta?.totalItems ?? 0}</p>|{" "}
          <Button className="gap-2" variant="link" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
        <div className="flex items-center justify-between ">
          <div className="w-1/3">
            <TextInput
              leftIcon={<SearchIcon className="w-4 h-4" />}
              className="pl-11"
              value={search}
              placeholder="Search all taxes"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setCreateModal({ isopen: true, data: undefined })}
          >
            + Create tax
          </Button>
        </div>

        <DataTable
          columns={taxColumn({
            onDelete: (data) => setDeleteModal({ id: data?.uuid, open: true }),
            onDetails: (data) => setDetailsModal({ isopen: true, data }),
            onEdit: (data) => setCreateModal({ data, isopen: true }),
          })}
          data={taxationData ?? []}
          isLoading={isLoading}
        />
        <div className="my-4 ">
          <Pagination {...paginationProps} />
        </div>
      </div>
      {createModal?.isopen ? <CreatetaxModal {...createTaxModalProps} /> : null}
      {detailsModal?.isopen ? (
        <TaxationDetailsSheet {...detailsModalProps} />
      ) : null}

      {deleteModal?.open ? <DeleteDailog {...deletModalProps} /> : null}
    </div>
  );
};

export default TaxMain;
