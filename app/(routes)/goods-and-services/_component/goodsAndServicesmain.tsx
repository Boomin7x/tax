"use client";
import React, { useEffect, useState } from "react";

import useStore from "@/app/store/useStore";
import { Button } from "@/components/ui/button";
import CreateProductModal, { ICreateProductModal } from "./createProductModal";
import { DataTable } from "@/components/dataTable";
import useGetAllProduct from "../_hooks/useGetAllProduct";
import { IProduct } from "../_utils/types";
import { IDeleteModalState, Imeta, ISheet, ISheetState } from "../../types";
import { productColumn } from "../_utils/column";
import ProductDetails from "./productDetails";
import DeleteDailog from "@/components/deleteDailog";
import useDeleteProduct from "../_hooks/useDeleteProduct";
import { isAxiosError } from "axios";
import useMessage from "@/hooks/useMessage";

const GodsAndServicesmain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("goods and services");
  }, []);

  const [deleteModal, setDeleteModal] = useState<IDeleteModalState>();
  const [createModal, setCreateModal] = useState<ISheetState<IProduct>>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<IProduct>>();

  const createModalProps: ISheet<IProduct> = {
    isOpen: createModal?.isopen as boolean,
    data: createModal?.data,
    onClose: () => setCreateModal(undefined),
  };
  const detailModalProps: ISheet<IProduct> = {
    isOpen: detailsModal?.isopen as boolean,
    data: detailsModal?.data,
    onClose: () => setDetailsModal(undefined),
  };

  const message = useMessage();
  const { data } = useGetAllProduct({ page: 1, limit: 10 });
  const productData = data?.data as IProduct[];
  const productMeta = data?.meta as Imeta;

  const { mutate, isPending } = useDeleteProduct();

  const deleteFn = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message({ message: "Product deleted", status: "success" });
        setDeleteModal(undefined);
      },
      onError: (error) => {
        if (isAxiosError(error))
          message({ message: error?.response?.data?.message, status: "error" });
      },
    });
  };
  console.log({ data });
  return (
    <div className="flex flex-col">
      <Button onClick={() => setCreateModal({ data: undefined, isopen: true })}>
        + create
      </Button>

      <DataTable
        columns={productColumn({
          onDelete: (data) => setDeleteModal({ id: data?.uuid, open: true }),
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={productData ?? []}
      />

      {createModal?.isopen ? (
        <CreateProductModal {...createModalProps} />
      ) : null}
      {detailsModal?.isopen ? <ProductDetails {...detailModalProps} /> : null}

      {deleteModal?.open ? (
        <DeleteDailog
          action={deleteFn}
          desc="This will delete Product, and this process is irreversible"
          isLoading={isPending}
          onClose={() => setDeleteModal(undefined)}
          open={deleteModal}
        />
      ) : null}
    </div>
  );
};

export default GodsAndServicesmain;
