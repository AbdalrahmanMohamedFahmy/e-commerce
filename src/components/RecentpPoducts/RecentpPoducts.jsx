import React, { useContext, useEffect } from 'react'
import style from './RecentpPoducts.module.css'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails.jsx';
import Loading from '../Loading/Loading.jsx';
import { CartContext } from '../../Context/CartContext.jsx';


export default function Home() {

    const [product, setproduct] = useState([])
    const [loading, setloading] = useState(true)
  let {addProductTooCart}=  useContext(CartContext)
    async function getproduct() {

        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        
        setproduct(data.data);
        setloading(false);
    }
    useEffect(() => {
        getproduct()
    }, [])


    return <>
        <h2 className='text-xl font-semibold mb-4'>Recent Products</h2>
        {loading ? <Loading /> : <>
            <div className='flex flex-wrap dark:bg-gray-950 bg-white   py-7 gap-y-5 justify-center'>
                {product.map((product) => <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
                    <div className="product  p-3 rounded-lg">
                        <Link to={`ProductDetails/${product.id}`}>
                        <img src={product.imageCover} className='w-full' alt={product.title} />
                        <h3 className='text-main text-sm '>{product.category.name}</h3>
                        <h3 className='text-xl'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                        <div className="flex justify-between text-sm items-center mt-2">
                            <span className="text-gray-900 dark:text-white font-medium">
                                {product.price} <span className="text-xs">EGP</span>
                            </span>

                            <span className="flex items-center gap-1 text-sm dark:text-white text-black">
                                <i className='fas fa-star text-yellow-400 text-xs'></i>
                                {product.ratingsAverage}
                            </span>
                        </div></Link>

                        <button onClick={()=> addProductTooCart(product.id)} className='btn w-full bg-green-500 rounded dark:text-white text-black text-sm py-1.5 mt-2 hover:bg-green-600 transition'>
                            Add to cart
                        </button>
                    </div>
                </div>)}
            </div>
        </>}
    </> 
}
