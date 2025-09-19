'use client'

import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'images/components/ui/button';
import { getCartData, RemoveProduct, ClearCart, UpdateCartItemQuantity } from 'images/CartAction/CartAction';
import { cart, CartData } from 'images/types/cart.type';
import Image from 'next/image';
import { toast } from 'sonner';
import { CountContext } from 'images/CountProvider';
import Link from 'next/link';

export default function Cart() {
  const CountData = useContext(CountContext);
  const [currentId, setCurrentId] = useState<string>();
  const [countDisabled, setCountDisabled] = useState(false);

  const [cartLoading, setCartLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(false);

  const [cart, setCart] = useState<cart>();

  useEffect(() => { getAllCartData(); }, []);

  async function getAllCartData() {
    setCartLoading(true);
    const data: CartData = await getCartData();
    setCart(data.data);
    setCartLoading(false);
  }

  async function deleteProduct(id: string) {
    const data = await RemoveProduct(id);
    if (data.status === 'success') {
      toast.success('Product removed', { position: "top-center" });
      setCart(data.data);

      const sum = data.data.products.reduce((total: number, item: { count: number }) => total += item.count, 0);
      CountData?.setCount(sum);
    }
  }

  async function clearProducts() {
    const data = await ClearCart();
    if (data.message === 'success') {
      toast.success('Cart cleared', { position: "top-center" });
      getAllCartData();
      CountData?.setCount(0);
    }
  }

  async function updateProductCount(id: string, count: number) {
    setCurrentId(id);
    setCountLoading(true);
    setCountDisabled(true);
    const data = await UpdateCartItemQuantity(id, count);
    if (data.status === 'success') {
      setCart(data.data);
      const sum = data.data.products.reduce((total: number, item: { count: number }) => total += item.count, 0);
      CountData?.setCount(sum);
    }
    setCountLoading(false);
    setCountDisabled(false);
  }

  return (
    <div>
      <h1 className='text-3xl'>Shopping Cart</h1>
      {cartLoading ? (
        <div className='fixed top-0 left-0 w-full h-screen bg-pink-50 flex justify-center items-center'>
          <div className='loader'></div>
        </div>
      ) : (
        <>
          {cart?.totalCartPrice !== 0 ? (
            <>
              <h2 className='text-2xl text-main'>Total Price: <span className='text-red-600 font-bold'>${cart?.totalCartPrice}</span></h2>
              <Button onClick={clearProducts} className='bg-red-500 p-5 rounded-md float-right my-3'>Clear Cart</Button>
              <div className='clear-both'></div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-pink-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.products?.map((item) => (
                      <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <Image src={item.product.imageCover} width={100} height={100} alt={item.product.title} />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Button
                              disabled={countDisabled || item.count <= 1}
                              onClick={() => updateProductCount(item.product._id, item.count - 1)}
                              className="inline-flex cursor-pointer items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.count}</span>
                            <Button
                              disabled={countDisabled}
                              onClick={() => updateProductCount(item.product._id, item.count + 1)}
                              className="inline-flex cursor-pointer items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {item.price}
                        </td>
                        <td className="px-6 py-4">
                          <Button disabled={countDisabled} onClick={() => deleteProduct(item.product._id)} className="bg-red-600 text-white cursor-pointer">
                            <i className='fa-solid fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="row" colSpan={3} className="px-6 py-4 text-right text-lg font-bold text-gray-900 dark:text-white">
                        Total
                      </th>
                      <td className="px-6 py-4 text-lg font-bold text-red-600 " colSpan={3}>
                        ${cart?.totalCartPrice}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <Button className='bg-main text-white w-full p-5 mb-6'>
                <Link href={'/checkoutsession/' + cart?._id}>Check Out</Link>
              </Button>
            </>
          ) : (
            <h2 className='text-2xl text-main text-center m-5'>No products in the cart yet</h2>
          )}
        </>
      )}
    </div>
  );
}