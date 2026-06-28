import React, { useContext } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from "react-router-dom";


export default function Cart() {

 let{cart ,uptadeProductcountTooCart, deleteProductCart}= useContext(CartContext)
  return <>
  <h2>Cart</h2>

{cart ? <div>
  
<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
     {cart.data.products.map((item,index)=>   <tr key={index} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={item.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button disabled={item.count==1} onClick={()=>uptadeProductcountTooCart(item.product.id,item.count-1)} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <span  data-input-counter className="shrink-0 p-2 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[10] text-center" >
              {item.count} </span>
              <button onClick={()=>uptadeProductcountTooCart(item.product.id,item.count+1)} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {item.price * item.count}
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>deleteProductCart(item.product.id)} className="font-medium text-red-600  text-fg-danger hover:underline">Remove</button>
        </td>
      </tr>)}
    </tbody >
  </table>
</div>
<div className="flex justify-between py-4 ">
  <h3 className='text-2xl'>Total Price : {cart.data.totalCartPrice}</h3>
  <Link to={'/checkout'}  > <button className=' bg-green-600 text-white text-lg  font-medium px-6 py-2  rounded-full   hover:bg-green-700   transition' >check Out</button></Link>
</div>
</div> : <Loading/> }
   



  </>
}
  