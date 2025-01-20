"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import CreateLocationModal, {
  ICreateLocationModal,
} from "./createLocationModal";
import { DataTable } from "@/components/dataTable";
import useGetAllLocation from "../_hooks/useGetAllLocation";
import { ILocation } from "../_utils/types";
import { Imeta } from "../../types";
import { locationColumn } from "../_utils/column";

const LocationMain = () => {
  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();

  const CreateModalProps: ICreateLocationModal = {
    isOpen: createModal?.open as boolean,
    onClose: () => setCreateModal(undefined),
  };

  const { data } = useGetAllLocation({ page: 1, limit: 10 });
  const locationData = data?.data as ILocation[];
  const liocationMeta = data?.meta as Imeta;
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
          onDetails: () => {},
          onEdit: () => {},
        })}
        data={locationData ?? []}
      />

      {createModal?.open ? <CreateLocationModal {...CreateModalProps} /> : null}
    </div>
  );
};

export default LocationMain;
