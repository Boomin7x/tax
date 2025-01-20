"use client";
import { useEffect, useState } from "react";

import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { Imeta, ISheet, ISheetState } from "../../types";
import useGetAllIndustry from "../_hooks/useGetAllIndustry";
import { industryColumn } from "../_utils/column";
import { IIndustry } from "../_utils/types";
import CreateIndustryModal from "./createIndustryModal";
import IndustryDetailsSheet from "./industryDetailsSheet";

const IndustryMain = () => {
  const { handleTitle } = useStore();
  const [createModal, setCreateModal] = useState<ISheetState<IIndustry>>();

  const [detailsModal, setDetailsModal] = useState<ISheetState<IIndustry>>();

  const { data } = useGetAllIndustry({
    page: 1,
    limit: 10,
  });

  const industryData = data?.data as IIndustry[];
  const industryPagination = data?.meta as Imeta;

  console.log({ data });

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

  useEffect(() => {
    handleTitle("Industry");
  }, []);

  return (
    <div className="flex flex-col">
      <Button
        onClick={() => setCreateModal((prev) => ({ ...prev, isopen: true }))}
      >
        + create
      </Button>
      <DataTable
        columns={industryColumn({
          onDelete: () => {},
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={industryData ?? []}
      />
      {createModal?.isopen ? (
        <CreateIndustryModal {...createIndustryModalProps} />
      ) : null}
      {detailsModal?.isopen ? (
        <IndustryDetailsSheet {...industryDetailsModalProps} />
      ) : null}
    </div>
  );
};

export default IndustryMain;
