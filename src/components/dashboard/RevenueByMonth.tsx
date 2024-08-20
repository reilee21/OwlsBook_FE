'use client';
import RevenueChart from '../shared/dashboard/Chart';
import { useEffect, useState } from 'react';
import {useGetRevenueByMonthQuery} from '@/services/analytics/Analytics'
import { FaChartBar, FaChartLine } from 'react-icons/fa';



export default function RevenueByMonth() {
  const [revenues,setRevenues] = useState([]);
  const {data,isLoading} = useGetRevenueByMonthQuery();
  const[chartType,setChartType] = useState('line');



  useEffect(()=>{
    if(data) setRevenues(data)
  },[data])
  if(isLoading || revenues.length===0) return<>...</>
  return (<>
 <div className="flex gap-4  items-center px-4 ">
                    
                    <button
                        className={`flex items-center px-4 py-2 rounded ${
                            chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setChartType('line')}
                    >
                        <FaChartLine className="mr-2" />
                        
                    </button>
                    <button
                        className={`flex items-center px-4 py-2 rounded ${
                            chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                        }`}
                        onClick={() => setChartType('bar')}
                    >
                        <FaChartBar className="mr-2" />
                    </button>
            </div>
  <RevenueChart data={revenues} chartType={chartType} />
  </>
  );
}
