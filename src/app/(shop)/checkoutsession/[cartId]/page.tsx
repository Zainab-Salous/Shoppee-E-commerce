'use client'

import { Button } from 'images/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'images/components/ui/form'
import { Input } from 'images/components/ui/input'
import { checkOutPayment } from 'images/OrderAction/OrderAction'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ✅ تعريف الـ schema بالـ Zod
const shippingSchema = z.object({
  details: z.string().min(5, 'Details must be at least 5 characters'),
  phone: z
    .string()
    .regex(/^01[0-9]{9}$/, 'Phone must be a valid Egyptian number (11 digits starting with 01)'),
  city: z.string().min(2, 'City is required'),
})

type ShippingForm = z.infer<typeof shippingSchema>

export default function CheckOutSession() {
  const { cartId }: { cartId: string } = useParams()

  const shippingForm = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      details: '',
      phone: '',
      city: '',
    },
  })

  async function checkOutSessionPayment(values: ShippingForm) {
    const data = await checkOutPayment(cartId, values)
    window.open(data.session.url, '_blank')
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl">Check Out Payment</h1>
      <Form {...shippingForm}>
        <form className="space-y-4" onSubmit={shippingForm.handleSubmit(checkOutSessionPayment)}>
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter address details" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="01XXXXXXXXX" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter city" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-main text-white w-1/2 cursor-pointer">Payment</Button>
        </form>
      </Form>
    </div>
  )
}
