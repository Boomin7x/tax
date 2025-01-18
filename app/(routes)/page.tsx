"use client";
import { DataTable, payments } from "@/components/dataTable";
import { useState } from "react";
import { taxColumn } from "./tax/_utils/column";

const TaxPage = () => {
  const [first] = useState(payments);
  return (
    <div>
      <div className="p-10">
        <DataTable columns={taxColumn} data={first} />
      </div>
    </div>
  );
};

export default TaxPage;
