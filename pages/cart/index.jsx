import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Button, Table, Card, Divider, Result, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCart } from "@/services/cart/getCart";
import { useEffect } from "react";
import { UpdateCart } from "@/services/cart/updateCart";
import { useRouter } from "next/router";
import { logout } from "@/redux/authSlice";
import BaseRequest from "@/services/baseRequest";
import { resetItem, resetTotalCount } from "@/redux/cartSlice";

const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Giá (VND)",
    dataIndex: "price",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
  },
  {
    title: "Tổng cộng (VND)",
    dataIndex: "total_price",
  },
];

export default function CartPage() {
  const [productInCart, setProductInCart] = useState([]);
  const { items } = useSelector((state) => state.cart);
  const [token, setToken] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (typeof window !== "undefined" && token === "") {
    if (localStorage.getItem("token") !== "") {
      setToken(localStorage.getItem("token"));
    }
  }

  useEffect(() => {
    if (items.length !== 0) {
      UpdateCart(token, items);
    }
    const cart = GetCart(token);
    cart
      .then((res) => {
        if (res === 401) {
          dispatch(logout());
          router.push("/login");
        } else {
          if (res.products !== null) {
            setProductInCart(res.products);
            setTotalPrice(res.total_price);
          } else {
            const empty = [];
            setProductInCart(empty);
          }
        }
      })
      .catch((err) => {
        if (err === 401) {
          dispatch(logout());
          router.push("/login");
        }
      });
  }, []);

  const handleBuy = async () => {
    await BaseRequest.get("/cart/create-order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setIsModalOpen(true)
      setProductInCart([])
      dispatch(resetTotalCount())
      dispatch(resetItem())
    }).catch((err) => {
      console.log(err)
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-[300px]">
        <div className="flex justify-between">
          <Table
            columns={columns}
            dataSource={productInCart}
            className="grow mr-5"
          />
          {productInCart.length !== 0 ? (
            <div>
              <Card
                title="Thông tin đơn hàng"
                bordered={false}
                style={{
                  width: 300,
                }}
              >
                <div className="flex justify-between">
                  <p>Tạm tính</p>
                  <p>{totalPrice}</p>
                </div>
                <div className="flex justify-between">
                  <p>Phí vận chuyển</p>
                  <p>10000</p>
                </div>
                <Divider />
                <div className="flex justify-between">
                  <p>Tổng cộng</p>
                  <p>{totalPrice + 10000}</p>
                </div>
              </Card>
              <Button className="w-full mt-2" onClick={handleBuy}>Mua hàng</Button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={<Button></Button>}
      >
        <Result
          status="success"
          title="Successfully Purchased for Order"
        />
      </Modal>

      <Footer />
    </>
  );
}
