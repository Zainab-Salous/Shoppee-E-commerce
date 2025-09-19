import ProductDetailsCard from 'images/app/_Component/ProductDetailsCard/ProductDetailsCard';
import { productItem } from 'images/types/productDetails.type';
import { ProductData } from 'images/types/products.type';
import React from 'react'

export default async function page({params}:{params:{id:string}}) {
  const {id} = params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`);
  const data: { data: productItem } = await res.json();
  const product: productItem = data.data;
  
  return (
    <div>
      <ProductDetailsCard product={product}/>
    </div>
  )
}
