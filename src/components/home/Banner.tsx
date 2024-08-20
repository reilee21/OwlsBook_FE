'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Banner = () => {

  const slides = [
    {
      url: 'https://nokshi-2.myshopify.com/cdn/shop/files/home-1-slider-1.png?v=1614763716',
    },
    {
        url: 'https://nokshi-2.myshopify.com/cdn/shop/files/home-1-slider-1.png?v=1614763716',
      },
    {
      url: 'https://cdn0.fahasa.com/media/magentothem/banner7/Balo_TigerFamily_Slide_T5_840x320_1.jpg',
    },
    {
        url: 'https://nokshi-2.myshopify.com/cdn/shop/files/home-1-slider-1.png?v=1614763716',
      },
    {
      url: 'https://cdn0.fahasa.com/media/magentothem/banner7/Balo_TigerFamily_Slide_T5_840x320_1.jpg',
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    
  };

  return (
    <div className="max-w-[1200px] xl:h-[500px] w-full px-12">     
      <Slider {...settings}>
        {slides.map((item,index)=>(
            <div key={index} className='w-[1200px] h-full overflow-hidden relative'>
            <img className='bg-no-repeat w-[1200px] bg-cover rounded-2xl'
            src = {item.url}/>
           </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
