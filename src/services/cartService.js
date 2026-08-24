import http from "./httpService";

export function addToCart(productId) {
  return http.post("/cart/add", { productId });
}
export function decrementFromCart(productId) {
  return http.post("/cart/remove", { productId });
}
