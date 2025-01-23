"use client";
import { useEffect, useState } from "react";

import useStore from "@/app/store/useStore";
import { DataTable } from "@/components/dataTable";
import DeleteDailog from "@/components/deleteDailog";
import Pagination, { IPagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import useMessage from "@/hooks/useMessage";
import { isAxiosError } from "axios";
import { IDeleteModalState, Imeta, ISheet, ISheetState } from "../../types";
import useDeleteProduct from "../_hooks/useDeleteProduct";
import useGetAllProduct from "../_hooks/useGetAllProduct";
import { productColumn } from "../_utils/column";
import { IProduct } from "../_utils/types";
import CreateProductModal from "./createProductModal";
import ProductDetails from "./productDetails";
import TextInput from "@/components/TextInput";
import { RotateCcw, SearchIcon } from "lucide-react";

const GodsAndServicesmain = () => {
  const { handleTitle } = useStore();
  useEffect(() => {
    handleTitle("goods and services");
  }, []);

  const message = useMessage();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllProduct({
    page: page,
    limit: 10,
    search,
  });
  const productData = data?.data as IProduct[];
  const productMeta = data?.meta as Imeta;

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

  const paginationProps: IPagination = {
    itemsPerPage: productMeta?.itemsPerPage,
    onPageChange: (page) => setPage(page),
    totalItems: productMeta?.totalItems,
    align: "end",
  };

  const onReset = () => {
    setPage(1);
    setSearch("");
  };

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
    <div className="flex flex-col gap-3 p-8">
      <h4 className="text-2xl"> List</h4>
      <div className="flex items-center gap-2">
        <p>Total items - {productMeta?.totalItems ?? 0}</p>|{" "}
        <Button className="gap-2" variant="link" onClick={onReset}>
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
      <div className="flex items-center justify-between ">
        <div className="w-1/3">
          <TextInput
            leftIcon={<SearchIcon className="w-4 h-4" />}
            className="pl-11"
            value={search}
            placeholder="Search all taxes"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setCreateModal({ data: undefined, isopen: true })}
        >
          + create
        </Button>
      </div>

      <DataTable
        columns={productColumn({
          onDelete: (data) => setDeleteModal({ id: data?.uuid, open: true }),
          onDetails: (data) => setDetailsModal({ isopen: true, data }),
          onEdit: (data) => setCreateModal({ isopen: true, data }),
        })}
        data={productData ?? []}
        isLoading={isLoading}
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
