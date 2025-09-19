'use client'
import { Button } from 'images/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'images/components/ui/form'
import React from 'react'
import {  useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"



export default function RestCode() {

  const schemaRestCode = z.object({
    resetCode: z.string().nonempty({message: "Reset code is required."}),
 })
  
  const RestCodeForm = useForm<z.infer<typeof schemaRestCode>>({
    defaultValues: {
    resetCode:"",
    
},resolver: zodResolver(schemaRestCode)
  })
 
  const Route = useRouter()
  async function handleRestCode(values: z.infer<typeof schemaRestCode>){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    console.log(data)
    if(data.status === "Success"){
      Route.push("/resetPassword")

    } else {
      toast.error(data.message,{position: "top-center"})
    }


  }
  
  return (
    <div className='w-full max-w-md mx-auto flex flex-col gap-6 mt-10  items-center  text-center' >
    <h1 className='text-3xl'>Check Your Email</h1>
    <Form {...RestCodeForm}>
      <form className='space-y-3 ' onSubmit={RestCodeForm.handleSubmit(handleRestCode)}>

    <FormField 
    control={RestCodeForm.control}
    name="resetCode"
    render={({ field}) => (
      <FormItem>
        <FormLabel>Reset Code:</FormLabel>
        <FormControl>
          
    <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  

        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
 
 



        <Button type='submit' className='w-full bg-main'>Verify Code</Button>
      </form>

 
</Form>
    </div>
  )}