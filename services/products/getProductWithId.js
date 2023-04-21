import BaseRequest from "../baseRequest";

export async function GetProductWithId(productId) {
  const response = await BaseRequest.get(`/product/${productId}`);
  return response.data;
}