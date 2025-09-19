'use server'

import { getUserToken } from "images/getUserToken";
import { WishlistData } from "images/types/wishlist.type";

export async function  getWishlistData(){
    const token= await getUserToken()
    if(!token){
        throw new Error('User not authenticated')
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
        {
            headers:{
                                token: token as string,

            }
        }
    );

    const data: WishlistData = await res.json();
    return data
    

}
 
export async function AddProductToWishlist(id:string){
const token = await getUserToken()
if(!token){
    throw new Error('User not authenticated')

}
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,{
    method:'POST',
        body:JSON.stringify({productId:id,quantity:1}),
    headers:{
                token: token as string,
        'Content-Type':'application/json'
    },
})
const data = await res.json();
return data
}

export async function RemoveProductFromWishlist(id:string){
const token = await getUserToken()
if(!token){
    throw new Error('User not authenticated')

}
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,{
    method:'DELETE',
    headers:{
                token: token as string,
    }
})
const data = await res.json();
return data


}



