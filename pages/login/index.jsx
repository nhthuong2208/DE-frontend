import React, { useState } from "react";
import Link from "next/link";
import { Button, Input } from "antd";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import { LoginUser } from "@/services/auth/login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const result = await LoginUser(username, password)
    dispatch(login(result.data))
    router.back()
  }

  return (
    <>
      <div className="w-1/4 mx-auto mt-[200px] bg-sky-100 p-5 rounded">
        <div className="text-center font-medium text-4xl mb-5">Login</div>
        <div className="font-light text-sm mb-1">Email or username</div>
        <Input
          className="mb-3"
          placeholder="Enter your email or username"
          prefix={<UserOutlined className="site-form-item-icon"/>}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <div className="font-light text-sm mb-1">Password</div>
        <Input.Password
          placeholder="Enter your password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-right font-light text-xs mt-1 italic">Don't have account? <Link href="/register" className="text-sky-800">Sign Up</Link></div>
        <Button size="large" className="mt-5 w-full bg-rose-400" onClick={handleLogin}>Login</Button>
      </div>
    </>
  );
}
