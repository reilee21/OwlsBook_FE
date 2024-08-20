import { Button } from "@/components/ui/button"
import OrderItem from "./OrderItem"
import { useRouter } from "next/navigation"
import { Rate } from "./Rate"
import { useState } from "react";
import { SuccessModal } from "../SuccessModal";
import { useCancelOrderMutation } from '@/services/order/orderApi';
import { useToast } from '@/components/ui/use-toast';

export const status = {
    Pending: "Đã đặt hàng",
    Shipped: "Đang giao hàng",
    Delivered: "Đã nhận hàng",
    Cancelled: "Đã hủy",
    CustomerCancelled: "Đã hủy đặt hàng",

};

const OrderCus = ({order})=>{
    const [showAll, setShowAll] = useState(false);
    const [ratedSuccessModal, setRatedSuccessModal] = useState(false);
    const {toast} = useToast();
   
    const router = useRouter();
    const orderStatus = status[order.status];
    const goDetails = () => {
        router.push(`/customer/orders/${order.orderId}`)
    };
    const handleShowMore = () => {
        setShowAll(!showAll);
    };
    const isRated = order.orderDetails.some(detail => detail.isRated);
    const rateSuccess = () =>{
        setRatedSuccessModal(true)
        setTimeout(()=>{
            setRatedSuccessModal(false);
            location.reload()
        },2000)
    }
    const orderItemsToShow = showAll ? order.orderDetails : order.orderDetails.slice(0, 2);
    const [cancelOrder] = useCancelOrderMutation()
    const handleCancel = async () =>{
        try{
            var rs = await cancelOrder(order);
            if(rs.error){
                toast({
                    title: 'Huỷ đặt hàng không thành công', description: rs.error.data.message, variant:'destructive'
                })
                return;
            }
            if(rs){
                toast({
                    title: 'Huỷ đặt hàng thành công', variant:'success'
                })
                setTimeout(()=>location.reload(),1500)
                
            }
        }catch(e){
            console.error(e)
        }
    }

    return(<>
     <div className="w-full rounded-md shadow-md flex flex-col p-2 mb-4  bg-white  px-4">
        <h1 className="text-gray-600 border-b-[1px] p-2 font-medium text-sm">{orderStatus}</h1>
        <div className="flex flex-col w-full">
            {orderItemsToShow.map((item,index)=>(
                <OrderItem key={index} item={item}/>

            ))}
            {order.orderDetails.length > 2 && (
                    <h5 className="cursor-pointer text-sm border-[1px] rounded-lg w-fit py-1 px-4"  onClick={handleShowMore}>
                        {showAll ? "Ẩn bớt" : "Xem thêm"}
                    </h5>
                )}
        </div>
        <div className="flex flex-col items-end justify-end gap-4 p-2">
            <div className="flex flex-row gap-2 items-center">
                <h1 className="text-sm">Tổng tiền: </h1>
                <h1 className="text-md font-medium"> {order.total.toLocaleString()} đ</h1>
            </div>
            <div className="flex flex-row justify-between w-full">
                    <div className="">
                        {!order.isPaid && order.status === 'Pending' &&(
                            <Button variant="destructive" onClick={handleCancel}>Huỷ đặt hàng</Button>
                        )}
                    </div>
                    <div className="flex flex-row gap-4">                
                    {orderStatus==='Đã nhận hàng'&&!isRated && (
                        <Rate items={order.orderDetails} orderId={order.orderId} handleSuccess={rateSuccess}/>

                    )}
                    {orderStatus==='Đã nhận hàng'&&isRated && (
                        <Button disabled>Đã đánh giá</Button>
                    )}
                        <Button variant="outline" onClick={goDetails}>Xem chi tiết</Button>
                    </div>
            </div>
           

        </div>
        {ratedSuccessModal&&(
                <div className='text-green-700'>
                <SuccessModal message={'Đánh giá thành công'} onClose={rateSuccess}/>
            </div>
            )}
            
     </div>
    </>)
}
export default OrderCus