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


export default function ForgetPassword() {

  const schemaForgetPassword = z.object({
    email: z.string().email({message: "Invalid email address."}),
 })
  
  const ForgetPasswordForm = useForm<z.infer<typeof schemaForgetPassword>>({
    defaultValues: {
    email:"",
    
},resolver: zodResolver(schemaForgetPassword)
  })
 
  const Route = useRouter()
  async function handleForgetPassword(values: z.infer<typeof schemaForgetPassword>){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    console.log(data)
    if(data.statusMsg === "success"){
      Route.push("/resetCode")

    } else {
      toast.error(data.message,{position: "top-center"})
    }


  }
  
  return (
    <div className='w-full max-w-md mx-auto flex flex-col gap-6 mt-10'>
    <h1 className='text-3xl'>Forget Password?</h1>
    <Form {...ForgetPasswordForm}>
      <form className='space-y-2.5' onSubmit={ForgetPasswordForm.handleSubmit(handleForgetPassword)}>

    <FormField
    control={ForgetPasswordForm.control}
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
 
 



        <Button type='submit' className='w-full bg-main'>Send Email</Button>
      </form>

 
</Form>
    </div>
  )}