import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProduct,
  getOneProductById,
  getProducts,
  likeProduct,
  removeProduct,
  updateProduct,
} from "@/services/productService";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
  });

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getOneProductById(id),
  });

export const useAddProduct = () => useMutation({ mutationFn: addProduct });
export const useUpdateProduct = () =>
  useMutation({ mutationFn: updateProduct });
export const useLikeProduct = () => useMutation({ mutationFn: likeProduct });
export const useRemoveProduct = () =>
  useMutation({ mutationFn: removeProduct });
