'use client'
import Banner from '@/components/home/Banner';
import DiscountBooks from '@/components/home/DiscountBooks';
import HomeRecommendBook from '@/components/home/Recommend';
import SalesBook from '@/components/home/SalesBook'
import Main from '@/components/shared/layouts/Main';
export default function Home() { 
  return (
      <Main>
          <Banner/>
          <SalesBook/>
          <DiscountBooks/>
          <HomeRecommendBook/>
      </Main>
    
  );
}
