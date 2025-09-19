'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    arrows:false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
 <div className="grid grid-cols-12 my-6">
    <div className='col-span-10'>
           <Slider {...settings}>
      <div>
       <Image src={'/images/slider (1).jpg'} alt="slider1" width={1000} height={1000} className="w-full h-96 object-cover" />
      </div>
       <div>
       <Image src={'/images/slider (2).jpg'} alt="slider2" width={1000} height={1000} className="w-full h-96 object-cover" />
      </div>
       <div>
       <Image src={'/images/slider (3).jpg'} alt="slider3" width={1000} height={1000} className="w-full h-96 object-cover" />
      </div>
      <div>
       <Image src={'/images/slider (4).jpg'} alt="slider4" width={1000} height={1000} className="w-full h-96 object-cover" />
      </div>

    </Slider>
    </div>
    <div className='col-span-2 h-96'>
             <Image src={'/images/slider (1).jpg'} alt="slider1" width={1000} height={1000} className="w-full h-1/3 object-fit" />
       <Image src={'/images/slider (2).jpg'} alt="slider2" width={1000} height={1000} className="w-full h-1/3 object-fit" />
              <Image src={'/images/slider (3).jpg'} alt="slider2" width={1000} height={1000} className="w-full h-1/3 object-fit" />


    </div>
 </div>

  );
}