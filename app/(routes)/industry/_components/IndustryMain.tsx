"use client";
import { useEffect, useState } from "react";

import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { IDeleteModalState, Imeta, ISheet, ISheetState } from "../../types";
import useGetAllIndustry from "../_hooks/useGetAllIndustry";
import { industryColumn } from "../_utils/column";
import { IIndustry } from "../_utils/types";
import CreateIndustryModal from "./createIndustryModal";
import IndustryDetailsSheet from "./industryDetailsSheet";
import DeleteDailog, { IDeleteDailog } from "@/components/deleteDailog";
import useDeleteIndustry from "../_hooks/useDeleteIndustry";
import useMessage from "@/hooks/useMessage";
import { isAxiosError } from "axios";
import Pagination, { IPagination } from "@/components/pagination";
import { RotateCcw, SearchIcon } from "lucide-react";
import TextInput from "@/components/TextInput";

const IndustryMain = () => {
  const { handleTitle } = useStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllIndustry({
    page: page,
    limit: 10,
  });

  const message = useMessage();
  const { mutate, isPending } = useDeleteIndustry();
  const industryData = data?.data as IIndustry[];
  const industryPagination = data?.meta as Imeta;

  const [deleteModal, setDeleteModal] = useState<IDeleteModalState>();
  const [createModal, setCreateModal] = useState<ISheetState<IIndustry>>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<IIndustry>>();

  const deleteFn = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message({ message: "Industry deleted", status: "success" });
        setDeleteModal(undefined);
      },
      onError: (error) => {
        if (isAxiosError(error))
          message({ message: error?.response?.data?.message, status: "error" });
      },
    });
  };

  const createIndustryModalProps: ISheet<IIndustry> = {
    data: createModal?.data,
    isOpen: createModal?.isopen as boolean,
    onClose: () => setCreateModal(undefined),
  };

  const industryDetailsModalProps: ISheet<IIndustry> = {
    data: detailsModal?.data,
    isOpen: detailsModal?.isopen as boolean,
    onClose: () => setDetailsModal(undefined),
  };

  const deletemodalProps: IDeleteDailog = {
    action: deleteFn,
    desc: "This will delete the Industry, and this process is irreversible",
    isLoading: isPending,
    onClose: () => setDeleteModal(undefined),
    open: deleteModal as IDeleteModalState,
  };

  const paginationProps: IPagination = {
    itemsPerPage: industryPagination?.itemsPerPage,
    onPageChange: (page) => setPage(page),
    totalItems: industryPagination?.totalItems,
    align: "end",
  };
  const onReset = () => {
    setPage(1);
    setSearch("");
  };

  useEffect(() => {
    handleTitle("Industry");
  }, []);

  return (
    <div className="flex flex-col gap-2 p-8">
      <h4 className="text-2xl"> List</h4>
      <div className="flex items-center gap-2">
        <p>Total items - {industryPagination?.totalItems ?? 0}</p>|{" "}
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
          onClick={() => setCreateModal((prev) => ({ ...prev, isopen: true }))}
        >
          + create
        </Button>
      </div>

      <DataTable
        columns={industryColumn({
          onDelete: (data) => setDeleteModal({ id: data?.uuid, open: true }),
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={industryData ?? []}
        isLoading={isLoading}
      />
      <div className="my-4 ">
        <Pagination {...paginationProps} />
      </div>
      {createModal?.isopen ? (
        <CreateIndustryModal {...createIndustryModalProps} />
      ) : null}
      {detailsModal?.isopen ? (
        <IndustryDetailsSheet {...industryDetailsModalProps} />
      ) : null}
      {deleteModal?.open ? <DeleteDailog {...deletemodalProps} /> : null}
    </div>
  );
};

export default IndustryMain;
