"use client";
import { DataTable, payments } from "@/components/dataTable";
import { useEffect, useMemo, useState } from "react";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import useStore from "@/app/store/useStore";
import { taxColumn } from "../_utils/column";
import CreatetaxModal, { ICreatetaxModal } from "./createtaxModal";
import { SearchIcon } from "lucide-react";

const TaxMain = () => {
  const { handleTitle } = useStore();

  const [first] = useState(payments);
  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();

  const createTaxModalProps: ICreatetaxModal = useMemo(
    () => ({
      data: createModal?.data,
      isOpen: createModal?.open as boolean,
      onClose: () => setCreateModal(undefined),
    }),
    [createModal]
  );

  useEffect(() => {
    handleTitle("tax");
  }, []);

  // const createtaxModalProps: ICreatetaxModal = {
  //   data: createModal?.data,
  //   isOpen: createModal?.open as boolean,
  //   onClose: () => setCreateModal({ open: false, data: undefined }),
  // };
  return (
    <div>
      <div className="p-10 flex flex-col">
        <div className="flex h-fit items-end justify-between">
          <div className="w-1/2">
            <TextInput
              leftIcon={<SearchIcon className="w-4 h-4" />}
              className="pl-11"
              placeholder="Search all taxes"
            />
          </div>
          <Button
            onClick={() => setCreateModal({ open: true, data: undefined })}
          >
            + Create tax
          </Button>
        </div>
        <DataTable columns={taxColumn} data={first} />
      </div>
      {createModal?.open ? <CreatetaxModal {...createTaxModalProps} /> : null}
    </div>
  );
};

export default TaxMain;
