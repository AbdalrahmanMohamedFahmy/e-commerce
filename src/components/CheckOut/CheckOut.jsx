import React, { useContext, useState } from 'react'
import style from './CheckOut.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'




export default function CheckOut(shippingAddress) {

  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
 let {cart}= useContext(CartContext);


  async function CheckOut(values) {
    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`, {
        shippingAddress
      },
    {
        headers:{
            token: localStorage.getItem('usertaken')
        }
    })
      console.log(data);
      toast.success(data.status);
      location.href=data.session.url

    } catch (err) {
      console.log(err.response.data.message);
      setApiError(err.response.data.message)
      setLoading(false)

    }

  }

  



  const formik = useFormik({
    initialValues: {
     city:'',
     details:'',
     phone:'',
      
    },
     onSubmit: CheckOut
  })


  return <>

    <h2 className='text-main '>CheckOut</h2>


    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

       <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="details" id="details" onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer placeholder-transparent"
          placeholder=" " required />
        <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >enter your details</label>
      </div>
    

     
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="city" id="city" onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer placeholder-transparent"
          placeholder=" " required />
        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >enter your city</label>
      </div>
  


      <div className="relative z-0 w-full mb-5 group">
        <input type="tel" name="phone" id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer placeholder-transparent"
          placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >enter your phone</label>
      </div>
     







      {loading ? <button type="button" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main mx-1">
        <i className='fas fa-spinner fa-spin'></i>
      </button> : <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button>
      }


    </form>



  </>
}
