

"use client";

import React, { useState,useEffect } from "react";
import Image from "next/image";
import Auth from "./Auth";
import Container from '../Container';
import Cart from '../../icons/Cart';
import SearchTab from './SearchTab';
import { useRouter } from "next/navigation";
import {useGetCartQuery} from '@/services/cart/CartApi'
import { useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";

const Header = () => {
  const router = useRouter();
  const [bagCart,setBagCart] = useState(0)
  const {data,refetch} = useGetCartQuery();
  const cartchange = useSelector((state)=>state.cart.update);
  const {isSignedIn} = useUser();
  useEffect(() => {
    if (data) {
      const totalQuantity = data.reduce((acc, item) => acc + item.quantity, 0);
      setBagCart(totalQuantity);
    }
  }, [data]);
  useEffect(()=>{
    refetch()
  },[cartchange])



  return (
    <>
    <div className="bg-white w-full">
      <Container>
        <nav className="rounded-xl p-4 flex flex-row justify-between">
          <div className="flex flex-row gap-x-4 items-center relative">
            <Image
              priority={true}
              src="/logo.png"
              alt="logo"
              width={141}
              height={40}
              className="h-[40px] object-contain block cursor-pointer"
              onClick={() => router.push(`/`)}
            />

            <div className="border-l h-7 rounded" />

          </div>
          <div className="flex flex-row gap-x-2 relative">
            <SearchTab/>
            
            <Auth />
            <div onClick={() => router.push(`/cart`)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer relative">
                <Cart className="h-6 w-6" />
                {isSignedIn && (
                  <span className="absolute top-0 right-0  inline-flex items-center justify-center p-1 text-xs font-semibold leading-none text-white bg-gray-900 rounded-full">
                    {bagCart}
                  </span>
                )}
              </div>
          </div>
        </nav>
      </Container>
     
    </div>
    </>
  );
};

export default Header;
