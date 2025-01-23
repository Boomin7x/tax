"use client";
import { DataTable } from "@/components/dataTable";
import DeleteDailog, { IDeleteDailog } from "@/components/deleteDailog";
import { Button } from "@/components/ui/button";
import useMessage from "@/hooks/useMessage";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { IDeleteModalState, Imeta, ISheet, ISheetState } from "../../types";
import useDeleteLocation from "../_hooks/useDeleteLocation";
import useGetAllLocation from "../_hooks/useGetAllLocation";
import { locationColumn } from "../_utils/column";
import { ILocation } from "../_utils/types";
import CreateLocationModal from "./createLocationModal";
import LocationDetailsSheet from "./locationDetailsSheet";
import Pagination, { IPagination } from "@/components/pagination";
import useStore from "@/app/store/useStore";

const LocationMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Location");
  }, []);
  const message = useMessage();
  const { mutate, isPending } = useDeleteLocation();
  const [page, setPage] = useState(1);
  const { data } = useGetAllLocation({ page, limit: 10 });
  const locationData = data?.data as ILocation[];
  const locationMeta = data?.meta as Imeta;

  const [deleteModal, setDeleteModal] = useState<IDeleteModalState>();
  const [createModal, setCreateModal] = useState<ISheetState<ILocation>>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<ILocation>>();

  const deleteFn = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message({ message: "Location deleted", status: "success" });
        setDeleteModal(undefined);
      },
      onError: (error) => {
        if (isAxiosError(error))
          message({ message: error?.response?.data?.message, status: "error" });
      },
    });
  };

  const CreateModalProps: ISheet<ILocation> = {
    isOpen: createModal?.isopen as boolean,
    onClose: () => setCreateModal(undefined),
    data: createModal?.data,
  };
  const detailsModalProps: ISheet<ILocation> = {
    isOpen: detailsModal?.isopen as boolean,
    onClose: () => setDetailsModal(undefined),
    data: detailsModal?.data,
  };
  const deletModalProps: IDeleteDailog = {
    action: deleteFn,
    desc: "This will delete the Location, and this process is irreversible",
    isLoading: isPending,
    onClose: () => setDeleteModal(undefined),
    open: deleteModal as IDeleteModalState,
  };
  const paginationProps: IPagination = {
    itemsPerPage: locationMeta?.itemsPerPage,
    onPageChange: (page) => setPage(page),
    totalItems: locationMeta?.totalItems,
    align: "end",
  };

  return (
    <div className="flex flex-col p-8">
      <Button onClick={() => setCreateModal({ data: undefined, isopen: true })}>
        + create
      </Button>
      <DataTable
        columns={locationColumn({
          onDelete: (data) => setDeleteModal({ id: data?.uuid, open: true }),
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={locationData ?? []}
      />
      <div className="my-4 ">
        <Pagination {...paginationProps} />
      </div>

      {createModal?.isopen ? (
        <CreateLocationModal {...CreateModalProps} />
      ) : null}
      {detailsModal?.isopen ? (
        <LocationDetailsSheet {...detailsModalProps} />
      ) : null}
      {deleteModal?.open ? <DeleteDailog {...deletModalProps} /> : null}
    </div>
  );
};

export default LocationMain;
