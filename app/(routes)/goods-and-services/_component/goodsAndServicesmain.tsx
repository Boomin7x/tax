"use client";
import React, { useEffect, useState } from "react";

import useStore from "@/app/store/useStore";
import { Button } from "@/components/ui/button";
import CreateProductModal, { ICreateProductModal } from "./createProductModal";
import { DataTable } from "@/components/dataTable";
import useGetAllProduct from "../_hooks/useGetAllProduct";
import { IProduct } from "../_utils/types";
import { Imeta, ISheet, ISheetState } from "../../types";
import { productColumn } from "../_utils/column";
import ProductDetails from "./productDetails";

const GodsAndServicesmain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("goods and services");
  }, []);

  const [createModal, setCreateModal] = useState<{
    open: boolean;
    data?: object;
  }>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<IProduct>>();

  const createModalProps: ICreateProductModal = {
    isOpen: createModal?.open as boolean,
    data: createModal?.data,
    onClose: () => setCreateModal(undefined),
  };
  const detailModalProps: ISheet<IProduct> = {
    isOpen: detailsModal?.isopen as boolean,
    data: detailsModal?.data,
    onClose: () => setDetailsModal(undefined),
  };

  const { data } = useGetAllProduct({ page: 1, limit: 10 });
  const productData = data?.data as IProduct[];
  const productMeta = data?.meta as Imeta;
  console.log({ data });
  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, open: true })}>
        + create
      </Button>

      <DataTable
        columns={productColumn({
          onDelete: () => {},
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: () => {},
        })}
        data={productData ?? []}
      />

      {createModal?.open ? <CreateProductModal {...createModalProps} /> : null}
      {detailsModal?.isopen ? <ProductDetails {...detailModalProps} /> : null}
    </div>
  );
};

export default GodsAndServicesmain;
