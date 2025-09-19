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


export default function Register() {

  const schemaRegister = z.object({
    name: z.string().nonempty({message: "Name is required."}).min(2, {message: "Name should be at least 2 characters."}).max(50, {message: "Name should be at most 50 characters."}),
    email: z.string().email({message: "Invalid email address."}),
    password: z.string().min(6, {message: "Password should be at least 6 characters."}).max(50, {message: "Password should be at most 50 characters."}),
    rePassword: z.string().min(6, {message: "Password should be at least 6 characters."}).max(50, {message: "Password should be at most 50 characters."}),
phone: z.string()
  .regex(/^(?:(?:\+20|0020)\s?1[0125]\s?\d{4}\s?\d{4}|01[0125]\s?\d{4}\s?\d{4})$/, { message: "Invalid Egyptian phone number." }),
  }).refine((obj)=>{
    return obj.password === obj.rePassword
  }, {
    message: "Passwords do not match.",
    path: ["rePassword"]
  })
  
  const RegisterForm = useForm<z.infer<typeof schemaRegister>>({
    defaultValues: {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
},resolver: zodResolver(schemaRegister)
  })
 
  const Route = useRouter()
  async function handleRegister(values: z.infer<typeof schemaRegister>){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    console.log(data)
    if(data.message === "success"){
      toast.success("Registered successfully, you can now log in.",{position: "top-center"})
      RegisterForm.reset()
      Route.push("/login")

    } else {
      toast.error(data.message,{position: "top-center"})
    }


  }
  
  return (
    <div className='w-full max-w-md mx-auto flex flex-col gap-6 mt-10'>
    <h1 className='text-3xl'>Register Now</h1>
    <Form {...RegisterForm}>
      <form className='space-y-2.5' onSubmit={RegisterForm.handleSubmit(handleRegister)}>
        <FormField
    control={RegisterForm.control}
    name="name"
    render={({ field}) => (
      <FormItem>
        <FormLabel>Name:</FormLabel>
        <FormControl>
          <Input type='text' placeholder='Your Name' {...field}/> 

        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
    <FormField
    control={RegisterForm.control}
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
    control={RegisterForm.control}
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

    <FormField
    control={RegisterForm.control}
    name="rePassword"
    render={({ field}) => (
      <FormItem>
        <FormLabel>Confirm Password:</FormLabel>
        <FormControl>
          <Input type='password' placeholder='*********' {...field}/> 

        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
  
    <FormField
    control={RegisterForm.control}
    name="phone"
    render={({ field}) => (
      <FormItem>
        <FormLabel>Phone Number:</FormLabel>
        <FormControl>
          <Input type='tel' placeholder='0123456789' {...field}/> 

        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />



        <Button type='submit' className='w-full bg-main'>Register</Button>
      </form>

 
</Form>
    </div>
  )}