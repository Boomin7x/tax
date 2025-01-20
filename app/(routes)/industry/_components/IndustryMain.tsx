"use client";
import { useEffect, useState } from "react";

import useStore from "@/app/store/useStore";
import { DataTable, payments } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { taxColumn } from "../../tax/_utils/column";
import useGetAllIndustry from "../_hooks/useGetAllIndustry";
import CreateIndustryModal, {
  ICreateIndustryModal,
} from "./createIndustryModal";
import { IIndustry } from "../_utils/types";
import { Imeta } from "../../types";

const IndustryMain = () => {
  const [first] = useState(payments);
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
      <DataTable columns={taxColumn} data={first} />
      {createModal?.isopen ? (
        <CreateIndustryModal {...createIndustryModalProps} />
      ) : null}
    </div>
  );
};

export default IndustryMain;
