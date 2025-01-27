"use client";
import { useEffect, useState } from "react";

import { isAxiosError } from "axios";
import { IProduct } from "../_utils/types";
import useMessage from "@/hooks/useMessage";
import useStore from "@/app/store/useStore";
import ProductDetails from "./productDetails";
import { Button } from "@/components/ui/button";
import { productColumn } from "../_utils/column";
import { DataTable } from "@/components/dataTable";
import DeleteDailog from "@/components/deleteDailog";
import CreateProductModal from "./createProductModal";
import useGetAllProduct from "../_hooks/useGetAllProduct";
import useDeleteProduct from "../_hooks/useDeleteProduct";
import Pagination, { IPagination } from "@/components/pagination";
import { IDeleteModalState, Imeta, ISheet, ISheetState } from "../../types";

const GodsAndServicesmain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("goods and services");
  }, []);

  const [page, setPage] = useState(1);
  const { data } = useGetAllProduct({ page: page, limit: 10 });
  const productData = data?.data as IProduct[];
  const productMeta = data?.meta as Imeta;

  const message = useMessage();
  const { mutate, isPending } = useDeleteProduct();
  const [deleteModal, setDeleteModal] = useState<IDeleteModalState>();
  const [createModal, setCreateModal] = useState<ISheetState<IProduct>>();
  const [detailsModal, setDetailsModal] = useState<ISheetState<IProduct>>();

  const createModalProps: ISheet<IProduct> = {
    data: createModal?.data,
    isOpen: createModal?.isopen as boolean,
    onClose: () => setCreateModal(undefined),
  };
  const detailModalProps: ISheet<IProduct> = {
    data: detailsModal?.data,
    isOpen: detailsModal?.isopen as boolean,
    onClose: () => setDetailsModal(undefined),
  };

  const paginationProps: IPagination = {
    align: "end",
    totalItems: productMeta?.totalItems,
    onPageChange: (page) => setPage(page),
    itemsPerPage: productMeta?.itemsPerPage,
  };

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
    <div className="flex flex-col p-8">
      <Button onClick={() => setCreateModal({ data: undefined, isopen: true })}>
        + create
      </Button>

      <DataTable
        columns={productColumn({
          onEdit: (data) => setCreateModal({ isopen: true, data }),
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onDelete: (data) => setDeleteModal({ id: data?.uuid, open: true }),
        })}
        data={productData ?? []}
      />

      <div className="my-4 ">
        <Pagination {...paginationProps} />
      </div>

      {createModal?.isopen ? (
        <CreateProductModal {...createModalProps} />
      ) : null}
      {detailsModal?.isopen ? <ProductDetails {...detailModalProps} /> : null}

      {deleteModal?.open ? (
        <DeleteDailog
          action={deleteFn}
          open={deleteModal}
          isLoading={isPending}
          onClose={() => setDeleteModal(undefined)}
          desc="This will delete Product, and this process is irreversible"
        />
      ) : null}
    </div>
  );
};

export default GodsAndServicesmain;
