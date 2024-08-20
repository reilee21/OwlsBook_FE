import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SuccessIcon from "@/components/icons/SuccessIcon";
import { useEffect, useState } from "react";
import { useApplyVoucherMutation } from "@/services/checkout/CheckoutApi";
import { useDispatch } from "react-redux";
import { setApplyVoucher } from "@/redux/checkoutSlice";

const Voucher = ({setVC}) =>{
    const [vcER,setVcER] = useState({status:false, mess:'123'})
    const [voucher,setVoucher] = useState('')
    const [applyvc] = useApplyVoucherMutation();
    const dispatch = useDispatch();
    const ApplyVoucher = async () =>{
        try{
            var rs = await applyvc({code:voucher});
            if(rs.data && rs.data.message){
                setVcER({status:true,mess:rs.data.message})
                setTimeout(()=>setVcER({status:false,mess:''}),2500);
                dispatch(setApplyVoucher({}))

            }else{
                dispatch(setApplyVoucher(rs.data));
            }

        }catch(e){
            console.error(e)
        }
    }
    const changeVC = (val) =>{
        setVC(val);
        setVoucher(val)
    }


    return(<>
        
        <Label className="p-2 mt-8">Mã giảm giá</Label>
        <div className="mt-2">
            <div className="flex flex-row gap-2">
                <div className="w-full">
                  <Input value={voucher} onChange={(e)=>changeVC(e.target.value)} type="text" placeholder="Nhập mã giảm giá"/>
                </div>
                <div onClick={ApplyVoucher} 
                    className="min-w-fit rounded-lg px-4 py-2 text-white bg-indigo-900 hover:bg-indigo-800 text-sm font-medium cursor-pointer transition ease-in-out delay-50">
                    Áp dụng
                </div>
            </div>
            {vcER.status &&(
                <h5 className="text-red-700 px-4 pt-2">{vcER.mess}</h5>
            )}
        </div>
    </>)
}

export default Voucher