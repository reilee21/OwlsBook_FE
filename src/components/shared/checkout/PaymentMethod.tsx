import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"


const PaymentMethod = ({setPM})=>{
    const [paymentMethod,setPaymentMethod] = useState(false)
    useEffect(()=>{
        setPM(paymentMethod)
    },[paymentMethod])
    return(<>
        <div className="mt-4 p-2">
            <Label >Phương thức thanh toán</Label>     
            <div className="grid lg:grid-cols-2 grid-cols-1 py-2 gap-4 text-center">
                <div onClick={()=>setPaymentMethod(false)}
                 className={`${!paymentMethod ? 'bg-[#001F40] text-white border-[#001F40]':'border-slate-700 hover:bg-slate-50'} rounded-md border-2  p-2  cursor-pointer transition duration-150 ease-out`}>
                    <Label className="cursor-pointer">Thanh toán khi nhận hàng</Label> 
                </div>
                <div onClick={()=>setPaymentMethod(true)}
                className={`${paymentMethod ? 'bg-[#001F40] text-white border-[#001F40]':'border-slate-700 hover:bg-slate-50'} rounded-md border-2  p-2  cursor-pointer transition duration-150 ease-out`}>
                    <Label className="cursor-pointer">Thanh toán VietQR</Label> 
                </div>
            </div>  
           
        </div>
    </>)
}
export default PaymentMethod