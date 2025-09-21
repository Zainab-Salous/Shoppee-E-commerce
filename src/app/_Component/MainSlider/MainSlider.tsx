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
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-6">
  <div className="md:col-span-10 col-span-1 mb-4" >
    <Slider {...settings}>
      <div>
        <Image
          src={'/images/slider (1).jpg'}
          alt="slider1"
          width={1000}
          height={1000}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>
      <div>
        <Image
          src={'/images/slider (2).jpg'}
          alt="slider2"
          width={1000}
          height={1000}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>
      <div>
        <Image
          src={'/images/slider (3).jpg'}
          alt="slider3"
          width={1000}
          height={1000}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>
      <div>
        <Image
          src={'/images/slider (4).jpg'}
          alt="slider4"
          width={1000}
          height={1000}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>
    </Slider>
  </div>
  <div className="md:col-span-2 col-span-1 flex md:flex-col flex-row h-64 md:h-96 gap-2">
    <Image
      src={'/images/slider (1).jpg'}
      alt="slider1"
      width={1000}
      height={1000}
      className="w-1/3 md:w-full h-full md:h-1/3 object-cover"
    />
    <Image
      src={'/images/slider (2).jpg'}
      alt="slider2"
      width={1000}
      height={1000}
      className="w-1/3 md:w-full h-full md:h-1/3 object-cover"
    />
    <Image
      src={'/images/slider (3).jpg'}
      alt="slider3"
      width={1000}
      height={1000}
      className="w-1/3 md:w-full h-full md:h-1/3 object-cover"
    />
  </div>
</div>

  );
}