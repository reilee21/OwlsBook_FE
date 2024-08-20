import { useState } from "react";


const CheckOutCartitem = ({item})=>{
    const [subtt,setSubtt] = useState((item.quantity * item.salePriceAfterDiscount));
    return(
            <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="shrink-0">
                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={'https://localhost:7000/File?image='+item.image}/>
                    </div>
                    <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                                <p className="text-base font-semibold text-gray-900">{item.bookTitle}</p>
                                <div className="flex ">
                                    {item.totalDiscount != 0 ? (
                                        <>
                                            <p className=" w-20 text-base font-semibold text-gray-600 sm:text-right line-through">
                                                {item.salePrice.toLocaleString()} đ
                                            </p>
                                            <p className=" w-20 text-base font-semibold text-gray-900 sm:text-right">
                                                {item.salePriceAfterDiscount.toLocaleString()} đ
                                            </p>
                                        </>
                                    ):(
                                        <>
                                            <p className=" w-20 text-base font-semibold text-gray-900 sm:text-right">
                                                {item.salePrice.toLocaleString()} đ
                                            </p>
                                        </>
                                    )}
                                
                                </div>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start ">
                                <div className="flex flex-col sm:order-2 sm:ml-8 shrink-0">
                                    <p className="shrink-0 w-30 text-base font-semibold text-gray-900 sm:text-right">
                                                    {subtt.toLocaleString()} đ
                                    </p>                       
                                </div>                  
                                <div className="sm:order-1">
                                    <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                
                                        <div className="rounded-xs flex w-10 items-center justify-center bg-gray-100
                                         text-center text-xs uppercase transition">
                                                {item.quantity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </li>
   )
}

export default CheckOutCartitem