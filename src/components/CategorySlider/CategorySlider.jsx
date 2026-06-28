import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };
  
  async function getCategory() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );
    setCategory(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
     <Slider {...settings}>
    {category.map((category, index) => (
      <div key={category._id} className="my-3">
        <img src={category.image} alt={category.name} className="w-full h-[250px] object-cover object-top"/>
        <h6 className="text-center mt-2">{category.name}</h6>
      </div>
    ))}
  </Slider>
    </>
  );
}
