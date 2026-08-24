import http from "./httpService";

export function getAllCoupons() {
  // غلط املایی اصلاح شد
  return http.get("/admin/coupon/list");
}
export function getOneCoupon(id) {
  return http.get(`/admin/coupon/${id}`);
}
export function addNewCoupon(data) {
  return http.post("/admin/coupon/add", data);
}
export function updateCoupon({ id, data }) {
  return http.patch(`/admin/coupon/update/${id}`, data);
}
export function deleteCoupon(id) {
  return http.delete(`/admin/coupon/remove/${id}`);
}
