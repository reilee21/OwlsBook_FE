'use client';
import { useGetLowStockBookQuery } from '@/services/analytics/Analytics';
import { useEffect, useState } from 'react';
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';
import { useRouter } from 'next/navigation';
export default function LowStock() {
    const { data, isLoading,refetch } = useGetLowStockBookQuery({ take: 10 });
    const router = useRouter();
    useEffect(()=>{refetch()},[])
    
    if(isLoading) return <>...</>
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <Thead>Sách</Thead>
                <Thead>Kho</Thead>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, index) => (
                <TRow key={index} onClick={()=>router.push(`/admin/product/${item.bookId}`)}>
                  <TCell>
                      <div className='font-semibold'>
                          {item.bookTitle}
                      </div>
                  </TCell>
                  <TCell>
                      <div className='font-semibold text-rose-700'>
                          {item.quantity}
                      </div>
                  </TCell>
                </TRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
