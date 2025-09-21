"use client"
import { Button } from 'images/components/ui/button'
import {  CountWishlistContext } from 'images/CountWishlistProvider'
import { getUserToken } from 'images/getUserToken'
import { AddProductToWishlist } from 'images/WishlistAction/WishListAction'
import React, { useContext } from 'react'
import { toast } from 'sonner'

export default function AddCartButton({id}:{id:string}) {
 const CountWishlistData = useContext(CountWishlistContext)

  async function addProduct(id:string){
    const token = await getUserToken()
    if(!token){
      toast.error("You must be logged in to add a product to the wishlist",{position: "top-center"})
      return
    }
    const data = await AddProductToWishlist(id)
    if(data.status === "success") {
      toast.success(data.message,{position: "top-center"})
        const sumWishlist = data.data.reduce((total: number, item: { quantity: number })=>total += item.quantity,0)
        CountWishlistData?.setCountWishlist(sumWishlist)
    }else{
      toast.error(data.message,{position: "top-center"})
    }
  }
  return (
     <Button onClick={()=>{addProduct(id)}}  className='bg-transparent text-red-600 hover:bg-red-600 hover:text-white' ><i className="fa-regular fa-heart text-xl"></i></Button> 
  )
}
