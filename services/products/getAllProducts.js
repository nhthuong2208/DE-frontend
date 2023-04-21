import BaseRequest from "../baseRequest";

export async function GetAllProducts(size, page) {
  return await BaseRequest.get("/product/list", {
    params: {
      size: size,
      page: page
    }
  }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}
