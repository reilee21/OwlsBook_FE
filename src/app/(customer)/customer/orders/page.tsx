'use client'
import CustomerOrder from "@/components/customer/CustomerOrder";
import CustomerProfileLayout from "@/components/shared/layouts/MiniCus";
import { ClerkLoading, useUser } from "@clerk/nextjs";
import { useGetOrdersByUserQuery } from '@/services/order/orderApi';
import { Loading } from "@/components/shared/Loading";
import { useEffect, useRef, useState } from "react";
import IntersectionObserverComponent from "@/components/shared/IntersectionObserver";
import { LoadingModal } from "@/components/shared/LoadingModal";

const OrderPage = () => {
    const { user } = useUser();
    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const { data, isLoading,isFetching,refetch } = useGetOrdersByUserQuery({ page, pageSize: 5 });
    useEffect(()=>{
        refetch();
    },[])
    useEffect(() => {
        if (data) {
            setOrders(prevOrders => [...prevOrders, ...data.items]);
            setHasMore(data.pageIndex < data.totalPages);
        }
    }, [data]);
    const handleLoading = ()=>{
        if(!isLoading && !isFetching && hasMore){
            setPage(pre=>pre+1);
        }
    }


    if (!user) return (<><ClerkLoading /></>);

    return (
        <CustomerProfileLayout
            subselect={''}
            selectedPage={'orders'}
            user={user}
        >
            {orders && (
                <CustomerOrder orders={orders} />
                )}
            {isLoading ||isFetching && (
                <Loading/>
            )}

            <IntersectionObserverComponent onIntersect={handleLoading}/>
        </CustomerProfileLayout>
    )
}

export default OrderPage;
