'use client';
import { useGetTopSellBookQuery } from '@/services/analytics/Analytics';
import { useEffect, useState } from 'react';
import MultiColsChart from '../shared/dashboard/MultiColsChart';
import { CiCircleList } from 'react-icons/ci';
import { FaRegChartBar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface Series {
    title: string;
    data: number[];
}

export default function TopSell() {
   const [books, setBooks] = useState([]);
   const { data, isSuccess, refetch } = useGetTopSellBookQuery();

   const [bnames, setBNames] = useState<string[]>([]);
   const [stock, setStock] = useState<Series>({ title: 'Tồn kho', data: [] });
   const [sold, setSold] = useState<Series>({ title: 'Đã bán', data: [] });
   const [viewMode, setViewMode] = useState<'table' | 'chart'>('chart'); // Default view mode

   useEffect(() => { refetch(); }, [refetch]);

   useEffect(() => {
       if (data && isSuccess) setBooks(data);
   }, [data, isSuccess]);

   useEffect(() => {
       if (books.length > 0) {
           const names = books.map(book => book.bookTitle);
           const stockData = books.map(book => book.quantity);
           const soldData = books.map(book => book.totalSold);

           setBNames(names);
           setStock({ title: 'Tồn kho', data: stockData });
           setSold({ title: 'Đã bán', data: soldData });
       }
   }, [books]);

   return (
       <>
           <div className='px-4'>
                <div className='flex flex-row gap-2 items-center'>
                    <h5 className='font-semibold text-gray-700 text-lg'>Sách bán chạy</h5>
                    <div className='flex items-center gap-2'>
                        <Button
                            variant={`${viewMode === 'table' ? 'default' : 'secondary'}`}
                            onClick={() => setViewMode('table')}
                        >
                            <CiCircleList className='inline mr-2' />
                        </Button>
                        <Button
                            variant={`${viewMode === 'chart' ? 'default' : 'secondary'}`}

                            onClick={() => setViewMode('chart')}
                        >
                            <FaRegChartBar className='inline mr-2' /> 
                        </Button>
                    </div>
               </div>

             
               {viewMode === 'table' && books.length > 0 && (
                   <div>
                       <div className='grid grid-cols-8'>
                           <h5 className='col-span-4 truncate'></h5>
                           <h5 className='col-span-2 font-semibold text-darkBlue text-center'>Đã bán</h5>
                           <h5 className='col-span-2 font-semibold text-darkBlue text-center'>Tồn kho</h5>
                       </div>
                       {books.map((item, index) => (
                           <div key={index}>
                               <div className='grid grid-cols-8 p-2'>
                                   <p className='col-span-4 truncate'>
                                    <span className='font-semibold mr-2'>
                                        {index + 1} :
                                    </span>

                                         {item.bookTitle}
                                   </p>
                                   <h5 className='col-span-2 text-darkBlue text-center'>{item.totalSold}</h5>
                                   <h5 className='col-span-2 text-darkBlue text-center'>{item.quantity}</h5>
                               </div>
                               <hr />
                           </div>
                       ))}
                   </div>
               )}
               {viewMode === 'chart' && books.length > 0 && (
                   <MultiColsChart xlabels={bnames} data1={sold} data2={stock} />
               )}
           </div>
       </>
   );
}
