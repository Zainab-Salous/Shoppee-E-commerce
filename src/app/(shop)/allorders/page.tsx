'use client'

import { Package, Truck, CheckCircle2 } from 'lucide-react'
import React from 'react'

export default function AllOrders() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Order is on the Way!</h1>
        <p className="text-gray-500 mb-6">
          Sit tight, your order is being processed and will be delivered soon.
        </p>

        <div className="flex flex-col items-center space-y-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-gray-700 font-medium">Order Confirmed</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full animate-bounce">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-gray-700 font-medium">On the Way</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 text-gray-400 p-3 rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-gray-400 font-medium">Delivered</span>
          </div>
        </div>

      
        <button
          onClick={() => window.location.href = '/'}
          className="mt-4 bg-main text-white py-2 px-6 rounded-lg shadow hover:bg-pink-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
