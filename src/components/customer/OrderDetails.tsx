
import StepStatus from '../shared/customer/OrderStep';
import OrderDetailItem from '../shared/customer/OrderDetailsItem';
import { Button } from '../ui/button';
import { Rate } from '../shared/customer/Rate';
import {format} from "date-fns"
import { status } from '../shared/customer/Order';
import { SuccessModal } from '../shared/SuccessModal';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCancelOrderMutation } from '@/services/order/orderApi';
import { useToast } from '@/components/ui/use-toast';
import ConfirmDialog from '../shared/ConfirmDialog';

const OrderDetails = ({order,update}:any)=>{    
    const subtotal = order.orderDetails.reduce((acc,item)=>{
        return acc + item.salePrice*(1-item.discountPercent/100)*item.quantity
    },0)
    const discount = order.voucherDiscountAmount ? order.voucherDiscountAmount : 0;
    const date = format(new Date(order.createAt), "HH:mm dd/MM/yyyy")
    const orderStatus = status[order.status];
    const isRated = order.orderDetails.some(detail => detail.isRated);
    
    const [ratedSuccessModal, setRatedSuccessModal] = useState(false);
    const {toast} = useToast();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    console.log(order)


    const rateSuccess = () =>{
        setRatedSuccessModal(true)
        setTimeout(()=>{
            setRatedSuccessModal(false);
            location.reload()
        },2000)
    }
    
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
                update()
            }
        }catch(e){
            console.error(e)
        }
    }

    return(
        <div className=' mx-4 lg:mt-0 mt-2'>
              <ConfirmDialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          handleCancel();
          setIsConfirmOpen(false);
        }}
        title="Xác nhận huỷ đơn hàng"
        description="Bạn có chắc chắn muốn huỷ đơn hàng này không?"
      />
               <Card>                   
                    <CardContent>
                        <div className=" flex flex-row gap-4 py-2 mt-2">
                            <h1 >Chi tiết đơn hàng: {order.orderId}</h1>
                        </div>
                        <div className="text-sm flex flex-row justify-between gap-4 pb-2 items-center">
                            <div className='w-full flex flex-row gap-2'>
                                <h1>Ngày đặt: {date} </h1>
                                <h1 className="font-semibold text-md"> - {orderStatus}</h1>
                            </div>        
                            {!order.isPaid && order.status === 'Pending' &&(
                                <Button variant="destructive" onClick={() => setIsConfirmOpen(true)}>Huỷ đặt hàng</Button>
                            )}
                    

                        </div>
                    </CardContent>
                </Card>         
          
           {order.status !== 'Cancelled'&& order.status !== 'CustomerCancelled'  &&(
                <div className='border-2 p-4 mt-4 shadow bg-white'>
                    <StepStatus odStatus={orderStatus}/>
                </div>
           )}
          
            <div className='grid grid-cols-2 mt-2 gap-4 py-4'>
                <div className=''>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Liên hệ
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col text-sm '>
                                <div className='px-2 font-semibold'>
                                     <h1>{order.name}</h1>
                                </div>
                                <div className='p-2'>
                                    <h1>Địa chỉ : {order.deliveryAddress}</h1>
                                </div>
                                <div className='p-2'>
                                    <h1>Số điện thoại : {order.phonenumber}</h1>
                                </div>
                            </div>
                        </CardContent>
                    </Card>            
                </div>
                <div className='h-full'>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>
                            Thanh toán
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className=' flex flex-col text-sm '>
                                {order.paymentMethod ==='COD' ? (
                                    <h1 className='p-2'> Thanh toán khi nhận hàng</h1>
                                ):(
                                    <h1 className='p-2'>
                                        Thanh toán qua ứng dụng ngân hàng
                                    </h1>

                                )}
                                {order.isPaid ?(
                                    <h1 className='text-md font-semibold p-2'>Đã thanh toán</h1>
                                ):(
                                    <h1 className='text-md font-semibold p-2'>Chưa thanh toán</h1>

                                )}

                        </div>
                        </CardContent>
                    </Card>     
               
                </div>

            </div>

            <div className='grid grid-cols-8 mt-4 p-2 shadow border-b-2 divide-x text-center text-md rounded-t-md bg-white '>
                <h1 className='col-span-4 text-left pl-2'>Sản phẩm</h1>
                <h1 className=''>Giá</h1>
                <h1 className=''>Số lượng</h1>
                <h1 className=''>Giảm giá</h1>
                <h1 className=''>Tạm tính</h1>
            </div>
            <div className='bg-white'>
                {order.orderDetails.map((item,index)=>(
                    <OrderDetailItem key={index} item={item}/>

                ))}
            </div>
            <div className='p-2  relative bg-white'>
                <div className="flex flex-row justify-between p-2 mx-2 gap-2 max-w-md mr-0 ml-auto">
                    <h5 className="text-md">Tạm tính</h5>
                    <h5 className="text-md font-medium "> {subtotal.toLocaleString()} đ</h5>
                </div>
                <div className="flex flex-row justify-between p-2 mx-2 gap-2 max-w-md mr-0 ml-auto">
                    <h5 className="text-md">Phí vận chuyển</h5>
                    <h5 className="text-md font-medium ">{order.shippingFee.toLocaleString()} đ</h5>
                </div>
                <div className="flex flex-row justify-between p-2 mx-2 gap-2 max-w-md mr-0 ml-auto">
                    <h5 className="text-md">Voucher</h5>
                    <h5 className="text-md font-medium "> - {discount.toLocaleString()} đ</h5>
                </div>
                <div className="flex flex-row justify-between p-2 mx-2 gap-2 max-w-md mr-0 ml-auto">
                    <h5 className="text-md">Tổng tiền</h5>
                    <h5 className="text-lg font-semibold "> {order.total.toLocaleString()} đ</h5>
                </div>          
            </div>
            {orderStatus === 'Đã nhận hàng'&&(
                <div className='bg-white p-4 rounded-b-lg'>
                     {isRated ? (
                         <Button disabled>Đã đánh giá</Button>
     
                     ):(                   
                         <Rate items={order.orderDetails} orderId={order.orderId} handleSuccess={rateSuccess}/>
                     )}
                </div>
            )}
            {ratedSuccessModal&&(
                <div className='text-green-700'>
                <SuccessModal message={'Đánh giá thành công'} onClose={rateSuccess}/>
            </div>
            )}
            
           
        </div>


    )
}

export default OrderDetails