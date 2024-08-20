
'use client'
import { useEffect, useState } from "react";
import CheckOutCart from '@/components/checkout/Carts';
import CheckOutInfo from '@/components/checkout/Info';
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/services/profile/profileApi";
import { useCheckoutQuery, useGetShippingFeeMutation, usePlaceOrderMutation } from "@/services/checkout/CheckoutApi";
import { useSelector } from "react-redux";
import { SuccessModal } from "@/components/shared/SuccessModal";
import { ModalLayout } from "@/components/shared/Modal";
import { LoadingModal } from "@/components/shared/LoadingModal";
import SuccessPlaceOrder from "@/components/shared/checkout/ModalSuccessCheckout";



const Checkout = ()=>{
    const {data:user} = useGetProfileQuery();
    const {data:carts,refetch} = useCheckoutQuery(); 
    const [getShipFee] = useGetShippingFeeMutation();
    const [placeOrder,{isLoading,isSuccess}] = usePlaceOrderMutation();

    const applyVC = useSelector((state)=>state.checkout.voucher);
    const [subtotal,setSubtotal] = useState(0);
    const [shippingFee,setShippingFee] = useState(0);
    const [voucherDC,setVoucherDC] = useState(0);
    const [voucherSCModal,setVoucherSCModal] = useState(false);
    const [pay,setPay] = useState({}); 
    useEffect(()=>{refetch()},[])
    useEffect(()=>{
        if(applyVC && applyVC.code){
            var dc = 0;
            if(applyVC.type=='Percentage'){
                dc += subtotal*applyVC.value/100
            }
            else{
                dc += applyVC.value
            }
            setVoucherDC(dc);
            setVoucherSCModal(true);
            setTimeout(()=>setVoucherSCModal(false),1500)
        }
        
    },[applyVC])
    const [ckInfo,setCkInfo] = useState({
        name:'',
        phoneNumber:'',
        city:'',
        district:'',
        ward:'',
        address:'',
        voucher:'',
        paymentMethod:0
    })
    useEffect(()=>{
        if(user){
            setCkInfo(prevCkInfo => ({
                ...prevCkInfo,
                name: user.customerName || prevCkInfo.name,
                phoneNumber: user.phoneNumber || prevCkInfo.phoneNumber,
                city: user.city || prevCkInfo.city,
                district: user.district || prevCkInfo.district,
                ward: user.ward || prevCkInfo.ward,
                address: user.address || prevCkInfo.address,
            }));
        }
    },[user])

 

    const submit = async () =>{
        const ck = { ...ckInfo };
        ck.carts = carts;   
        try{
            var rs = await placeOrder(ck);
            console.log(rs.data);
            if(rs.data && rs.data.payment){
                setPay(rs.data.payment);
            }
        }catch(e){
            console.error(e);
        }
    }

    useEffect(()=>{
        if(carts){
            const subtotal = carts.reduce((accumulator, item) => {
                return accumulator + item.quantity * item.salePriceAfterDiscount;
            }, 0);
            setSubtotal(subtotal)
        }
        
    },[carts])
    useEffect(() => {
        const fetchShipFee = async () => {
            if(!ckInfo.city) return
            try {
                const rs = await getShipFee({ city: ckInfo.city, district: ckInfo.district });
                setShippingFee(rs.data.shippingFee)
            } catch (e) {
                console.error(e);
            }
        };
        fetchShipFee();
    }, [ckInfo.city, ckInfo.district]);

    if(!carts) return (<h1>...</h1>) 
    return(<>
        <Container>
            <div className="grid grid-rows-2 lg:grid-flow-col lg:grid-rows-1 gap-2 w-full mt-4">    
                <div className="row-span-2">
                    <CheckOutCart cart={carts}/> 


                </div>
                <div>
                    <div className="lg:sticky lg:top-0 bg-white rounded-lg shadow pb-2">
                        <CheckOutInfo setCkInfo={setCkInfo} ckInfo={ckInfo}/>                          
                        <div className="w-full">
                            <hr/>
                        </div>
                        <div className="flex flex-row justify-between p-2 mx-2">
                             <h5 className="text-md">Tạm tính</h5>
                            <h5 className="text-lg font-medium ">{subtotal.toLocaleString()} đ</h5>
                        </div>
                        <div className="flex flex-row justify-between p-2 mx-2">
                             <h5 className="text-md">Phí vận chuyển</h5>
                            <h5 className="text-lg font-medium ">{shippingFee.toLocaleString()} đ</h5>
                        </div>
                        <div className="flex flex-row justify-between p-2 mx-2">
                             <h5 className="text-md">Voucher</h5>
                            <h5 className="text-lg font-medium ">- {voucherDC.toLocaleString()} đ</h5>
                        </div>
                        <div className="flex flex-row justify-between p-2 mx-2">
                             <h5 className="text-lg">Tổng tiền</h5>
                            <h5 className="text-xl font-semibold ">{ (subtotal+ shippingFee - voucherDC).toLocaleString()} đ</h5>
                        </div>
                        <div className="mx-4 my-2">
                            <Button className="w-full" onClick={submit}> ĐẶT HÀNG</Button>
                        </div>
                    </div>
                </div>
                {voucherSCModal&&(
                    <SuccessModal message={'Áp dụng mã giảm giá thành công'} onClose={()=>setVoucherSCModal(false)}/>

                )}
            </div>
            {isLoading &&(
                <LoadingModal message={'Đang xử lí đơn hàng'}/>
            )}
           
            {isSuccess && (
                 <SuccessPlaceOrder payment={pay}/>
            )}
        </Container>      

    </>)
}

export default Checkout