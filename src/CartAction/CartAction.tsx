'use server'

import { getUserToken } from "images/getUserToken";
import { CartData } from "images/types/cart.type";

export async function  getCartData(){
    const token= await getUserToken()
    if(!token){
        throw new Error('User not authenticated')
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
        {
            headers:{
                token: token as string,
            }
        }
    );

    const data: CartData = await res.json();
    return data
    

}
 
export async function AddProductToCart(id:string){
const token = await getUserToken()
if(!token){
    throw new Error('User not authenticated')

}
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
    method:'POST',
        body:JSON.stringify({productId:id,quantity:1}),
    headers:{
        token:token as string,
        'Content-Type':'application/json'
    },
})
const data = await res.json();
return data
}

export async function RemoveProduct(id:string){
const token = await getUserToken()
if(!token){
    throw new Error('User not authenticated')

}
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
    method:'DELETE',
    headers:{
                        token: token as string,

    }
})
const data = await res.json();
return data


}

export async function ClearCart(){
    const token = await getUserToken()
if(!token){
    throw new Error('User not authenticated')

}
console.log(token);

const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,{
    method:'DELETE',
    headers:{
                token: token as string,
    }
})
const data = await res.json();
return data
}


export async function UpdateCartItemQuantity(id:string,count:number){
        const token = await getUserToken()
if(!token){
    throw new Error('User not authenticated')

}
const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,{
    method:'PUT',
    body:JSON.stringify({count}),
    headers:{
                token: token as string,
        'Content-Type':'application/json'
    }
})
const data = await res.json();
return data
}
