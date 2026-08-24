import http from "./httpService";

export function createPayment() {
  return http.post("/payment/create");
}
export function getAllPayments() {
  return http.get("/admin/payment/list");
}
