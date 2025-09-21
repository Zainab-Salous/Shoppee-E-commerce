import { productItem } from 'images/types/productDetails.type'
import React from 'react'
import ProductSlider from '../ProductSlider/ProductSlider'
import AddCartButton from '../ProductCard/AddCartButton'
import AddWishlistButton from '../ProductCard/AddWishlistButton'
export default function ProductDetailsCard({product}: {product: productItem}) {
        const { title, ratingsAverage, price , category: {name}, _id, description, images}=product

  return (
    <div className='w-4/5 mx-auto '>
        <div className='grid  grid-cols-12 gap-24 items-center '>

            <div className='col-span-4'>
                
                <ProductSlider images={images} />

            </div>
            <div className='col-span-8'>
                <h1>{title}</h1>
                <p>
                    {description}
                </p>
                <h5 className='text-main my-10'>{name}</h5>
                <div className='flex justify-between items-center my-10'>
    <span>{price}EGP</span>
    <span><i className='fa-solid fa-star rating-color'></i>{ratingsAverage}</span>
</div>
<div className='flex  justify-between items-center  align-middle'>
  <AddCartButton id={_id} className="rounded-lg bg-main w-full mt-5">
  Add To Cart
</AddCartButton>
              <AddWishlistButton id={_id}  /></div>

 
            </div>

            </div>
    </div>
  )
}
