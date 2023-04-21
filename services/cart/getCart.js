import { useSelector } from "react-redux";
import BaseRequest from "../baseRequest";

export async function GetCart(token) {
  return await BaseRequest.get("/cart", {
    headers: {
        "Authorization": `Bearer ${token}`
    }
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return err.response.status
  })
}