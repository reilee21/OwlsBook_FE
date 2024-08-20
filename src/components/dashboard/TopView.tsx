'use client';
import { useGetTopViewQuery } from '@/services/analytics/Analytics';
import { useEffect, useState } from 'react';
import { CiCircleList } from 'react-icons/ci';
import { FaRegChartBar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import MultiColsChart from '../shared/dashboard/MultiColsChart';

interface Series {
    title: string;
    data: number[];
}

export default function TopView() {
    const [views, setViews] = useState([]);
    const { data, isSuccess, refetch } = useGetTopViewQuery({ take: 10 });
    const [viewMode, setViewMode] = useState<'table' | 'chart'>('chart'); // Default view mode

    const [bnames, setBNames] = useState<string[]>([]);
    const [stock, setStock] = useState<Series>({ title: 'Tồn kho', data: [] });
    const [bview, setBbiew] = useState<Series>({ title: 'Lượt xem', data: [] });
    useEffect(() => { refetch(); }, [refetch]);

    useEffect(() => {
        if (data && isSuccess) setViews(data);
    }, [data, isSuccess]);

    useEffect(() => {
        if (views.length > 0) {
            const names = views.map(book => book.bookTitle);
            const stockData = views.map(book => book.quantity);
            const bviews = views.map(book => book.bookView);
 
            setBNames(names);
            setStock({ title: 'Tồn kho', data: stockData });
            setBbiew({ title: 'Lượt xem', data: bviews });
        }
    }, [views]);

  

    return (
        <>
            <div className='px-4'>
                <div className='flex flex-row gap-2 items-center mb-4'>
                    <h5 className='font-semibold text-gray-700 text-lg'>Lượt xem sản phẩm</h5>
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

                {viewMode === 'table' && views.length > 0 && (
                    <div>
                        <div className='grid grid-cols-8'>
                            <h5 className='col-span-4 truncate'></h5>
                            <h5 className='col-span-2 font-semibold text-darkBlue text-center'>Lượt xem</h5>
                            <h5 className='col-span-2 font-semibold text-darkBlue text-center'>Tồn kho</h5>

                        </div>
                        {views.map((item, index) => (
                            <div key={index}>
                                <div className='grid grid-cols-8 p-2'>
                                    <p className='col-span-4 truncate'>
                                        <span className='font-semibold mr-2'>
                                            {index + 1} :
                                        </span>
                                        {item.bookTitle}
                                    </p>
                                    <h5 className='col-span-2 text-darkBlue text-center'>{item.bookView}</h5>
                                    <h5 className='col-span-2 text-darkBlue text-center'>{item.quantity}</h5>

                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
                  {viewMode === 'chart' && views.length > 0 && (
                   <MultiColsChart xlabels={bnames} data1={bview} data2={stock} />
               )}
            </div>
        </>
    );
}
