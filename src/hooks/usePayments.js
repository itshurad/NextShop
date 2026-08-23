import { createPayment, getAllPayments } from "@/services/paymentService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPayments = () =>
  useQuery({ queryKey: ["payments"], queryFn: getAllPayments, retry: false });

export const useCreatPayment = () =>
  useMutation({ mutationFn: createPayment });
