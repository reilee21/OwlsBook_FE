'use client';
import { useGetLowStockBookQuery, useGetOldBookQuery } from '@/services/analytics/Analytics';
import { useEffect, useState } from 'react';
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';
import ApplyDiscount from '../shared/dashboard/ApplyDiscountModal';
import { useRouter } from 'next/navigation';
export default function OldBooks() {
    const { data, isLoading,refetch } = useGetOldBookQuery({ take: 10 });
    useEffect(()=>{refetch()},[])

    const router = useRouter();
    if(isLoading) return <>...</>
    return (<>
     <div className='bg-white rounded-t-md p-2 flex flex-row items-center justify-between'>
        <h5 className='font-semibold'>
            Sách cũ
        </h5>
        <ApplyDiscount/>
    </div>
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <Thead></Thead>
                <Thead>Kho</Thead>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, index) => (
                  <TRow key={index} onClick={()=>router.push(`/admin/product/${item.bookId}`)}>
                  <TCell>
                      <div className='font-semibold truncate max-w-[250px]'>
                          {item.bookTitle}
                      </div>
                  </TCell>
                  <TCell>
                      <div className='font-semibold '>
                          {item.quantity}
                      </div>
                  </TCell>
                </TRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
    );
}
