import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { product } from 'images/types/products.type'
import Link from 'next/link'
import AddCartButton from './AddCartButton'
import AddWishlistButton from './AddWishlistButton'

export default function ProductCard({product}: {product: product}) {
  const {imageCover, title, ratingsAverage, price , category: {name}, _id} = product

  return (
    <Card className='w-full rounded-none border-none shadow-sm hover:shadow-2xl transition-shadow duration-300'>
      <Link href={'/products/'+ _id}>
        <CardHeader >
          <div >
            
        <AddWishlistButton id={_id}/>
          <Image src={imageCover} alt={title} width={200} height={100} className='w-full object-cover'/>
      
          </div>
            </CardHeader>
        <CardContent>
          <CardTitle className='text-main'>{name}</CardTitle>
          <CardTitle>{title.split(" ").slice(0, 2).join(" ")}</CardTitle>
          <div className='flex justify-between items-center'>
            <span>{price} EGP</span>
            <span>
              <i className='fa-solid fa-star rating-color'></i>{ratingsAverage}
            </span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className='flex justify-between items-center'>
        <AddCartButton id={_id}/>
       
       
      </CardFooter>
    </Card>
  )
}
