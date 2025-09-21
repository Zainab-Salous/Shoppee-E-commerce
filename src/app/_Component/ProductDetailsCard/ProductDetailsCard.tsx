import { productItem } from 'images/types/productDetails.type'
import React from 'react'
import ProductSlider from '../ProductSlider/ProductSlider'
import AddCartButton from '../ProductCard/AddCartButton'
import AddWishlistButton from '../ProductCard/AddWishlistButton'
export default function ProductDetailsCard({product}: {product: productItem}) {
        const { title, ratingsAverage, price , category: {name}, _id, description, images}=product

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24 items-center">
        <div className="md:col-span-4 col-span-1 mb-8 md:mb-0">
          <ProductSlider images={images} />
        </div>
        <div className="md:col-span-8 col-span-1">
          <h1 className="text-xl md:text-2xl font-bold mb-2">{title}</h1>
          <p className="text-gray-700 mb-4">{description}</p>
          <h5 className="text-main my-4 md:my-10">{name}</h5>
          <div className="flex flex-col md:flex-row justify-between items-center my-4 md:my-10 gap-2">
            <span className="text-lg font-semibold">{price}EGP</span>
            <span className="flex items-center text-yellow-500">
              <i className="fa-solid fa-star rating-color mr-1"></i>
              {ratingsAverage}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <AddCartButton id={_id} className="rounded-lg bg-main w-full md:w-auto mt-5 md:mt-0">
              Add To Cart
            </AddCartButton>
            <AddWishlistButton id={_id} />
          </div>
        </div>
      </div>
    </div>
  )
}
