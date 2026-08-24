import { useMutation, useQuery } from "@tanstack/react-query";
import { createPayment, getAllPayments } from "@/services/paymentService";

export const useGetPayments = () =>
  useQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
  });

export const useCreatPayment = () => useMutation({ mutationFn: createPayment });
