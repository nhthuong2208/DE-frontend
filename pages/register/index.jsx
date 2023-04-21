import React, { useState } from "react";
import Link from "next/link";
import { Button, Input } from "antd";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
  MailOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { RegisterUser } from "@/services/auth/register";
import { login } from "@/redux/authSlice";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    const result = await RegisterUser(email, firstName, lastName, username, password)
    dispatch(login(result.data))
    router.back()
  }

  return (
    <>
      <div className="w-1/4 mx-auto mt-[100px] bg-sky-100 p-5 rounded">
        <div className="text-center font-medium text-4xl mb-5">Sign Up</div>
        <div className="font-light text-sm mb-1">Email</div>
        <Input
          className="mb-3"
          placeholder="Enter your email"
          prefix={<MailOutlined className="site-form-item-icon" />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="font-light text-sm mb-1">First name</div>
        <Input
          className="mb-3"
          placeholder="Enter your first name"
          prefix={<EditOutlined className="site-form-item-icon" />}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <div className="font-light text-sm mb-1">Last name</div>
        <Input
          className="mb-3"
          placeholder="Enter your last name"
          prefix={<EditOutlined className="site-form-item-icon" />}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div className="font-light text-sm mb-1">Password</div>
        <Input.Password
          className="mb-3"
          placeholder="Enter your password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="font-light text-sm mb-1">Username</div>
        <Input
          placeholder="Enter your username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="text-right font-light text-xs mt-1 italic">
          Already have account?{" "}
          <Link href="/login" className="text-sky-800">
            Login
          </Link>
        </div>
        <Button size="large" className="mt-5 w-full bg-rose-400" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </>
  );
}
