import http from "./httpService";

export function getProducts(qs, cookies) {
  return http.get(`/product/list?${qs}`, {
    headers: {
      Cookie: cookies,
    },
  });
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
