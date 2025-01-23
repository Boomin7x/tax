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
import { RotateCcw, SearchIcon } from "lucide-react";
import TextInput from "@/components/TextInput";

const LocationMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("Location");
  }, []);
  const message = useMessage();
  const { mutate, isPending } = useDeleteLocation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllLocation({ page, limit: 10 });
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
  const onReset = () => {
    setPage(1);
    setSearch("");
  };

  return (
    <div className="flex flex-col p-8">
      <h4 className="text-2xl"> List</h4>
      <div className="flex items-center gap-2">
        <p>Total items - {locationMeta?.totalItems ?? 0}</p>|{" "}
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
          onClick={() => setCreateModal({ data: undefined, isopen: true })}
        >
          + create
        </Button>
      </div>

      <DataTable
        columns={locationColumn({
          onDelete: (data) => setDeleteModal({ id: data?.uuid, open: true }),
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={locationData ?? []}
        isLoading={isLoading}
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
