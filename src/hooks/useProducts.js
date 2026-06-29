import {
  addProdcut,
  getOneProdcutById,
  getProducts,
  likeProduct,
  removeProduct,
  updateProduct,
} from "@/services/productService";
import { useMutation, useQuery } from "react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProduct = () => {
  return useMutation({ mutationFn: addProdcut });
};

export const useUpdateProduct = () => {
  return useMutation({ mutationFn: updateProduct });
};

export const useLikeProduct = () => {
  return useMutation({ mutationFn: likeProduct });
};

export const useRemoveProduct = () => {
  return useMutation({ mutationFn: removeProduct });
};

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getOneProdcutById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
