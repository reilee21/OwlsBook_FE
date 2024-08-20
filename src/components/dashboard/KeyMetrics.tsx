

'use client';
import KeyMetric from '@/components/shared/dashboard/KeyMetric';
import { useGetKeyMetricsQuery } from '@/services/analytics/Analytics';
import { useEffect, useState } from 'react';



export default function KeyMetrics() {
   const [km,setKm] = useState([]);
   const {data,isSuccess,refetch} = useGetKeyMetricsQuery();
   useEffect(()=>{
    if(data && isSuccess) setKm(data)

   },[data,isSuccess])
   useEffect(()=>{refetch()},[])

    return (
        <>
        {km && km.length>0&& km.map((item,index)=>(
            
            <KeyMetric key={index} label={item?.label} value={item?.value}/>
        ))}
        
        </>
    );
}
