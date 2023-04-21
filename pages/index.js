import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/authSlice'

export default function Home() {
  const dispatch = useDispatch()
  if (typeof window !== "undefined") {
    if (localStorage.getItem("token") !== "") {
      dispatch(login(localStorage.getItem("token")))
    }
  }
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}
