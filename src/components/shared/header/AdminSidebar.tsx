'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes, FaBox  } from "react-icons/fa";
import {FaPeopleGroup,FaTags } from "react-icons/fa6"
import { IoPeopleCircle } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { TiThList } from "react-icons/ti";
import { MdReviews } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { PiArrowFatLinesUpDuotone  } from "react-icons/pi";


import NavItem from "./NavItem";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  const role = useSelector((state)=>state.auth.role)
  const [usRole,setUsRole] = useState('')
  useEffect(()=>{
    if(role) {
      setUsRole(role)
      if(!role.match('admin')){
        router.push("/")
      }      
    }else{
      router.push("/")

    }
  },[role])

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <FaBars />
          </button>
          {/* Brand */}
              
          <div onClick={()=>router.push('/admin')}
            className="flex flex-row p-2 items-center cursor-pointer text-gray-800">
            <img height={28} width={28} className="object-cover" src="/logoicon.png"/>
            <h5
              className="md:block text-center text-blue-950 mr-0 inline-block whitespace-nowrap text-md uppercase font-bold p-2 "
            >
              Owls Book
             </h5>
          </div>

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 ">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <div onClick={()=>router.push('/admin')}
                    className="flex flex-row p-2 items-center cursor-pointer text-gray-800">
                    <img height={28} width={28} className="object-cover" src="/logoicon.png"/>
                    <h5
                      className="md:block text-center text-blue-950 mr-0 inline-block whitespace-nowrap text-md uppercase font-bold p-2 "
                    >
                      Owls Book
                    </h5>
                  </div>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FaTimes/>
                  </button>
                </div>
              </div>
            </div>

            {(usRole==='admin')&&(
              <>
                <hr className="my-4 md:min-w-full" />

                <ul className="md:flex-col md:min-w-full flex flex-col list-none gap-1">
                  <li className="items-center">
                    <NavItem path="/admin/account" label="Tài khoản" icon={IoPeopleCircle} />
                  </li>
                  <li className="items-center">
                    <NavItem path="/admin/employee" label="Nhân viên" icon={FaPeopleGroup} />
                  </li>
                  <li className="items-center">
                    <NavItem path="/admin/voucher" label="Mã giảm giá" icon={FaTags} />
                  </li>
                  <li className="items-center">
                    <NavItem path="/admin/discount" label="Khuyến mãi" icon={RiDiscountPercentFill } />
                  </li>
                  <li className="items-center">
                    <NavItem path="/admin/suggest" label="Gợi ý nhập sách" icon={PiArrowFatLinesUpDuotone } />
                  </li>
                </ul>
              </>
            )}
            
            {(usRole==='admin' || usRole==='product-admin')&&(
              <>
                  <hr className="my-4 md:min-w-full" />

                  <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4 gap-1">
                    <li className="items-center">
                      <NavItem path="/admin/product" label="Sản phẩm" icon={FaBox} />
                    </li>
                    <li className="items-center">
                     <NavItem path="/admin/category" label="Danh mục sản phẩm" icon={BiSolidCategory } />
                    </li>
                  </ul>
              </>
            )}
            {(usRole==='admin' || usRole==='order-admin')&&(
              <>
                <hr className="my-4 md:min-w-full" />

                <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4 gap-1">
                <li className="items-center">
                <NavItem path="/admin/order" label="Đơn hàng" icon={TiThList  } />
                </li>
                <li className="items-center">
                   <NavItem path="/admin/review" label="Đánh giá sản phẩm" icon={MdReviews} />
                </li>
                <li className="items-center">
                   <NavItem path="/admin/delivery" label="Thông tin vận chuyển" icon={FaTruckFast  } />
                </li>
                </ul>

              </>
            )}

            <hr className="my-4 md:min-w-full" />
            
          </div>
        </div>
      </nav>
    </>
  );
}
