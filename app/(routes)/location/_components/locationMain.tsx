"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CreateLocationModal, {
  ICreateLocationModal,
} from "./createLocationModal";
import { DataTable } from "@/components/dataTable";
import useGetAllLocation from "../_hooks/useGetAllLocation";
import { ILocation } from "../_utils/types";
import { Imeta, ISheet, ISheetState } from "../../types";
import { locationColumn } from "../_utils/column";
import LocationDetailsSheet from "./locationDetailsSheet";

const LocationMain = () => {
  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();

  const [detailsModal, setDetailsModal] = useState<ISheetState<ILocation>>();

  const CreateModalProps: ICreateLocationModal = {
    isOpen: createModal?.open as boolean,
    onClose: () => setCreateModal(undefined),
  };
  const detailsModalProps: ISheet<ILocation> = {
    isOpen: detailsModal?.isopen as boolean,
    onClose: () => setDetailsModal(undefined),
    data: detailsModal?.data,
  };

  const { data } = useGetAllLocation({ page: 1, limit: 10 });
  const locationData = data?.data as ILocation[];
  const locationMeta = data?.meta as Imeta;
  return (
    <div className="flex flex-col">
      <Button
        onClick={() => setCreateModal((prev) => ({ ...prev, open: true }))}
      >
        + create
      </Button>
      <DataTable
        columns={locationColumn({
          onDelete: () => {},
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: () => {},
        })}
        data={locationData ?? []}
      />

      {createModal?.open ? <CreateLocationModal {...CreateModalProps} /> : null}
      {detailsModal?.isopen ? (
        <LocationDetailsSheet {...detailsModalProps} />
      ) : null}
    </div>
  );
};

export default LocationMain;
