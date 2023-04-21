import { addToCart } from '@/redux/cartSlice';
import { GetCart } from '@/services/cart/getCart';
import { UpdateCart } from '@/services/cart/updateCart';
import { InfoCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { Meta } = Card;

export default function SingleProduct(props) {
  const dispatch = useDispatch()
  const [token, setToken] = useState("")
  if (typeof window !== "undefined" && token === "") {
    if (localStorage.getItem("token") !== "") {
      setToken(localStorage.getItem("token"))
    }
  }
  const router = useRouter()

  const handleClick = async () => {
    if (token !== "") {
      dispatch(addToCart(props))
    } else {
      router.push('/login')
    }
  }

  return (
    <Card
      style={{
        width: 300,
        position: "relative"
      }}
      cover={
        <img
          alt="example"
          src="https://i2-vnexpress.vnecdn.net/2022/09/15/-4772-1663217379.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=g1z_1gaw_CW1SuBb3jsDHA"
        />
      }
    >
      <Meta
        title={props.name}
        description={props.des}
      />
      <div className='mt-2 mb-10 text-right font-bold text-base'>{props.price}</div>
      <div className='flex justify-between absolute bottom-2'>
        <Link href={"/products/" + props.ID}><Button className='flex items-center' icon={<InfoCircleOutlined />}>Detail</Button></Link>
        <Button className='flex items-center ml-7' icon={<ShoppingCartOutlined />} onClick={handleClick}>Add to Cart</Button>
      </div>
    </Card>
  )
}