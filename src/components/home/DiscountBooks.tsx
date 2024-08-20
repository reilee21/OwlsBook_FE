"use client";
import { useGetBookDiscountQuery } from '@/services/book/BookApi';
import CarouselBook from '../shared/CarouselBook';
import { Loading } from '../shared/Loading';
import Container from '../shared/Container';

const DiscountBooks = ()=>{
    const{data, error,isLoading} = useGetBookDiscountQuery({quantity:10});   
    if(isLoading) return <><Loading/></>

    return(
            <Container>
            <h5 className='max-w-6xl px-8 text-xl font-semibold'>Sách khuyến mãi</h5>
           
           <div className=''>
               {data && data.items &&(
                   <CarouselBook books={data.items} autoPlay={true} style='px-8'/>

               )}
           </div>
            </Container>
           
           
        
    )
};

export default DiscountBooks;