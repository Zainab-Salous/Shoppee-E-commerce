'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){
const cookieData = await cookies()
const encryptedToken = cookieData.get("next-auth.session-token")?.value


const data = await decode({  token: encryptedToken , secret: process.env.NEXTAUTH_SECRET! })


return data?.token



}