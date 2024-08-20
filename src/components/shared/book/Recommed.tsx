"use client";
import { useGetBookRecommendQuery } from '@/services/book/BookApi';
import { Loading } from '../Loading';
import CarouselBook from '../CarouselBook';
import { useEffect } from 'react';

const RecommendBook = ()=>{

    const{data, error,isLoading,isFetching,refetch} = useGetBookRecommendQuery({quantity:12});   
    useEffect(()=>{refetch()},[])
    if(isLoading || isFetching) return <><Loading/></>


    return(
        <div className='mx-auto'>
            <h5 className='max-w-6xl  mx-auto text-xl font-semibold'>Có thể bạn quan tâm</h5>
           
            <div className='px-20'>
                {data &&(
                    <CarouselBook books={data} autoPlay={true} style='px-8'/>

                )}
            </div>
           
        </div>
        
        
    )
};

export default RecommendBook;