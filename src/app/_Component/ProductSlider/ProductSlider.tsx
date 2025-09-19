'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ProductSlider({images}:{images:string[]}) {
      const settings = {
    arrows:false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div >           <Slider {...settings}>
    {
        images.map((image,index)=>(
            <div key={index}>
                <Image src={image} alt="slider1" width={1000} height={1000} className="w-full h-96 object-cover" />
            </div>
        ))
    }

    </Slider></div>
  )
}
