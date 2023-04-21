import { LoginUser } from "@/services/auth/login";

export default async function handler(req, res) {
  const {username, password} = req.body
  await BaseRequest.post("/user/login", {
    "password": password,
    "user_name_or_email": username
  }, 
  { 
    headers: {
    'Content-Type': 'application/json'
    }
  }).then((res) => {
    console.log(res)
  }).catch((err) => console.log(err))
  res.status(200).json({ name: "John Doe" });
}
