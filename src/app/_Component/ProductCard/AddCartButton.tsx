'use client'
import { AddProductToCart } from 'images/CartAction/CartAction'
import { Button } from 'images/components/ui/button'
import { CountContext } from 'images/CountProvider'
import { getUserToken } from 'images/getUserToken'
import React, { useContext } from 'react'
import { toast } from 'sonner'

interface AddCartButtonProps {
  id: string
  isInWishlist?: boolean
  children?: React.ReactNode
  className?: string   
}

export default function AddCartButton({
  id,
  isInWishlist = false,
  children,
  className
}: AddCartButtonProps) {
  const CountData = useContext(CountContext)

  async function addProduct(id: string) {
    const token = await getUserToken()
    if (!token) {
      toast.error("You must be logged in to add a product to the cart", { position: "top-center" })
      return
    }
    const data = await AddProductToCart(id)
    if (data.status === "success") {
      toast.success(data.message, { position: "top-center" })
      const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => total + item.count,
        0
      )
      CountData?.setCount(sum)
    } else {
      toast.error(data.message, { position: "top-center" })
    }
  }

  return (
    <>
      {isInWishlist ? (
        <Button
          onClick={() => addProduct(id)}
          className={`bg-transparent text-red-600 hover:bg-red-600 hover:text-white ml-2 ${className ?? ""}`}
        >
          <i className="fa-solid fa-cart-shopping text-xl"></i>
          {children}
        </Button>
      ) : (
        <Button
          onClick={() => addProduct(id)}
          className={`rounded-md bg-main  cursor-pointer ${className ?? ""}`}
        >
          {children ?? "Add To Cart"}
        </Button>
      )}
    </>
  )
}
