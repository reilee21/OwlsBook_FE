'use client'
import ErrorIcon from "@/components/icons/ErrorIcon";
import Container from "@/components/shared/Container";
import { useCallBackPaymentMutation } from "@/services/checkout/CheckoutApi";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";



export default function PaymentCancel(){
    const params = useSearchParams();
    const [updatepm] = useCallBackPaymentMutation(); 
    useEffect(()=>{
        const od = params.get('orderCode');
        if(od)
            callback(od);
    },[])
    const callback = async (od:string) => {
        await updatepm({transId:od});

    }
    return(
        <>
            <Container>
                <div className="card bg-white card-body mt-10 p-4 py-8 shadow max-w-lg mx-auto rounded-lg text-center items-center justify-center ">
                    <div className="mx-auto p-2 w-fit shadow rounded-full">
                        <ErrorIcon/>
                    </div>
                    <h1 className="text-center font-medium text-[#001E3F] p-2">Đặt hàng thất bại</h1>
                </div>
            </Container>
        </>
    )
}