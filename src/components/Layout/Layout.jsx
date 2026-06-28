import React from 'react'
import style from './Layout.module.css'
import Footer from '../Footer/Footer.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <div className="min-h-screen  dark:bg-gray-950 bg-white  transition">
  <Navbar />

  <div className="container w-full py-8 mt-6 px-4 text-2xl mx-auto text-black dark:text-white">
    <Outlet />
  </div>

  <Footer />
</div>
    </>
  )
}