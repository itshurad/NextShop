"use client";
import { useGetUser } from "@/hooks/useAuth";
import { useLikeProduct } from "@/hooks/useProducts";
import { Button, Spinner, toast } from "@heroui/react";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function LikeButton({ product, className }) {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useLikeProduct();
  const { data } = useGetUser();
  const { user } = data || {};

  const handleLike = async () => {
    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.danger(error?.response?.data?.message);
    }
  };

  return (
    <Button
      size="sm"
      onClick={() => handleLike()}
      variant="light" // تغییر به light تا استایل‌های Tailwind به درستی اعمال شوند
      isIconOnly
      className={`min-w-0 p-0! ${className} flex items-center justify-center active:scale-90`}
    >
      {isLoading ? (
        <Spinner size="sm" color="danger" />
      ) : user?.likedProducts?.some((p) => p === product._id) ? (
        <svg
          className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.6568 10.698H17.6318C17.2178 10.683 16.8928 10.337 16.9068 9.92298C16.9388 8.97198 16.4738 8.35498 15.6628 8.27198C15.2508 8.22998 14.9508 7.86198 14.9928 7.44998C15.0358 7.03898 15.4058 6.73598 15.8158 6.77998C17.4238 6.94398 18.4648 8.22698 18.4058 9.97298C18.3918 10.379 18.0588 10.698 17.6568 10.698ZM17.5748 3.28398C15.8548 2.73398 13.4738 2.96198 11.9878 4.64798C10.4268 2.97398 8.12679 2.73098 6.41879 3.28498C2.50379 4.54498 1.28279 9.08098 2.39679 12.56V12.561C4.15479 18.032 9.99979 20.983 12.0018 20.983C13.7888 20.983 19.8658 18.087 21.6038 12.56C22.7178 9.08198 21.4938 4.54598 17.5748 3.28398Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.6314 10.6994H17.6564C18.0584 10.6994 18.3914 10.3804 18.4054 9.97438C18.4644 8.22938 17.4234 6.94638 15.8154 6.78138C15.4114 6.74738 15.0354 7.03838 14.9924 7.45038C14.9504 7.86238 15.2504 8.23038 15.6624 8.27338C16.4734 8.35638 16.9384 8.97338 16.9064 9.92438C16.8924 10.3384 17.2174 10.6854 17.6314 10.6994Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.15932 12.6389C3.95332 18.2229 9.94632 21.2359 12.0023 21.2359C14.0733 21.2359 20.0863 18.2219 21.8423 12.6379C22.9923 9.04591 21.7173 4.35791 17.6513 3.04791C15.9193 2.49291 13.5463 2.69691 11.9803 4.28991C10.5293 2.89591 8.37332 2.39291 6.34232 3.04891C2.28032 4.35591 1.00732 9.04491 2.15832 12.6379L2.15932 12.6389ZM12.0023 19.7359C10.8173 19.7359 5.23432 17.3059 3.58732 12.1809C2.65632 9.27291 3.62032 5.50091 6.80232 4.47591C8.19332 4.02691 10.2253 4.27891 11.3943 5.89291C11.5393 6.09191 11.7713 6.19191 12.0183 6.20191C12.2643 6.19691 12.4923 6.07091 12.6283 5.86591C13.6943 4.24791 15.7423 4.01191 17.1923 4.47591C20.3773 5.50191 21.3433 9.27391 20.4123 12.1839C18.8013 17.3069 13.1963 19.7359 12.0023 19.7359Z"
            fill="currentColor"
          />
        </svg>
      )}
    </Button>
  );
}
