'use client'
import { LoadingModal } from "@/components/shared/LoadingModal";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import {useGetOrdersManageQuery} from "@/services/order/orderApi"
import OrderTable from "@/components/orderManage/orderTable";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/shared/DateRagePicker";
import { status } from "@/components/shared/customer/Order";

export default function OrdersManage(){
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

    const [dfilter,setDfilter] = useState('');

    const [search,setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [from,setFrom] = useState('');
    const [to,setTo] = useState('');
    const [odStatus,setOdStatus] = useState('');

    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);

    const [orders,setOrders] = useState([])



    const {data,isLoading,refetch} = useGetOrdersManageQuery({
        page:page,
        pageSize:pageSize,
        search:search,
        from:from,
        to:to,
        status:odStatus
    });
    useEffect(()=>{
        if(data){
            setOrders(data.items)
            setTotalItems(data.totalItems)
            setTotalPages(data.totalPages)
          
        }
    },[data])
    useEffect(()=>{
        refetch()

    },[])

    
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const handleDateChange = (from: Date, to: Date) => {
        const frm  = format(from,'yyyy-MM-dd');
        const t  = format(to,'yyyy-MM-dd');
        setFrom(frm)
        setTo(t)
    };
    useEffect(()=>{
        if(dfilter==='Tất cả'){
            setFrom('')
            setTo('')
        }
        else if(dfilter==='Hôm nay'){
            const t = new Date();
            const today  = format(t,'yyyy-MM-dd');
            setFrom(today)
            setTo('')


        }else if(dfilter==='Hôm qua'){
            var t = new Date();
            var y = t.getDate()+1
            const today  = format(t,'yyyy-MM-dd');
            const yest  = format(y,'yyyy-MM-dd');
            setFrom(today)
            setTo(yest)

        }
    },[dfilter])



    if(isLoading) return <LoadingModal message={"Vui lòng đợi trong giây lát."}/>


    return(
        <div className="mt-4">
            <div className="rounded-t mb-0 py-3 border-0 bg-white">
                <div className="flex flex-wrap items-center">
                    <div className=" w-full px-4 max-w-full flex flex-row items-center gap-2">
                       <div className='w-full flex flex wrap items-center gap-4'>
                        <h3
                                className="font-semibold text-lg w-fit text-nowrap" 
                            >
                                Đơn hàng   
                            </h3>
                            <div className='w-[150px]'>
                                <Select onValueChange={(val)=>setDfilter(val)}>
                                    <SelectTrigger className="w-full ">
                                        <SelectValue placeholder="Chọn ngày" >
                                            {dfilter}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                            <SelectItem value={'Tất cả'} >
                                                Tất cả
                                            </SelectItem>
                                            <SelectItem value={'Hôm nay'} >
                                                Hôm nay
                                            </SelectItem>
                                            <SelectItem value={'Hôm qua'} >
                                                Hôm qua
                                            </SelectItem>
                                            <SelectItem value={'Chọn'} >
                                                Chọn
                                            </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-[200px]">
                            <Select onValueChange={(val)=>setOdStatus(val)} 
                                    value={odStatus} 
                                    > 
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
                        </div>
                        {dfilter==='Chọn'&&(
                            <DateRangePicker
                            onDateChange={handleDateChange}                                   
                            />
                        )}
                      

                           


                        <Input placeholder='Số điện thoại hoặc email'
                        className="max-w-[250px] mr-4" onChange={(e)=>{setSearch(e.target.value);setPage(1)}} />
                    </div>
                </div>
            </div>
            <OrderTable orders={orders}/>
            {totalPages > 1 && (
                <div>
                    <div className='flex flex-row gap-2 items-center justify-center'>
                        <Button onClick={handlePreviousPage} disabled={page === 1}>
                            Trước
                        </Button>
                        <Pagination 
                            currentPage={page} 
                            pageSize={pageSize} 
                            totalItems={totalItems} 
                            paginate={(num:number) => setPage(num)} 
                        />
                        <Button onClick={handleNextPage} disabled={page === totalPages}>
                            Sau
                        </Button>
                    </div>
                </div>
            )}            
        </div>  

    )
}