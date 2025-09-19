'use client'
import { Button } from 'images/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'images/components/ui/form'
import { Input } from 'images/components/ui/input'
import React from 'react'
import {  useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


export default function ResetPassword() {

  const schemaResetPassword = z.object({
    email: z.string().email({message: "Invalid email address."}),
    newPassword: z.string().min(6, {message: "Password should be at least 6 characters."}).max(50, {message: "Password should be at most 50 characters."}),
 })
  
  const ResetPasswordForm = useForm<z.infer<typeof schemaResetPassword>>({
    defaultValues: {
    email:"",
    newPassword:"",
    
},resolver: zodResolver(schemaResetPassword)
  })
 
  const Route = useRouter()
  async function handleResetPassword(values: z.infer<typeof schemaResetPassword>){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    console.log(data)
    if(data.token){
   
      Route.push("/login")

    } else {
      toast.error(data.message,{position: "top-center"})
    }


  }
  
  return (
    <div className='w-full max-w-md mx-auto flex flex-col gap-6 mt-10'>
    <h1 className='text-3xl'>New Password</h1>
    <Form {...ResetPasswordForm}>
      <form className='space-y-2.5' onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}>

    <FormField
    control={ResetPasswordForm.control}
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
    control={ResetPasswordForm.control}
    name="newPassword"
    render={({ field}) => (
      <FormItem>
        <FormLabel>New Password:</FormLabel>
        <FormControl>
          <Input type='password' placeholder='*********' {...field}/> 

        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />

 


        <Button type='submit' className='w-full bg-main mt-2'>Reset Password</Button>

      </form>

 
</Form>
    </div>
  )}