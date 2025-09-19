'use client'; 
import { createContext, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import {  WishlistData } from "./types/wishlist.type";
import { getWishlistData } from "./WishlistAction/WishListAction";


type ContextType ={
    countWishlist: number;
    setCountWishlist: React.Dispatch<React.SetStateAction<number>>;
}

export const CountWishlistContext = createContext<ContextType | null>( null)

export default function CountWishlistProvider({children }: {children: React.ReactNode}) {
const [countWishlist, setCountWishlist] = useState(0)

async function getWishlist(){
    
    const token = await getUserToken()
    if(token){
      const data: WishlistData =await  getWishlistData()
      
     const sumWishlist = data.data.reduce((total, item)=>total += item.quantity,0)
        setCountWishlist(sumWishlist)

       

    }
    
   
}
useEffect(()=>{
    getWishlist()
},[])


    return         <CountWishlistContext.Provider value={{countWishlist, setCountWishlist}}>
            {children}
        </CountWishlistContext.Provider>
    
}