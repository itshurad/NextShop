import {
  checkOtp,
  completeProfile,
  getAllUsers,
  getOtp,
  getUserProfile,
  logout,
  updateProfile,
} from "@/services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetOtp = () => useMutation({ mutationFn: getOtp });

export const useCheckOtp = () =>
  useMutation({
    mutationFn: checkOtp,
  });
export const useCompleteProfile = () =>
  useMutation({
    mutationFn: completeProfile,
  });
export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfile,
  });
export const useLogout = () =>
  useMutation({
    mutationFn: logout,
  });
export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });
export const useGetUsers = () =>
  useQuery({
    queryKey: ["get-users"],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });
