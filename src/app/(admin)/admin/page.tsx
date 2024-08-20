'use client'
import KeyMetrics from '@/components/dashboard/KeyMetrics';
import RevenueByMonth from '@/components/dashboard/RevenueByMonth';
import { useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import RevenueBy4Weeks from '@/components/dashboard/RevenueByWeeks';
import RevenueBy7Days from '@/components/dashboard/RevenueBy7Days';
import TopCustomer from '@/components/dashboard/TopCustomer';
import TopSell from '@/components/dashboard/TopSell';
import TopView from '@/components/dashboard/TopView';
import TopCategorySalesChart from '@/components/dashboard/SalesByCate';
import LowStock from '@/components/dashboard/LowStock';
import OldBooks from '@/components/dashboard/OldBook';


export default function DashBoard(){
    const [revenueOption, setRevenueOption] = useState('GetRevenueLast7Days');

    return(
        <>     
        <div className='flex flex-wrap w-full mt-2 gap-2'>
            <div className='flex flex-wrap flex-row md:flex-nowrap w-full gap-4'>
                <KeyMetrics/>
            </div>
            <div className='flex flex-wrap flex-row md:flex-nowrap gap-2 w-full'>
                <div className="w-full p-2 rounded-lg gap-2 bg-white  shadow-md">    
                    <div className="mb-4">
                        <Select onValueChange={(value) => setRevenueOption(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Thống kê" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GetRevenueLast7Days">Doanh thu 7 ngày qua</SelectItem>
                                <SelectItem value="GetRevenueLast4Weeks">Doanh thu 4 tuần qua</SelectItem>
                                <SelectItem value="GetRevenueByMonth">Doanh thu theo tháng</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {revenueOption === 'GetRevenueByMonth' &&(
                        <RevenueByMonth />

                    )} 
                     {revenueOption === 'GetRevenueLast4Weeks' &&(
                        <RevenueBy4Weeks />

                    )}   
                     {revenueOption === 'GetRevenueLast7Days' &&(
                        <RevenueBy7Days />

                    )}     
                </div>
                <div className="w-full flex flex-wrap gap-2">    
               
                    <div className="w-full bg-white p-2  rounded-lg shadow-md"> 
                        <TopCategorySalesChart/>

                    </div>                  
                </div>
               
            </div>
            <div className="w-full flex flex-wrap gap-2 ">  
                <div className=" w-full bg-white p-2  rounded-lg  shadow-md ">    
                    <TopView/>
                </div>
                <div className=" w-full bg-white p-2  rounded-lg  shadow-md ">    
                 <TopSell/>

                </div>          
            </div>
            <div className='flex flex-row gap-2 w-full'>
                <div className='w-full'>
                    <div className='flex bg-white rounded-t-md p-2 font-semibold h-[56px] items-center'>
                    <h5 className=''>
                        Tồn kho thấp
                    </h5>
                    </div>
                   
                    <LowStock/>
                </div>
                <div className='w-full'>
                    <OldBooks/>

                </div>
            </div>
            <div className='w-full'>
             <div className="w-full bg-white p-2  rounded-lg shadow-md mb-4">    
                        <TopCustomer/>
                    </div>
            </div>
        </div>

        </>

        
    )
}