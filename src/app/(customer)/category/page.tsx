

"use client"
import { useRouter, useSearchParams } from "next/navigation"
import Result from "@/components/search/Result"
import CateSearch from '@/components/search/Cate';
import FilterSearch from '@/components/search/Filter';
import { useSearchBookByCateQuery } from "@/services/book/BookApi";
import Pagination from '@/components/shared/Pagination';
import { useEffect, useState } from "react";

export default function SearchResult(){
    const searchParams = useSearchParams();
    const cate = searchParams.get('cate') || '';
    const [rs, setRs] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [priceError,setPriceError] = useState('hidden');

    const formattoNumber = (value) => {
        return value.replace(/\./g, '');
    };
    const { data } = useSearchBookByCateQuery({
        nameCate:cate,
        page: currentPage,
        pageSize: 24,
        min: minPrice? parseInt(formattoNumber(minPrice)) : 0,
        max: maxPrice? parseInt(formattoNumber(maxPrice)) : 9999999,
        sort: sortOrder,
    });

    useEffect(() => {        
        if (data) {
            setRs(data);
            window.scrollTo(0,100);
        }
    }, [data,currentPage]);
    const panigate = (page)=> setCurrentPage(page);

    useEffect(()=>{
        var min = parseInt(formattoNumber(minPrice));
        var max = parseInt(formattoNumber(maxPrice));
        if(min>max){setPriceError('block'); return;}
                     setPriceError('hidden');   

        setCurrentPage(1)
    },[minPrice,maxPrice,sortOrder])
    return(
        <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 w-full gap-2 mt-4 min-h-screen ">
            <div className="lg:col-span-1 col-span-3 relative">
                <div className="sticky top-0">
                        <CateSearch selectedcate={cate}/>

                </div>

            </div>
            <div className="lg:col-span-2 col-span-3 w-full ">
                <FilterSearch minPrice={minPrice} maxPrice={maxPrice} sortOrder={sortOrder} priceError={priceError}
                              setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setSortOrder={setSortOrder}
                />
                <Result books={rs.items}/>
                <Pagination currentPage={rs.pageIndex} 
                            pageSize={rs.pageSize} 
                            totalItems={rs.totalItems}
                            paginate={panigate} />
            </div>
        </div>

    )
}