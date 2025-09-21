'use client'
import { Button } from 'images/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'images/components/ui/form'
import { Input } from 'images/components/ui/input'
import React, { useContext } from 'react'
import {  useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { getUserToken } from 'images/getUserToken'
import { getCartData } from 'images/CartAction/CartAction'
import { CartData } from 'images/types/cart.type'
import { CountContext } from 'images/CountProvider'
import {  WishlistData } from 'images/types/wishlist.type';
import { getWishlistData } from 'images/WishlistAction/WishListAction'
import { CountWishlistContext } from 'images/CountWishlistProvider'


export default function Login() {
  const CountData = useContext (CountContext)
  const CountWishlistData = useContext (CountWishlistContext)

  const schemaLogin = z.object({
    email: z.string().email({message: "Invalid email address."}),
    password: z.string().min(6, {message: "Password should be at least 6 characters."}).max(50, {message: "Password should be at most 50 characters."}),
 })
  
  const LoginForm = useForm<z.infer<typeof schemaLogin>>({
    defaultValues: {
    email:"",
    password:"",
    
},resolver: zodResolver(schemaLogin)
  })
 
  const Route = useRouter()
  async function handleLogin(values: z.infer<typeof schemaLogin>){

    const data = await signIn("credentials",{
      email: values.email,
      password: values.password,
      redirect: false,
      
    })
    if(data?.ok){
       toast.success("Welcome back",{position: "top-center"})
      
          const token = await getUserToken()
          if(!token){
            const data: CartData =await  getCartData()
            const wishlist: WishlistData = await getWishlistData();
             
            
           const sum = data.data.products.reduce((total, item)=>total += item.count,0)
              CountData?.setCount(sum)

              const sumWishlist = wishlist.data.reduce((total, item)=>total += item.quantity,0)
              CountWishlistData?.setCountWishlist(sumWishlist)
      
             
      
          }
      Route.push("/")
    } else {
            toast.error(data?.error,{position: "top-center"})
    }





  }
  
  return (
    <div className='w-full max-w-md mx-auto flex flex-col gap-6 mt-10'>
    <h1 className='text-3xl'>Login Now</h1>
    <Form {...LoginForm}>
      <form className='space-y-2.5' onSubmit={LoginForm.handleSubmit(handleLogin)}>

    <FormField
    control={LoginForm.control}
    name="email"
    render={({ field}) => (
      <FormItem>
        <FormLabel>Email:</FormLabel>
        <FormControl>
          <Input type='text' placeholder='example@mail.com' {...field}/> 

        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
      <FormField
    control={LoginForm.control}
    name="password"
    render={({ field}) => (
      <FormItem>
        <FormLabel>Password:</FormLabel>
        <FormControl>
          <Input type='password' placeholder='*********' {...field}/> 

        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />

 
<Link href="/forgetPassword" className='text-sm text- underline'>Forget Password?</Link>


        <Button type='submit' className='w-full bg-main mt-2 cursor-pointer'>Login</Button>

        <Link href="/register" className='text-sm text-center text- underline block'> Do not have an account? Register Now</Link>
      </form>

 
</Form>
    </div>
  )}