"use client";
import BookCard from '../shared/BookCard';
import Slider from 'react-slick';

const CarouselBook = ({ books, autoPlay = false, style = '' }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: autoPlay,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className={`lg:max-w-7xl md:max-w-4xl sm:max-w-2xl max-w-xl mx-auto px-4 ${style}`}>
            <Slider {...settings} className='flex'>
                {books && books.map((book, index) => (
                    <div key={index} className="p-2">
                        <BookCard book={book} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CarouselBook;
