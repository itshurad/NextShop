import { addToCart, decrementFromCart } from "@/services/cartService";
import { useMutation } from "react-query";

export const useAddToCart = () =>
  useMutation({
    mutationFn: addToCart,
  });

export const useDecrementFromCart = () =>
  useMutation({
    mutationFn: decrementFromCart,
  });
