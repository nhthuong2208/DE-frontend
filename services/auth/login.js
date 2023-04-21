import BaseRequest from "../baseRequest";

export async function LoginUser(username, password) {
  return await BaseRequest.post("/user/login", {
    "password": password,
    "user_name_or_email": username
  }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}