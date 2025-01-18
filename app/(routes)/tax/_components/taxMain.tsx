"use client";
import { DataTable, payments } from "@/components/dataTable";
import { useEffect, useState } from "react";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import useStore from "@/app/store/useStore";
import { taxColumn } from "../_utils/column";

const TaxMain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("tax");
  }, []);

  const [first] = useState(payments);
  return (
    <div>
      <div className="p-10 flex flex-col">
        <div className="flex h-fit items-end justify-between">
          <TextInput placeholder="Search all taxes" />
          <Button size={"default"} className="h-full">
            + Create tax
          </Button>
        </div>
        <DataTable columns={taxColumn} data={first} />
      </div>
    </div>
  );
};

export default TaxMain;
