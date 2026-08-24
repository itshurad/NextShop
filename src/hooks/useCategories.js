import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewCategory,
  getCategories,
  getCategoryById,
  removeCategory,
  updateCategory,
} from "@/services/categoryService";

export const useGetCategories = () =>
  useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
  });

export const useGetCategoryById = (id) =>
  useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getCategoryById(id),
  });

export const useAddCategory = () => useMutation({ mutationFn: addNewCategory });
export const useUpdateCategory = () =>
  useMutation({ mutationFn: updateCategory });
export const useRemoveCategory = () =>
  useMutation({ mutationFn: removeCategory });
