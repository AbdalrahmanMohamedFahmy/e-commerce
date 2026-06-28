import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'




export default function Register() {

  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
 let {setuserToken}= useContext(UserContext);


  async function register(values) {
    try {
      setLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      console.log(data);
      localStorage.setItem('usertaken',data.token)
      setuserToken(data.token)
      navigate('/')

    } catch (err) {
      console.log(err.response.data.message);
      setApiError(err.response.data.message)
      setLoading(false)

    }

  }
  

  let validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(15, "Name must be at most 15 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with capital letter and be 6-10 characters"),
    rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref('password')], "RePassword must match Password"),
    phone: Yup.string().required("Phone is required").matches(/^(010|011|012|015)[0-9]{8}$/, "Phone must be an Egyptian phone number")
  })

  // function validateform(values) {

  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "Namee is required"
  //   } else if (! /^[A-Z]\w{3,15}/.test(values.name)) {
  //     errors.name = "Name must start with capital letter and be 4-15 characters"
  //   }
  //   if (!values.phone) {
  //     errors.phone = "phone is required"
  //   } else if (!/^(010|011|012|015)[0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "phone must be egyptian phone"
  //   }


  //   return errors;
  // }

  const formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": ""
    },
    validationSchema: validationSchema  //, validate: validateform
    , onSubmit: register
  })


  return <>

    <h2 className='text-main '>Register</h2>


    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">


      {apiError && <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800" role="alert">
        {apiError}
      </div>}


      <div className="relative z-0 w-full mb-5 group">
        <input type="name" name="name" id="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer placeholder-transparent"
          placeholder=" " required />
        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >enter your Name</label>
      </div>

      {formik.errors.name && formik.touched.name && <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800" role="alert">
        {formik.errors.name}
      </div>}

      <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer placeholder-transparent"
          placeholder=" " required />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >enter your email</label>
      </div>
      {formik.errors.email && formik.touched.email && <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800" role="alert">
        {formik.errors.email}
      </div>}


      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="password" id="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer placeholder-transparent"
          placeholder=" " required />
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >enter your password</label>
      </div>
      {formik.errors.password && formik.touched.password && <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800" role="alert">
        {formik.errors.password}
      </div>}



      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="rePassword" id="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer placeholder-transparent"
          placeholder=" " required />
        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >enter your rePassword</label>
      </div>
      {formik.errors.rePassword && formik.touched.rePassword && <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800" role="alert">
        {formik.errors.rePassword}
      </div>}


      <div className="relative z-0 w-full mb-5 group">
        <input type="tel" name="phone" id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer placeholder-transparent"
          placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >enter your phone</label>
      </div>
      {formik.errors.phone && formik.touched.phone && <div className="px-4 py-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800" role="alert">
        {formik.errors.phone}
      </div>}




      {loading ? <button type="button" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main mx-1">
        <i className='fas fa-spinner fa-spin'></i>
      </button> : <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button>
      }


    </form>



  </>
}

