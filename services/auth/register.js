import BaseRequest from "../baseRequest";

export async function RegisterUser(email, firstName, lastName, username, password) {
  return await BaseRequest.post("/user/register", {
    "email": email,
    "first_name": firstName,
    "last_name": lastName,
    "password": password,
    "user_name": username
  }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}