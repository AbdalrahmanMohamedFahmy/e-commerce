import React from 'react'
import style from './MainSlider.module.css'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import banner1 from '../../assets/images/blog-img-1.jpeg'
import banner2 from '../../assets/images/blog-img-2.jpeg'
import Slider from 'react-slick'


export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed : 3000,
    slidesToScroll: 1,
  };
  return <>
  
<div className="flex">
  <div className="w-3/4">
   <Slider {...settings}>
     <img src={slide1}  className='w-full h-[400px] ' />
     <img src={slide2}  className='w-full h-[400px]' />
     <img src={slide3}  className='w-full h-[400px]' />
    </Slider>
  </div>
  <div className="w-1/4">
  <img src={banner1}  className='w-full h-[200px]' />
  <img src={banner2}  className='w-full h-[200px]' />
  </div>
</div>
  
  </>
}
