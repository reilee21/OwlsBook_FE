'use client'
import OrderDetails from "@/components/customer/OrderDetails";
import CustomerProfileLayout from "@/components/shared/layouts/MiniCus";
import { ClerkLoading, useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useGetOrderDetailsQuery } from "@/services/order/orderApi";
import { Loading } from "@/components/shared/Loading";




const OrderDetailsPage = ()=>{
    const {user} = useUser();
    const params = useParams();
    const {data: order,isLoading, isSuccess,refetch} = useGetOrderDetailsQuery({orderId:params.orderid});
    if(!user) return(<><ClerkLoading/></>)

    return(
        <CustomerProfileLayout 
            subselect={''} 
            selectedPage={'orders'} 
            user={user}
        >
            {isLoading && (<Loading/>)}
            {order && isSuccess &&(
                <OrderDetails order={order} update={refetch}/>
            )}

        </CustomerProfileLayout>      
    )
}

export default OrderDetailsPage