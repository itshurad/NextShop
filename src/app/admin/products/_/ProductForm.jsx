"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Spinner,
  toast,
  FieldError,
  ListBox,
  Select,
} from "@heroui/react";
import { useGetCategories } from "@/hooks/useCategories";
// import { TagsInput } from "react-tag-input-component";
import {
  useAddProduct,
  useGetProductById,
  useUpdateProduct,
} from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import CustomTagsInput from "@/components/TagsInput";

export default function ProductForm({ id }) {
  const isEditMode = Boolean(id);
  const router = useRouter();

  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};

  const { mutateAsync: addProduct } = useAddProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { data: categoriesData } = useGetCategories();
  const { categories } = categoriesData || {};

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const fileInputRef = useRef(null);

  // 🔄 مقداردهی اولیه تصاویر و تگ‌ها در حالت ویرایش
  useEffect(() => {
    if (product) {
      if (product.imageLink) setImagePreview(product.imageLink);
      if (product.tags) setSelectedTags(product.tags);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.danger("حجم تصویر نمی‌تواند بیشتر از 20 مگابایت باشد.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile && !imagePreview) {
      toast.danger("لطفاً یک تصویر برای محصول انتخاب کنید");
      return;
    }

    try {
      const currentForm = e.currentTarget;
      const formData = new FormData(currentForm);

      let base64Image = product?.imageLink || "";
      if (imageFile) {
        base64Image = await convertToBase64(imageFile);
      }

      const categoryValue = formData.get("category");
      if (!categoryValue) {
        toast.danger("لطفاً دسته‌بندی محصول را انتخاب کنید");
        return;
      }

      const productJson = {
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        slug: formData.get("slug")?.toString(),
        brand: formData.get("brand")?.toString(),
        countInStock: Number(formData.get("countInStock")),
        imageLink: base64Image,
        tags: selectedTags,
        category: categoryValue,
        price: Number(formData.get("price")),
        discount: Number(formData.get("discount") || 0),
        offPrice: Number(formData.get("offPrice")),
      };

      if (isEditMode) {
        const { message } = await updateProduct({ id, ...productJson });
        toast.success(message || "عملیات با موفقیت انجام شد");
      } else {
        const { message } = await addProduct(productJson);
        toast.success(message || "عملیات با موفقیت انجام شد");
      }

      router.push("/admin/products");
    } catch (error) {
      toast.danger(error?.response?.data?.message || "خطایی رخ داده است");
    }
  };

  if (isEditMode && (isLoading || !product))
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  return (
    <Form onSubmit={onSubmit} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-black">
            <span>
              <svg
                className="text-accent h-9 w-9 stroke-[1.5]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8768 16.1682C13.0292 15.7535 13.6375 15.7535 13.7899 16.1682L14.2066 17.3023C14.2554 17.435 14.3637 17.5395 14.5013 17.5865L15.6774 17.9884C16.1075 18.1353 16.1075 18.7218 15.6774 18.8688L14.5013 19.2706C14.3637 19.3177 14.2554 19.4221 14.2066 19.5549L13.7899 20.6889C13.6375 21.1037 13.0292 21.1037 12.8768 20.6889L12.4601 19.5549C12.4113 19.4221 12.303 19.3177 12.1653 19.2706L10.9892 18.8688C10.5591 18.7218 10.5591 18.1353 10.9892 17.9884L12.1653 17.5865C12.303 17.5395 12.4113 17.435 12.4601 17.3023L12.8768 16.1682Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6394 3.47278C14.8711 2.84241 15.7956 2.84241 16.0272 3.47278L16.8211 5.63332C16.8953 5.8351 17.0599 5.99384 17.2691 6.06534L19.5097 6.83089C20.1634 7.05426 20.1634 7.94574 19.5097 8.16911L17.2691 8.93466C17.0599 9.00616 16.8953 9.1649 16.8211 9.36668L16.0272 11.5272C15.7956 12.1576 14.8711 12.1576 14.6394 11.5272L13.8455 9.36668C13.7714 9.1649 13.6068 9.00616 13.3975 8.93466L11.157 8.16911C10.5032 7.94574 10.5032 7.05426 11.157 6.83089L13.3975 6.06534C13.6068 5.99384 13.7714 5.8351 13.8455 5.63332L14.6394 3.47278Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.48641 9.36289C6.65786 8.87904 7.34214 8.87904 7.51358 9.36289L7.9824 10.686C8.03728 10.8409 8.15913 10.9627 8.31401 11.0176L9.63711 11.4864C10.121 11.6579 10.121 12.3421 9.63711 12.5136L8.31401 12.9824C8.15913 13.0373 8.03728 13.1591 7.9824 13.314L7.51358 14.6371C7.34214 15.121 6.65786 15.121 6.48641 14.6371L6.0176 13.314C5.96272 13.1591 5.84087 13.0373 5.68599 12.9824L4.36289 12.5136C3.87904 12.3421 3.87904 11.6579 4.36289 11.4864L5.68599 11.0176C5.84087 10.9627 5.96272 10.8409 6.0176 10.686L6.48641 9.36289Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {isEditMode ? "ویرایش محصول" : "ساخت محصول جدید"}
          </h1>
          <p className="text-muted mt-2 text-sm">
            {isEditMode
              ? "مشخصات فنی و اطلاعات مالی محصول را ویرایش و به‌روزرسانی کنید."
              : "محصول جدیدی با مشخصات فنی استاندارد به زنجیره تامین سیستم اضافه کنید."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Media Upload */}
            <Card className="border-border bg-surface shadow-surface-secondary/5 rounded-[24px] border p-6 shadow-lg md:p-8">
              <div className="border-border mb-6 border-b pb-4">
                <h2 className="flex items-center gap-2 text-lg font-black">
                  <span>
                    <svg
                      className="text-accent h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.58093 11.4129C7.30893 11.4129 6.27393 10.3779 6.27393 9.10588C6.27393 7.83187 7.30893 6.79688 8.58093 6.79688C9.85393 6.79787 10.8889 7.83388 10.8889 9.10588C10.8889 10.3779 9.85293 11.4129 8.58093 11.4129ZM8.57993 8.29688C8.13593 8.29688 7.77393 8.65887 7.77393 9.10588C7.77393 9.55088 8.13593 9.91288 8.58093 9.91288C9.02693 9.91288 9.38893 9.55088 9.38893 9.10588C9.38893 8.65987 9.02593 8.29787 8.57993 8.29688Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6.06878 17.208C5.95678 17.208 5.84178 17.183 5.73478 17.129C5.36478 16.944 5.21478 16.496 5.39778 16.126C5.50278 15.915 6.46278 14.072 8.06378 14.072C8.88778 14.072 9.49078 14.52 9.97578 14.882C10.4478 15.232 10.7568 15.447 11.1598 15.447C11.4448 15.443 12.1838 14.554 12.5808 14.075C13.4278 13.055 14.3048 11.999 15.4218 11.999C17.3358 11.999 18.5258 14.544 18.6548 14.834C18.8228 15.212 18.6538 15.654 18.2758 15.823C17.9008 15.994 17.4548 15.824 17.2848 15.446C16.9998 14.811 16.1678 13.499 15.4218 13.499C15.0097 13.499 14.2454 14.4187 13.7384 15.0287L13.7348 15.033C12.9178 16.018 12.1458 16.947 11.1598 16.947C10.2398 16.947 9.59678 16.469 9.08078 16.085C8.65278 15.768 8.37578 15.572 8.06378 15.572C7.52878 15.572 6.94178 16.396 6.74078 16.794C6.60878 17.057 6.34378 17.208 6.06878 17.208Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 12C2 19.383 4.617 22 12 22C19.383 22 22 19.383 22 12C22 4.617 19.383 2 12 2C4.617 2 2 4.617 2 12ZM3.5 12C3.5 5.486 5.486 3.5 12 3.5C18.514 3.5 20.5 5.486 20.5 12C20.5 18.514 18.514 20.5 12 20.5C5.486 20.5 3.5 18.514 3.5 12Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>رسانه و تصویر محصول</span>
                </h2>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />

              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group bg-default/50 hover:border-accent hover:bg-surface-secondary/50 border-border relative flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 p-12 text-center transition-all duration-300"
                >
                  <div className="border-border bg-surface-secondary mb-4 rounded-2xl border p-4 shadow-sm transition-transform group-hover:-translate-y-1">
                    <span>
                      <svg
                        className="text-accent h-10 w-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.19458 15.4756H16.7876C17.2016 15.4756 17.5376 15.1396 17.5376 14.7256C17.5376 14.3116 17.2016 13.9756 16.7876 13.9756H7.19458C6.78058 13.9756 6.44458 14.3116 6.44458 14.7256C6.44458 15.1396 6.78058 15.4756 7.19458 15.4756Z"
                          fill="currentColor"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.63989 14.0154C1.63989 21.5054 6.12989 22.1004 11.9999 22.1004C17.8699 22.1004 22.3599 21.5054 22.3599 13.9884C22.3599 12.1664 22.3599 9.11842 20.4749 7.08442C19.3019 5.81842 17.7799 5.84742 16.5579 5.87142C15.8209 5.88742 15.1229 5.89942 14.6599 5.63642C14.0779 5.30542 13.8799 4.93642 13.6299 4.46942C13.3429 3.93142 12.9839 3.26242 12.0379 2.75242C10.3589 1.84642 8.39489 1.66842 5.86089 2.18942C3.29689 2.71542 1.63989 4.97642 1.63989 7.94942V14.0154ZM6.16289 3.65842C6.99589 3.48742 7.75089 3.40142 8.44189 3.40142C9.54989 3.40142 10.4929 3.62342 11.3259 4.07242C11.8753 4.3691 12.0565 4.70768 12.3071 5.17589L12.3084 5.17842C12.5993 5.72025 12.9615 6.39476 13.9189 6.94042C14.7322 7.40208 15.6594 7.38675 16.5614 7.37184L16.5869 7.37142C17.6979 7.34842 18.6589 7.33242 19.3749 8.10342C20.8599 9.70642 20.8599 12.2824 20.8599 14.0154C20.8599 19.9514 18.0229 20.6004 11.9999 20.6004C5.83889 20.6004 3.13989 19.9774 3.13989 14.0154V7.94942C3.13989 6.17542 3.93389 4.11542 6.16289 3.65842Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="text-sm font-black">
                    انتخاب یا رها کردن تصویر محصول
                  </h3>
                  <p className="text-mute mt-1.5 text-xs font-medium">
                    PNG, JPG, WEBP تا حداکثر ۲۰ مگابایت
                  </p>
                </div>
              ) : (
                <div className="group border-border bg-surface relative mx-auto flex aspect-16/10 w-full max-w-xl items-center justify-center overflow-hidden rounded-[24px] border p-6 shadow-inner">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <Button
                    type="button"
                    variant="danger-soft"
                    onClick={handleRemoveImage}
                    isIconOnly
                    className="absolute top-4 right-4 z-10 rounded-xl"
                  >
                    <span>
                      <svg
                        className="h-7 w-7 rotate-45 stroke-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 12H16M12 8L12 16"
                          stroke="currentColor"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </Button>
                </div>
              )}
            </Card>

            {/* Base Information */}
            <Card className="border-border bg-surface shadow-foreground/5 rounded-[24px] border p-6 shadow-lg md:p-8">
              <div className="border-border mb-6 border-b pb-4">
                <h2 className="flex items-center gap-2 text-lg font-black">
                  <span>
                    <svg
                      className="text-foreground h-6 w-6 stroke-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.29701 5.2338C3.52243 4.27279 4.27279 3.52243 5.2338 3.29701C6.06663 3.10165 6.93337 3.10165 7.7662 3.29701C8.72721 3.52243 9.47757 4.27279 9.70299 5.2338C9.89835 6.06663 9.89835 6.93337 9.70299 7.7662C9.47757 8.72721 8.72721 9.47757 7.7662 9.70299C6.93337 9.89835 6.06663 9.89835 5.2338 9.70299C4.27279 9.47757 3.52243 8.72721 3.29701 7.7662C3.10166 6.93337 3.10166 6.06663 3.29701 5.2338Z"
                        stroke="currentColor"
                      />
                      <path
                        d="M3.29701 16.2338C3.52243 15.2728 4.27279 14.5224 5.2338 14.297C6.06663 14.1017 6.93337 14.1017 7.7662 14.297C8.72721 14.5224 9.47757 15.2728 9.70299 16.2338C9.89835 17.0666 9.89835 17.9334 9.70299 18.7662C9.47757 19.7272 8.72721 20.4776 7.7662 20.703C6.93337 20.8983 6.06663 20.8983 5.2338 20.703C4.27279 20.4776 3.52243 19.7272 3.29701 18.7662C3.10166 17.9334 3.10166 17.0666 3.29701 16.2338Z"
                        stroke="currentColor"
                      />
                      <path
                        d="M14.297 5.2338C14.5224 4.27279 15.2728 3.52243 16.2338 3.29701C17.0666 3.10165 17.9334 3.10165 18.7662 3.29701C19.7272 3.52243 20.4776 4.27279 20.703 5.2338C20.8983 6.06663 20.8983 6.93337 20.703 7.7662C20.4776 8.72721 19.7272 9.47757 18.7662 9.70299C17.9334 9.89835 17.0666 9.89835 16.2338 9.70299C15.2728 9.47757 14.5224 8.72721 14.297 7.7662C14.1017 6.93337 14.1017 6.06663 14.297 5.2338Z"
                        stroke="currentColor"
                      />
                      <path
                        d="M14.297 16.2338C14.5224 15.2728 15.2728 14.5224 16.2338 14.297C17.0666 14.1017 17.9334 14.1017 18.7662 14.297C19.7272 14.5224 20.4776 15.2728 20.703 16.2338C20.8983 17.0666 20.8983 17.9334 20.703 18.7662C20.4776 19.7272 19.7272 20.4776 18.7662 20.703C17.9334 20.8983 17.0666 20.8983 16.2338 20.703C15.2728 20.4776 14.5224 19.7272 14.297 18.7662C14.1017 17.9334 14.1017 17.0666 14.297 16.2338Z"
                        stroke="currentColor"
                      />
                    </svg>
                  </span>
                  <span>اطلاعات پایه محصول</span>
                </h2>
              </div>

              <div className="space-y-5">
                <TextField
                  defaultValue={product?.title || ""}
                  name="title"
                  isRequired
                  variant="secondary"
                  className="w-full"
                >
                  <Label className="text-foreground mb-1.5 block text-sm font-bold">
                    نام محصول
                  </Label>
                  <Input
                    placeholder="مثال: آیفون 16 پرو مکس"
                    className="w-full"
                    name="title"
                  />
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </TextField>

                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    defaultValue={product?.slug || ""}
                    name="slug"
                    isRequired
                    variant="secondary"
                    className="w-full"
                  >
                    <Label className="text-foreground mb-1.5 block text-sm font-bold">
                      آدرس محصول (Slug)
                    </Label>
                    <Input
                      dir="ltr"
                      placeholder="iphone-16-pro-max"
                      className="w-full"
                      name="slug"
                    />
                    <FieldError className="font-bold">
                      این بخش الزامی است
                    </FieldError>
                  </TextField>

                  <TextField
                    defaultValue={product?.brand || ""}
                    name="brand"
                    isRequired
                    variant="secondary"
                    className="w-full"
                  >
                    <Label className="text-foreground mb-1.5 block text-sm font-bold">
                      نام برند
                    </Label>
                    <Input
                      placeholder="مثال: Apple"
                      className="w-full"
                      name="brand"
                    />
                    <FieldError className="font-bold">
                      این بخش الزامی است
                    </FieldError>
                  </TextField>
                </div>
              </div>
            </Card>

            {/* Pricing & Stock */}
            <Card className="border-border bg-surface shadow-foreground/5 rounded-[24px] border p-6 shadow-lg md:p-8">
              <div className="border-border mb-6 border-b pb-4">
                <h2 className="flex items-center gap-2 text-lg font-black">
                  <span>
                    <svg
                      className="text-warning h-7 w-7 stroke-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.88539 8.84875C3.55805 6.13983 5.70602 4.04534 8.43056 3.44162L8.88443 3.34105C10.9366 2.88632 13.0634 2.88632 15.1156 3.34105L15.5694 3.44162C18.294 4.04534 20.442 6.13984 21.1146 8.84875C21.6285 10.9182 21.6285 13.0819 21.1146 15.1512C20.442 17.8602 18.294 19.9547 15.5694 20.5584L15.1156 20.659C13.0634 21.1137 10.9366 21.1137 8.88443 20.659L8.43056 20.5584C5.70601 19.9547 3.55805 17.8602 2.88539 15.1513C2.37154 13.0819 2.37154 10.9181 2.88539 8.84875Z"
                        stroke="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.0002 7C12.3826 7 12.6926 7.29199 12.6926 7.65217V8.18573H12.7692C14.0567 8.18573 15 9.24015 15 10.4189C15 10.7791 14.69 11.0711 14.3077 11.0711C13.9253 11.0711 13.6154 10.7791 13.6154 10.4189C13.6154 9.85137 13.1811 9.49008 12.7692 9.49008H12.6926V11.5432L13.6273 11.8634C14.4767 12.1544 15 12.9457 15 13.7838C15 14.8506 14.1451 15.8142 12.9666 15.8142H12.6926V16.3478C12.6926 16.708 12.3826 17 12.0002 17C11.6179 17 11.3079 16.708 11.3079 16.3478V15.8142H11.2308C9.94328 15.8142 9 14.7598 9 13.581C9 13.2208 9.30996 12.9288 9.69231 12.9288C10.0747 12.9288 10.3846 13.2208 10.3846 13.581C10.3846 14.1486 10.8189 14.5098 11.2308 14.5098H11.3079V12.4568L10.3727 12.1365C9.5233 11.8455 9 11.0542 9 10.2161C9 9.14934 9.85491 8.18573 11.0334 8.18573H11.3079V7.65217C11.3079 7.29199 11.6179 7 12.0002 7ZM11.3079 9.49008H11.0334C10.7306 9.49008 10.3846 9.76055 10.3846 10.2161C10.3846 10.5645 10.6001 10.8265 10.8459 10.9107L11.3079 11.0689V9.49008ZM12.6926 12.9312V14.5098H12.9666C13.2694 14.5098 13.6154 14.2394 13.6154 13.7838C13.6154 13.4355 13.3999 13.1735 13.1541 13.0893L12.6926 12.9312Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>قیمت و موجودی انبار</span>
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  defaultValue={product?.price || ""}
                  name="price"
                  isRequired
                  variant="secondary"
                  className="w-full"
                >
                  <Label className="text-foreground mb-1.5 block text-sm font-bold">
                    قیمت اصلی (تومان)
                  </Label>
                  <Input
                    type="number"
                    placeholder="90000000"
                    className="w-full"
                    name="price"
                  />
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </TextField>

                <TextField
                  defaultValue={product?.discount || 0}
                  name="discount"
                  variant="secondary"
                  className="w-full"
                >
                  <Label className="text-foreground mb-1.5 block text-sm font-bold">
                    مبلغ تخفیف (تومان)
                  </Label>
                  <Input
                    type="number"
                    placeholder="1000000"
                    className="w-full"
                    name="discount"
                  />
                </TextField>

                <TextField
                  defaultValue={product?.offPrice || ""}
                  name="offPrice"
                  isRequired
                  variant="secondary"
                  className="w-full"
                >
                  <Label className="text-foreground mb-1.5 block text-sm font-bold">
                    قیمت نهایی (تومان)
                  </Label>
                  <Input
                    type="number"
                    placeholder="89000000"
                    className="w-full"
                    name="offPrice"
                  />
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </TextField>

                <TextField
                  defaultValue={product?.countInStock || ""}
                  name="countInStock"
                  isRequired
                  variant="secondary"
                  className="w-full"
                >
                  <Label className="text-foreground mb-1.5 block text-sm font-bold">
                    موجودی انبار
                  </Label>
                  <Input
                    type="number"
                    placeholder="50"
                    className="w-full"
                    name="countInStock"
                  />
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </TextField>
              </div>
            </Card>

            {/* Tags */}
            <Card className="border-border bg-surface rounded-[24px] border p-6 shadow-lg md:p-8">
              <h2 className="mb-2 text-lg font-black">برچسب‌ها (Tags)</h2>
              <CustomTagsInput
                value={selectedTags}
                onChange={setSelectedTags}
                placeholder="تگ را وارد کرده و Enter یا کاما (,) بزنید"
              />
            </Card>

            {/* Description */}
            <Card className="border-border bg-surface shadow-foreground/5 rounded-[24px] border p-6 shadow-lg md:p-8">
              <div className="border-border mb-6 border-b pb-4">
                <h2 className="text-lg font-black">
                  معرفی و توضیحات خلاقانه کالا
                </h2>
              </div>
              <TextField
                defaultValue={product?.description || ""}
                name="description"
                variant="secondary"
                className="w-full"
                isRequired
              >
                <Label className="text-foreground mb-1.5 block text-sm font-bold">
                  توضیحات
                </Label>
                <TextArea
                  placeholder="توضیحات کامل محصول را وارد کنید..."
                  className="min-h-36 w-full md:min-h-48"
                  name="description"
                />
                <FieldError className="font-bold">
                  این بخش الزامی است
                </FieldError>
              </TextField>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="flex flex-col gap-6 lg:sticky lg:top-6">
              {/* Category Select */}
              <Card className="border-border bg-surface shadow-foreground/5 rounded-[24px] border p-6 shadow-lg">
                <div className="border-border mb-6 border-b pb-4">
                  <h2 className="font-black">دسته‌بندی ساختاری</h2>
                  <p className="text-muted mt-1 text-xs">
                    دسته‌بندی مرتبط با محصول را مشخص کنید
                  </p>
                </div>

                <Select
                  name="category"
                  className="flex-1"
                  placeholder="انتخاب دسته‌بندی"
                  isRequired
                  variant="secondary"
                  defaultSelectedKey={product?.category?._id || ""}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      {categories?.map((item) => (
                        <ListBox.Item
                          dir="rtl"
                          key={item._id}
                          id={item._id}
                          textValue={item.title}
                          className="hover:bg-default-100 cursor-pointer rounded-xl px-3 py-2.5 text-sm transition-colors"
                        >
                          {item.title}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                  <FieldError className="font-bold">
                    این بخش الزامی است
                  </FieldError>
                </Select>
              </Card>

              {/* Publish Final Action */}
              <Card className="border-accent/20 bg-accent/5 rounded-[24px] border p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="bg-accent/15 flex h-11 w-11 items-center justify-center rounded-xl">
                    🚀
                  </div>
                  <div>
                    <h2 className="font-black">آماده انتشار نهایی</h2>
                    <p className="text-muted text-xs">
                      ثبت نهایی و تغییرات در لحظه
                    </p>
                  </div>
                </div>

                <p className="text-muted mb-6 text-sm leading-7">
                  پس از ثبت، این محصول بلافاصله در وب‌سایت قابل مشاهده و خرید
                  خواهد بود.
                </p>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="shadow-accent/20 h-14 w-full rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1"
                >
                  {isEditMode ? "به‌روزرسانی محصول" : "ثبت و استقرار محصول"}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
