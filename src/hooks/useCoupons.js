import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewCoupon,
  deleteCoupon,
  getAllCoupons,
  getOneCoupon,
  updateCoupon,
} from "@/services/couponService";

export const useGetCoupons = () =>
  useQuery({
    queryKey: ["get-coupons"],
    queryFn: getAllCoupons,
  });

export const useGetOneCoupon = (id) =>
  useQuery({
    queryKey: ["get-coupon", id],
    queryFn: () => getOneCoupon(id),
  });

export const useAddNewCoupon = () => useMutation({ mutationFn: addNewCoupon });
export const useUpdateCoupon = () => useMutation({ mutationFn: updateCoupon });
export const useRemoveCoupon = () => useMutation({ mutationFn: deleteCoupon });
