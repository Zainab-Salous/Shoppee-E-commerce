"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { CountContext } from "images/CountProvider";
import { CountWishlistContext } from "images/CountWishlistProvider";

export function Navbar() {
  const { data, status } = useSession();
  const pathname = usePathname(); 

  const CountData = useContext(CountContext)
  const CountWishlistData = useContext(CountWishlistContext)


  const MenuItems: { path: string; content: string; protected: boolean }[] = [
    { path: "/products", content: "Products", protected: false },
    { path: "/category", content: "Categories", protected: false },
    { path: "/brands", content: "Brands", protected: false },
  ];

  const MenuAuthItems: { path: string; content: string }[] = [
    { path: "/login", content: "Login" },
    { path: "/register", content: "Register" },
  ];

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <NavigationMenu className="max-w-full justify-between shadow-2xl p-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
              <Image src={"/images/logo.png"} alt="logo" width={40} height={40} />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {MenuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <NavigationMenuItem key={item.path}>
              {item.protected && status === "authenticated" && (
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} ${
                    isActive ? "text-main" : ""
                  }`}
                >
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              )}
              {!item.protected && (
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} ${
                    isActive ? "text-main " : ""
                  }`}
                >
                  <Link href={item.path}>{item.content}</Link>
                </NavigationMenuLink>
              )}

         
            </NavigationMenuItem>
          );
        })}

        {
          status == "authenticated" && <NavigationMenuItem>

            
              <NavigationMenuLink        asChild
                  className={`${navigationMenuTriggerStyle()} position-relative `}
                >
                  <Link href={'/allorders'} className="relative">Orders</Link>
                  
                </NavigationMenuLink>

           

              <NavigationMenuLink        asChild
                  className={`${navigationMenuTriggerStyle()} position-relative `}
                >
                  <Link href={'/wishlist'} className="relative">Wishlist <span className="absolute -top-0.5 -right-0.5 text-white bg-main rounded-full w-5 h-5 flex justify-center items-center ">{CountWishlistData?.countWishlist}</span></Link>
                  
                </NavigationMenuLink>

           
                <NavigationMenuLink        asChild
                  className={`${navigationMenuTriggerStyle()} position-relative `}
                >
                  <Link href={'/cart'} className="relative">Cart <span className="absolute -top-0.5 -right-0.5 text-white bg-main rounded-full w-5 h-5 flex justify-center items-center ">{CountData?.count}</span></Link>
                  
                </NavigationMenuLink>
              </NavigationMenuItem>
        }
            
      </NavigationMenuList>

      <NavigationMenuList>
        {status === "authenticated" ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <span className="bg-main text-white p-5">
                  Hello {data?.user.name}
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <span onClick={logout}>Logout</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            {MenuAuthItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} ${
                      isActive ? "text-main " : ""
                    }`}
                  >
                    <Link href={item.path}>{item.content}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
