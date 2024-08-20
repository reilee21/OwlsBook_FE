"use client";
import { useGetBestSellerQuery } from '@/services/book/BookApi';
import CarouselBook from '../shared/CarouselBook';
import { Loading } from '../shared/Loading';
import Container from '../shared/Container';

const SalesBook = ()=>{
    const{data, error,isLoading} = useGetBestSellerQuery({quantity:10}); 
    if(isLoading) return <><Loading/></>

    return(
        <Container>
            <h5 className='max-w-6xl px-8 text-xl font-semibold'>Sách bán chạy</h5>
           
            <div >
                {data &&(
                    <CarouselBook books={data} autoPlay={true} style='px-8'/>

                )}
            </div>
            </Container>
           
        
    )
};

export default SalesBook;