"use client"
import { useRouter, useSearchParams } from "next/navigation"
import Result from "@/components/search/Result"
import CateSearch from '@/components/search/Cate';
import FilterSearch from '@/components/search/Filter';
import { useSearchByNameQuery } from "@/services/book/BookApi";
import Pagination from '@/components/shared/Pagination';
import { useEffect, useState } from "react";
import { Loading } from "@/components/shared/Loading";

export default function SearchResult(){
    const searchParams = useSearchParams();
    const searchString = searchParams.get('s') || '';
    const [rs, setRs] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [priceError,setPriceError] = useState('hidden');

    const formattoNumber = (value) => {
        return value.replace(/\./g, '');
    };
    const { data,isLoading} = useSearchByNameQuery({
        searchString,
        page: currentPage,
        pageSize: 24,
        min: minPrice? parseInt(formattoNumber(minPrice)) : 0,
        max: maxPrice? parseInt(formattoNumber(maxPrice)) : 9999999,
        sort: sortOrder,
    });

    useEffect(() => {        
        if (data) {
            setRs(data);
            window.scrollTo(0,0);
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
    
    if(isLoading) return <Loading/>
    return(
        
        <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 w-full lg:gap-2 gap-4 mt-4 min-h-screen">
            <div className="lg:col-span-1 col-span-3">
                <CateSearch />
            </div>
            <div className="lg:col-span-2 col-span-3 w-full">
                <FilterSearch minPrice={minPrice} maxPrice={maxPrice} sortOrder={sortOrder} priceError={priceError}
                              setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setSortOrder={setSortOrder}
                />
                <Result books={rs.items}/>
                <Pagination background="bg-white"
                            currentPage={rs.pageIndex} 
                            pageSize={rs.pageSize} 
                            totalItems={rs.totalItems}
                            paginate={panigate} />
            </div>
        </div>

    )
}