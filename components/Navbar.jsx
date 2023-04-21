import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Input, Popover } from "antd";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/router";
import { GetCart } from "@/services/cart/getCart";
import { addItems } from "@/redux/cartSlice";

const { Search } = Input;
const content = (
  <div>
    <Link href="/login">
      <div>Login</div>
    </Link>
    <Link href="/register">
      <div>Register</div>
    </Link>
  </div>
);

const contentLogin = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(logout())
    router.push('/login')
  }
  return (
    <div>
      <Link href="/order">
        <div>Order History</div>
      </Link>
      <div style={{cursor: "pointer"}} onClick={handleLogout}>Sign Out</div>
    </div>
  )
}

function Navbar() {
  const { totalCount } = useSelector((state) => state.cart);
  const { items } = useSelector((state) => state.cart)
  const [token, setToken] = useState("")
  if (typeof window !== "undefined" && token === "") {
    if (localStorage.getItem("token") !== "") {
      setToken(localStorage.getItem("token"))
    }
  }
  const dispatch = useDispatch()

  useEffect(() => {
    const cart = GetCart(token)
    cart.then((res) => {
      if (res === 401) {
        dispatch(logout())
        router.push('/login')
      } else if (res.products !== null && items.length === 0) {
        dispatch(addItems(res.products))
      }
    }).catch((err) => {
      if (err === 401) {
        dispatch(logout())
        router.push('/login')
      }
    })
  }, [])

  const onSearch = (value) => console.log(value);
  return (
    <header className="border-b border-gray-300 p-5 bg-cyan-100">
      <div className="flex items-center justify-between xl:mx-auto">
        <div className="text-gray-800 font-bold text-3xl">
          Data <span className="text-blue-600">Engineering</span>
        </div>
        <nav className="flex items-center w-auto">
          <ul className="text-base text-gray-600 flex justify-between items-center">
            <li>
              <Link href="/" className="px-5 py-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="px-5 py-2">
                Products
              </Link>
            </li>
            <li>
              <Search
                className="px-5"
                placeholder="Input search text"
                allowClear
                enterButton
                size="large"
                onSearch={onSearch}
                style={{
                  width: 400,
                }}
              />
            </li>
          </ul>
        </nav>
        <div className="flex items-center justify-center mr-5">
          <Link href={token !== "" ? "/cart" : "/login"} className="px-5 flex items-center">
            <Badge count={totalCount} showZero>
              <ShoppingOutlined className="text-xl" />
            </Badge>
          </Link>
          <Popover
            placement="bottom"
            content={token !== "" ? contentLogin : content}
            trigger="click"
          >
            <UserOutlined className="text-xl" />
          </Popover>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
