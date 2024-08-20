"use client";
import { useGetBookRecommendQuery } from '@/services/book/BookApi';
import { Loading } from '../shared/Loading';
import BookCard from '../shared/BookCard';
import Container from '../shared/Container';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSelector } from 'react-redux';

const HomeRecommendBook = () => {
  const { data, error, isLoading, isFetching,refetch } = useGetBookRecommendQuery({ quantity: 12 });
  const atk = useSelector((state)=>state.auth.atk)
  useEffect(()=>{
    refetch()
  },[atk])

  if (isLoading || isFetching) return <Loading />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Container >
        <div className='mx-4'>
            <h5 className='max-w-6xl p-2 text-xl font-semibold'>Gợi ý cho bạn</h5>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center mx-4'>
            {data?.slice(0,10).map((book,index) => (
                <div key={index} className='w-full'>
                <BookCard book={book} />
                </div>
            ))}
            </div>
        </div>
    </Container>
   
  );
};

export default HomeRecommendBook;
