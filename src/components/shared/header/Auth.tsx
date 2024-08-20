

import Link from "next/link";
import React, { useEffect, useState } from "react";
import User from "@/components/icons/User";

import OutsideClick from '../OutsideClick';
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import Logout from './../../icons/Logout';
import { useRouter } from "next/navigation";
import {useLoginMutation, useLogoutMutation} from "@/services/auth/Auth"
import { useDispatch, useSelector } from "react-redux";
import { setToken,clearTokens } from "@/redux/authSlice";
import {jwtDecode} from "jwt-decode"
import { CiShop } from "react-icons/ci";
import { updateCartState } from "@/redux/cartSlice";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {signOut} = useClerk();
  const {user,isSignedIn} = useUser();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const role = useSelector((state)=>state.auth.role)
  const [usRole,setUsRole] = useState('')
  useEffect(()=>{
    if(role) {
      setUsRole(role)
    }
  },[role])

  useEffect(()=>{
    if(isSignedIn){
      const email = user?.primaryEmailAddress?.emailAddress;
      const clerkID = user?.id;
      const username = user?.username
      const credentials = {
        Email: email,
        ClerkID: clerkID,
        Username: username
      };
      handleLogin(credentials);
    }
  },[isSignedIn])

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials).unwrap();
      if (response) {
        const atk = response.accessToken;
        const rtk = response.refreshToken;
        const decode = jwtDecode(atk);
        dispatch(setToken({user:user, accessToken:atk,refreshToken:rtk,role:decode.role}));

      } 
    } catch (error) {
      console.error('Login error:', error);
    }
    dispatch(updateCartState(1))

  };
  const handleLogout = async () =>{
    dispatch(clearTokens())
    const clerkID = user?.id.toString();
    await logout({uid:clerkID}).unwrap();
    location.reload();
    return;

  }
  return (
    <>
      <button
        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        onClick={() => {setIsOpen(!isOpen)}}
      >
        <User className="h-6 w-6" />
      </button>
      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute top-full right-0 w-60 h-fit bg-white border rounded p-2 flex flex-col gap-y-2.5 z-50"
        >
          {!user && !isSignedIn ? (
            <>
            <Link
                href="/auth/signin"
                className="auth-sign w-full flex
                 flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded "
              >
                <article className="whitespace-normal">
                  <h2 className="text-sm">Đăng nhập</h2>
                </article>
              </Link>
              <Link
                href="/auth/signup"
                className="auth-sign w-full flex flex-row items-start gap-x-2 p-2 
                border border-transparent hover:border-black rounded"
              >              
                <article className="whitespace-normal">
                  <h2 className="text-sm">Đăng ký</h2>
                </article>
              </Link>
            
             
            </>
           ) : ( 
            <>
            <div className="flex flex-col gap-y-2 cursor-pointer bg-white z-50 ">
              <div  onClick={()=>router.push("/customer")}
                className="flex flex-row gap-x-2 p-4 border-[1px] border-white hover:border-slate-700 rounded-sm">    
              
                <img
                    src={`${user?.imageUrl}`}
                    alt="Error"
                    height={50}
                    width={50}
                    className="rounded object-cover h-[50px] w-[50px]"
                  />
           
                <article className="flex flex-col">
                  <h2 className="line-clamp-1">{user.username}</h2>
                  <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                   {user.fullName?user.fullName:"Khách"}
                  </p>
                  <p className="flex flex-row gap-x-2 mt-1.5">
                    {usRole && !usRole.match('customer')&&(
                      <span className="px-2 border border-purple-900 text-purple-900 bg-purple-50 rounded-primary text-xs w-fit">
                     {usRole}
                    </span>  
                    )}
                                      
                  </p>
                </article>
              </div>
              <hr />
              {usRole && !usRole.match('customer')&&(
                  <>
                  <div  onClick={()=>router.push("/admin")}
                    className="flex flex-row gap-x-2 p-4 border-[1px] border-white hover:border-slate-700 rounded-sm">    

                    <article className="flex flex-row items-center gap-2">
                      <CiShop size={24} />
                      <h2 className="line-clamp-1">

                        Quản lý
                      </h2>
                      
                      
                    </article>
                  </div>
                  <hr />
                  
                  </>
              )}
             
              <div onClick={() =>{handleLogout(); signOut({ redirectUrl: '/' })}}
              className="w-full flex flex-row items-center gap-x-2 p-2 bg-white z-50 border border-transparent hover:border-black rounded cursor-pointer">
                <span className="bg-sky-500/5 p-1 rounded">
                  <Logout />
                </span>
                <article
                  className="whitespace-nowrap"                 
                >
                  <h2 className="text-md">Đăng xuất</h2>
                </article>
              </div>
            </div> 
            </> 
          )}
        </OutsideClick>
      )}
    </>
  );
};

export default Auth;
