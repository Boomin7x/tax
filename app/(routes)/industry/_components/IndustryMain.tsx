"use client";
import { useEffect, useState } from "react";

import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { Imeta } from "../../types";
import useGetAllIndustry from "../_hooks/useGetAllIndustry";
import { industryColumn } from "../_utils/column";
import { IIndustry } from "../_utils/types";
import CreateIndustryModal, {
  ICreateIndustryModal,
} from "./createIndustryModal";

const IndustryMain = () => {
  const { handleTitle } = useStore();
  const [createModal, setCreateModal] = useState<{
    data?: object;
    isopen: boolean;
  }>();

  const { data } = useGetAllIndustry({
    page: 1,
    limit: 10,
  });

  const industryData = data?.data as IIndustry[];
  const industryPagination = data?.meta as Imeta;

  console.log({ data });
  const createIndustryModalProps: ICreateIndustryModal = {
    data: createModal?.data,
    isOpen: createModal?.isopen as boolean,
    onClose: () => setCreateModal(undefined),
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
          onDetails: () => {},
          onEdit: () => {},
        })}
        data={industryData ?? []}
      />
      {createModal?.isopen ? (
        <CreateIndustryModal {...createIndustryModalProps} />
      ) : null}
    </div>
  );
};

export default IndustryMain;
