import http from "./httpService";

export async function getProducts(qs = "", cookies) {
  try {
    return await http.get(`/product/list?${qs}`, {
      headers: cookies
        ? {
            Cookie: cookies,
          }
        : undefined,
    });
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        products: [],
      };
    }

    throw error;
  }
}

export function getOneProductBySlug(slug) {
  return http.get(`/product/slug/${slug}`);
}

export function getOneProductById(id) {
  return http.get(`/product/${id}`);
}

export function likeProduct(id) {
  return http.post(`/product/like/${id}`);
}

// admin related functions

export function addProduct(data) {
  return http.post(`/admin/product/add`, data);
}

export function removeProduct(id) {
  return http.delete(`/admin/product/remove/${id}`);
}

export function updateProduct({ id, ...data }) {
  return http.patch(`/admin/product/update/${id}`, data);
}
