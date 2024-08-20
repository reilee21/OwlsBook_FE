

'use client';
import { useGetTopCustomerQuery } from '@/services/analytics/Analytics';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';



export default function TopCustomer() {
   const [customers,setCustomers] = useState([]);
   const {data,isSuccess,refetch} = useGetTopCustomerQuery({take:5});
   useEffect(()=>{refetch()},[])

   useEffect(()=>{
    if(data && isSuccess) setCustomers(data)

   },[data,isSuccess])
    return (
        <>
        <Card>
            <CardContent>
                <h5 className='font-semibold text-gray-700 px-2 my-2'>Khách mua nhiều</h5>

                <div className='grid grid-cols-8 bg-gray-200'>
                    <h5 className='col-span-2'></h5>
                    <h5 className='col-span-2 font-semibold text-darkBlue text-center'>Tổng Số đơn</h5>
                    <h5 className='col-span-4 font-semibold text-darkBlue text-center'>Tổng Chi trả</h5>
                </div>
                {customers.length>0 && customers.slice(0,3).map((item,index)=>(
                    <div className='grid grid-cols-8 p-2 mx-1 border-b-[1px] border-gray-300' key={index}>
                        <h5 className='col-span-2'>
                            {item.customer.customerName}
                        </h5>
                        <h5 className='col-span-2 text-darkBlue text-center'>{item.totalOrder}</h5>
                        <h5 className='col-span-4 text-darkBlue text-center'>
                        {                  
                            new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            }).format(item.totalPaid ) 
                        }</h5>

                </div>
            ))}
            </CardContent>
        </Card>
             
        </>
    );
}
