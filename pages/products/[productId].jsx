import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { GetProductWithId } from '@/services/products/getProductWithId';
import { Button, InputNumber } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import { useState } from 'react';

export async function getServerSideProps({ params }) {
  const product = await GetProductWithId(params.productId)

  return {
    props: {
      product: product
    }
  }
}

export default function ProductDetail({ product }) {
    const router = useRouter();
    const data = router.query;
    const dispatch = useDispatch()
    const [selectValue, setSelectValue] = useState(1)
    const [token, setToken] = useState("")
    if (typeof window !== "undefined" && token === "") {
      if (localStorage.getItem("token") !== "") {
        setToken(localStorage.getItem("token"))
      }
    }

    const onChange = (value) => {
      setSelectValue(value)
    };

    const handleAddToCard = () => {
      if (token !== "") {
        dispatch(addToCart({ ...product, selectQuantity: selectValue}))
      } else {
        router.push('/login')
      }
    }

    return (
      <>
        <Navbar />
        <div className='container grid grid-cols-2 gap-4 mt-10 mb-[300px]'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZklyJR8O6ioNsK06NWm2P0K73LtXWh7u53nUXJlCq8-nk9pP4ZgONDDbR8XNqAVvI3U&usqp=CAU" alt='product' className='w-2/3 place-self-center rounded-md'/>
          <div>
            <div className='font-bold text-3xl'>{product.name}</div>
            <div className='mt-2 text-lg font-semibold'>{product.price.toLocaleString('en-US')} VND</div>
            <div className='mt-2 font-light italic'>Kho: {product.quantity}</div>
            <InputNumber 
              className='mt-2 border-blue-600 block'
              min={1} 
              max={product.quantity} 
              defaultValue={1} 
              onChange={onChange} />
            <Button className='mt-4 w-1/2' size='large' onClick={handleAddToCard}>ADD TO CART</Button>
            <div className='mt-2 font-bold'>Mô tả sản phẩm</div>
            <div className='mt-2'>{product.description}</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }