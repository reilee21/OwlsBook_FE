'use client'
import { useGetOrdersByIdManageQuery, useUpdateOrdersManageMutation } from "@/services/order/orderApi";
import { useParams } from "next/navigation"
import { LoadingModal } from "@/components/shared/LoadingModal";
import OrderInfo from "@/components/orderManage/orderInfo";
import OrderCusInfo from "@/components/orderManage/orderCusInfo";
import OrderPayInfo from "@/components/orderManage/orderPayInfo";
import OrderItems from "@/components/orderManage/orderItems";


import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { status } from "@/components/shared/customer/Order";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function OrderManage(){
    const router = useRouter();
    const role = useSelector((state)=>state.auth.role)
    useEffect(()=>{
      if(role) {
        if(role!=='admin' && role !== 'order-admin'){
          router.push("/");
          return;
        } 
      }
    },[role])

    const params = useParams();
    const orderId = params.orderid;
    const {toast} = useToast();
    const {data,isLoading,refetch} = useGetOrdersByIdManageQuery({
        id:orderId
    }) 
    const [updateOd] = useUpdateOrdersManageMutation();

    const handleChange = (val) =>{
        setOdStatus(val)
    }
    const [odStatus,setOdStatus] = useState('');
    const [isPaid,setIsPaid] = useState(false);
    useEffect(()=>{
        if(data){
            setOdStatus(data.status)
            setIsPaid(data.isPaid)
        } 
    },[data])
    useEffect(()=>{
        if(odStatus==='Cancelled'){
            setIsPaid(false)
        }
        else if(odStatus==='Delivered'){
            setIsPaid(true)
        }else{
            setIsPaid(data?.isPaid)
            
        }
    },[odStatus])

    const update = async ()=>{
        const dt = {
            orderId:data?.orderId,
            status:odStatus,
            isPaid:isPaid
        }
        try {
            var rs =  await updateOd(dt); 
            if(rs.error){
                toast({title:"Cập nhật thất bại", description: rs.error.data.message, variant: "destructive" });
                refetch();
                return;
            }
            if(rs){
                toast({ description: "Cập nhật thành công." ,variant:"success"});
                refetch();
            }
            
         } catch (error) {

             toast({ description: "Cập nhật thất bại", variant: "destructive" });
         }
    }

    if(isLoading) return <LoadingModal message={"Vui lòng đợi trong giây lát."}/>

    return(
        <>
        <div className="rounded-t mb-0 py-3 border-0 bg-white mt-2">
                <div className="flex flex-wrap items-center">
                    <div className=" w-full px-4 max-w-full flex flex-row justify-between">
                        <h3
                            className="font-semibold text-md w-full" 
                        >
                            Đơn hàng:  <span className="font-normal">{data.orderId} </span>
                        </h3>
                        <h3 className="whitespace-nowrap">
                            Ngày đặt: {format(new Date(data.createAt), 'HH:mm:ss dd-MM-yyyy')}
                        </h3>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="px-4 mt-2 flex flex-row gap-4 items-center">
                                {isPaid ? (
                                    <Button  disabled>Đã thanh toán</Button>
                                ):(
                                    <Button  disabled={odStatus === 'Cancelled'|| odStatus === 'CustomerCancelled'} onClick={()=>setIsPaid(true)}>Xác nhận thanh toán</Button>
                                )}
                                <Select onValueChange={handleChange} value={odStatus} disabled={odStatus === 'Cancelled' || odStatus === 'CustomerCancelled'}> 
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Trạng thái đơn hàng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {Object.entries(status).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            {value}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                        </div>
                        <div className="px-4">
                        <Button onClick={update}>Lưu</Button>

                        </div>
                    </div>
                    
                
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-2">
             <div className="w-full p-2">
                <OrderInfo order={data}/>
            </div>
            <div className="w-full p-2">
                <OrderCusInfo order={data}/>
            </div>
            <div className="w-full p-2">
                <OrderPayInfo order={data}/>
            </div>
        </div> 
        <div className="w-full px-2">
            <OrderItems items={data?.details}/>
        </div>
        </>
    )
}
