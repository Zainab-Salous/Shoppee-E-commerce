'use client';

import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'images/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import { getWishlistData, RemoveProductFromWishlist } from 'images/WishlistAction/WishListAction';
import { CountWishlistContext } from 'images/CountWishlistProvider';
import AddCartButton from 'images/app/_Component/ProductCard/AddCartButton';
import { wishlist, WishlistData } from 'images/types/wishlist.type';

export default function Wishlist() {
  const CountWishlistData = useContext(CountWishlistContext);

  const [wishlist, setWishlist] = useState<wishlist[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllWishlistData();
  }, []);

  
  async function getAllWishlistData() {
    try {
      setWishlistLoading(true);
      const data: WishlistData = await getWishlistData();
      setWishlist(data.data);
      const sumWishlist = data.data.reduce((total, item) => total + (item.quantity ?? 1), 0);
      CountWishlistData?.setCountWishlist(sumWishlist);
    } catch (err) {
      toast.error('Failed to fetch wishlist');
    } finally {
      setWishlistLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    try {
      const data = await RemoveProductFromWishlist(id);
      if (data.status === 'success') {
        toast.success('Product removed', { position: 'top-center' });
        setWishlist(data.data);

        const sumWishlist = data.data.reduce((total: number, item: wishlist) => total + (item.quantity ?? 1), 0);
        CountWishlistData?.setCountWishlist(sumWishlist);
      }
    } catch (err) {
      toast.error('Failed to remove product');
    }
  }

  return (
    <div>
      <h1 className="text-3xl">Wishlist</h1>

      {wishlistLoading ? (
        <div className="fixed top-0 left-0 w-full h-screen bg-pink-50 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {wishlist.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-pink-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">Product</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Image
                          src={item.imageCover}
                          width={100}
                          height={100}
                          alt={item.title}
                          className="rounded-md object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.title}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${item.price}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <Button
                          onClick={() => deleteProduct(item._id)}
                          className="bg-red-600 text-white cursor-pointer"
                          aria-label="Remove from wishlist"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                        <AddCartButton id={item._id} isInWishlist={true} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-2xl text-main text-center m-5">No products in the wishlist yet</h2>
          )}
        </>
      )}
    </div>
  );
}
