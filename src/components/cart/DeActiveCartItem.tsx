import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedBook } from "@/redux/bookSlice";
import { useRemoveCartItemMutation } from '@/services/cart/CartApi'


const DeActiveCartItem = ({item,setChange}) =>{
    const router = useRouter();
    const dispatch = useDispatch();
    if(!item) return <h1>sos</h1>
    const [value,setValue] = useState(item.quantity);
    const [remove] = useRemoveCartItemMutation();
  

    const detailsPage = ()=> {
        dispatch(setSelectedBook(item))

        router.push(`/books/${item.bookTitle}`)
    }
    const removeitem = async () =>{
        try{
            var rs = await remove({id:item.id});
            if(rs.data)
                setChange(true); 
        }catch(e){
            console.error(e)
        }
    }
    return(<>
     <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
        <div className="shrink-0" onClick={detailsPage}>
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
                                       Hết hàng
                        </p>                       
                    </div>                  
                    <div className="sm:order-1">
                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                            <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition "
                            >-</button>
                       
                            <input disabled
                                type="text"
                                
                                min="1"
                                value={value}
                                className="flex w-10 items-center justify-center bg-gray-100 text-center text-xs uppercase transition"
                                />
                            <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition "
                            
                            >+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                <button onClick={removeitem} 
                type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 ">
                    <svg className="h-5 w-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" ></path>
                    </svg>
                </button>
            </div>
        </div>
    </li>
    </>)
}

export default DeActiveCartItem