import React, { useContext } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  let { id } = useParams();
  const [product, setproduct] = useState(null);
  const [loading, setloading] = useState(true);
let {addProductTooCart} =  useContext(CartContext)
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed : 3000,
    slidesToScroll: 1,
  };
  async function getproduct(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    );
    console.log(data);
    setproduct(data.data);
    setloading(false);
  }
  useEffect(() => {
    getproduct(id);
  }, []);

  return (
    <>
      {loading ? (
       <Loading />
      ) : (
        <div className="flex flex-wrap items-center  py-9">
          <div className="  p-4 w-1/4">
            <Slider {...settings}>
              {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className="w-full"
                    alt={product.title}
                  />
                
              ))}
            </Slider>
          </div>
          <div className="w-3/4 center p-4 ps-9">
            <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
            <p className="text-gray-500 mb-4">{product.description}</p>
            <h3 className="text-main text-sm ">{product.category.name}</h3>
            <div className="flex justify-between text-sm items-center mt-2">
              <span className="text-gray-700 font-medium">
                {product.price} <span className="text-xs">EGP</span>
              </span>

              <span className="flex items-center gap-1 text-sm text-gray-600">
                <i className="fas fa-star text-yellow-400 text-xs"></i>
                {product.ratingsAverage}
              </span>
            </div>
            <button  onClick={()=> addProductTooCart(product.id)} className="btn w-full bg-green-500 rounded text-white text-sm py-1.5 mt-2 hover:bg-green-600 transition">
              Add to cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
