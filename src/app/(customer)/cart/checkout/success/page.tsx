'use client'
import SuccessIcon from "@/components/icons/SuccessIcon";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";
import { useCallBackPaymentMutation } from "@/services/checkout/CheckoutApi";



export default function PaymentSuccess (){
    const params = useSearchParams();
    const [updatepm] = useCallBackPaymentMutation(); 
    useEffect(()=>{
        const od = params.get('orderCode');
        if(od)
            callback(od);
    },[params])
    const callback = async (od:string) => {
         await updatepm({transId:od});
    }
    const router = useRouter();
    return(
        <>
            <Container>
                <div className="card card-body mt-10 p-4 shadow max-w-lg mx-auto rounded-lg text-center items-center justify-center bg-white ">
                    <div className="mx-auto p-2 w-fit shadow rounded-full text-green-700">
                        <SuccessIcon/>
                    </div>
                    <h1 className="text-center font-medium text-[#001E3F] p-2">Đặt hàng thành công</h1>
                    <Button className="mx-auto" variant={'outline'} onClick={()=>router.push('/customer/orders')}>Xem đơn hàng</Button>
                </div>
            </Container>
        </>
    )
}