'use client'
import EmptyCart from "@/components/cart/Empty"
import ShowCart from "@/components/cart/ShowCart";
import {useGetCartQuery} from '@/services/cart/CartApi'
import { useEffect } from "react";
import { Loading } from "@/components/shared/Loading";
import { useUser } from "@clerk/nextjs";



const CartPage = ()=>{
    const {isSignedIn} = useUser();
    useEffect(()=>{
        if(!isSignedIn) location.replace("/auth/signin")
    },[isSignedIn])
    const {data,refetch,isLoading} = useGetCartQuery();
    useEffect(()=>{refetch()},[])
    useEffect(()=>{
        refetch()
    },[data])
    if(isLoading) return(
            <div className="w-full ">
                <div className="w-full shadow-inner text-[#001f3f] h-[100px] flex items-center justify-center">
                    <h1 className="text-center text-4xl font-bold tracking-wider w-full">Giỏ hàng</h1>
                </div>

                <div className="w-full">
                     <Loading/>
                </div>
            </div>

    )

    if(data && data.length == 0){
        return(<>
            <div className="w-full ">
                <div className="w-full shadow-inner text-[#001f3f] h-[100px] flex items-center justify-center">
                    <h1 className="text-center text-4xl font-bold tracking-wider w-full">Giỏ hàng</h1>
                </div>

                <div className="w-full">
                     <EmptyCart/>
                </div>
            </div>
           
        </>)
    }
    
    
    return(<>
        <div className="w-full ">
            <div className="w-full shadow-inner text-[#001f3f] h-[100px] flex items-center justify-center">
                <h1 className="text-center text-4xl font-bold tracking-wider w-full">Giỏ hàng</h1>
            </div>
     
            <ShowCart carts={data} refetch={refetch} />


        </div>
       
    </>)
}

export default CartPage