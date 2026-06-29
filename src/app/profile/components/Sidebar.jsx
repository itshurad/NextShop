"use client";
import React from "react";
import SidebarMenu from "./SidebarMenu";
import { useGetUser, useLogout } from "@/hooks/useAuth";
import { Avatar, Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";

function Sidebar({ isOpen = false, onClose }) {
  const { data, isLoading } = useGetUser();
  const router = useRouter();
  const { user } = data || {};
  const { mutateAsync: logoutFn } = useLogout();

  const handelLogout = async () => {
    try {
      await logoutFn();
      toast.info("شما از حساب کاربری خود خارج شدید");
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داد");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="bg-backdrop/50 fixed inset-0 z-50 backdrop-blur-sm transition-opacity lg:hidden"
        />
      )}

      <aside
        className={`border-border bg-surface lg:bg-surface fixed inset-y-0 right-0 z-50 flex h-screen w-72 flex-col justify-between border-l p-4 shadow-2xl transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-0 lg:w-75 lg:translate-x-0 lg:border-r-0 lg:border-l lg:shadow-[1px_0_20px_rgba(0,0,0,0.01)] lg:backdrop-blur-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-2 lg:justify-start lg:p-4">
            <Link href="/">
              <h3 className="text-foreground text-lg font-black tracking-tighter transition-all duration-300 ease-in-out hover:scale-105">
                نکست استور
              </h3>
            </Link>

            <Button
              onClick={onClose}
              isIconOnly
              variant="secondary"
              size="sm"
              className="text-foreground rounded-xl lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-4 max-h-[calc(100vh-180px)] overflow-y-auto">
            <SidebarMenu />
          </div>
        </div>

        <div className="border-border/40 border-t pt-4">
          <div
            className={`flex items-center justify-between transition-all ${isLoading && "blur-sm"}`}
          >
            <div className="flex items-center gap-x-2">
              <Avatar size="sm" className="h-9 w-9 rounded-full shadow-md">
                <Avatar.Image
                  alt="Blue"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-foreground text-xs font-black">
                  {user?.name || "مدیر سیستم"}
                </span>
                <span className="text-muted text-[10px] font-bold">
                  {user?.phoneNumber || "---"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-x-1">
              <Link href="/me" className="flex items-center">
                <Button
                  isIconOnly
                  size="sm"
                  variant="tertiary"
                  className="rounded-xl"
                >
                  <span>
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.4445 6.88859C18.7779 7.4441 16.5559 5.22205 17.1114 3.55551M16.9766 3.6903L13.3862 7.28073C11.8253 8.84163 10.718 10.7974 10.1826 12.9389L10.0091 13.6329C9.95503 13.8491 10.1509 14.045 10.3671 13.9909L11.0611 13.8174C13.2026 13.282 15.1584 12.1747 16.7193 10.6138L20.3097 7.02338C20.7517 6.58139 21 5.98192 21 5.35684C21 4.05519 19.9448 3 18.6432 3C18.0181 3 17.4186 3.24831 16.9766 3.6903Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 3C10.9767 3 9.95334 3.11763 8.95043 3.35288C6.17301 4.00437 4.00437 6.17301 3.35288 8.95043C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95044 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C20.8824 14.0466 21 13.0233 21 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </Button>
              </Link>
              <Button
                isIconOnly
                size="sm"
                onClick={handelLogout}
                className="text-danger hover:bg-danger/10 rounded-xl"
                variant="danger-soft"
              >
                <span>
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 12.1207C9 11.7065 9.33579 11.3707 9.75 11.3707H21.791C22.2052 11.3707 22.541 11.7065 22.541 12.1207C22.541 12.5349 22.2052 12.8707 21.791 12.8707H9.75C9.33579 12.8707 9 12.5349 9 12.1207Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.3328 8.67547C18.6251 8.38198 19.1 8.381 19.3935 8.67329L22.3215 11.5893C22.4628 11.73 22.5423 11.9213 22.5423 12.1207C22.5423 12.3202 22.4628 12.5114 22.3215 12.6521L19.3935 15.5681C19.1 15.8604 18.6251 15.8594 18.3328 15.566C18.0405 15.2725 18.0415 14.7976 18.335 14.5053L20.7294 12.1207L18.335 9.73613C18.0415 9.44384 18.0405 8.96897 18.3328 8.67547Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.2883 4.44997C15.065 5.02552 15.4533 5.96643 15.613 7.69872C15.651 8.11119 16.0162 8.41473 16.4287 8.37671C16.8411 8.33869 17.1447 7.9735 17.1066 7.56104C16.9363 5.71333 16.4896 4.21424 15.1813 3.24479C13.927 2.31533 12.0372 1.99988 9.35981 1.99988C5.80999 1.99988 3.62744 2.55642 2.50738 4.37982C1.97354 5.24888 1.73763 6.32518 1.62299 7.55727C1.50881 8.78453 1.50881 10.2589 1.50881 11.9683V12.0315C1.50881 13.7409 1.50881 15.2152 1.62299 16.4425C1.73763 17.6746 1.97354 18.7509 2.50738 19.6199C3.62744 21.4433 5.80999 21.9999 9.35981 21.9999C12.0372 21.9999 13.927 21.6844 15.1813 20.755C16.4896 19.7855 16.9363 18.2864 17.1066 16.4387C17.1447 16.0263 16.8411 15.6611 16.4287 15.623C16.0162 15.585 15.651 15.8886 15.613 16.301C15.4533 18.0333 15.065 18.9742 14.2883 19.5498C13.4576 20.1653 12.0124 20.4999 9.35981 20.4999C5.80864 20.4999 4.44068 19.9014 3.7855 18.8348C3.43171 18.2589 3.22381 17.4564 3.11654 16.3035C3.00953 15.1533 3.00881 13.7471 3.00881 11.9999C3.00881 10.2527 3.00953 8.84642 3.11654 7.69623C3.22381 6.54333 3.43171 5.74088 3.7855 5.16494C4.44068 4.09833 5.80864 3.49988 9.35981 3.49988C12.0124 3.49988 13.4576 3.83442 14.2883 4.44997Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
