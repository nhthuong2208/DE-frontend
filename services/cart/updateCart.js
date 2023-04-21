import BaseRequest from "../baseRequest";

export async function UpdateCart(token, items) {
  let x = []
  items.forEach((item) => {
    x.push({
      "product_id": item.ID,
      "quantity": item.cartQuantity
    })
  })
  return await BaseRequest.put("/cart", {
    "produc_ids": x
  }, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
  }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}