import { useState } from "react";
import Star from "./../icons/Star"
import Pagination from "../shared/Pagination";
import { Progress } from "../ui/progress";

const seedreviews = [
    {
        CustomerName: "Alice Johnson",
        Comment: "Great book! Highly recommend.",
        RatingPoint: 5
    },
    {
        CustomerName: "Bob Smith",
        Comment: "Interesting read, but a bit slow in the middle.",
        RatingPoint: 3
    },
    {
        CustomerName: "Charlie Brown",
        Comment: "Not my cup of tea.",
        RatingPoint: 2
    },
    {
        CustomerName: "Diana Prince",
        Comment: "Loved it! Couldn't put it down.",
        RatingPoint: 5
    },
    {
        CustomerName: "Ethan Hunt",
        Comment: "Well-written and engaging.",
        RatingPoint: 4
    },
    {
        CustomerName: "Fiona Gallagher",
        Comment: "Good book, but had some predictable moments.",
        RatingPoint: 3
    },
    {
        CustomerName: "George Martin",
        Comment: "Excellent storytelling.",
        RatingPoint: 5
    },
    {
        CustomerName: "Hannah Williams",
        Comment: "The book was okay, but not very memorable.",
        RatingPoint: 3
    },
    {
        CustomerName: "Ian Fleming",
        Comment: "Didn't enjoy it as much as I hoped.",
        RatingPoint: 2
    },
    {
        CustomerName: "Julia Roberts",
        Comment: "Fantastic book! A must-read.",
        RatingPoint: 5
    }
];
interface Review{
    reviewId: number,
    customerName: string,
    comment: string,
    ratingPoint:number
}
interface BookReviews{
    reviews: Review[]
}

const BookReview: React.FC<BookReviews> = ({ reviews }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalReviews = reviews.length;

    const reviewsPerPage = 5;

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const ratingCounts = reviews.reduce((acc, review) => {
        acc[review.ratingPoint] = (acc[review.ratingPoint] || 0) + 1;
        return acc;
    }, {});
    return (
        <div>
            <h1 className="p-2 mt-2 font-semibold text-lg">Đánh giá sản phẩm</h1>
            <div className="px-2 mt-2">
                <h2 className="text-md py-2">Tổng quan : <span className="text-sm text-gray-600 font-normal">{`(`}{totalReviews} đánh giá {`)`}</span></h2>
                <div className="mt-2 text-sm">
                    {Array.from({ length: 5 }, (_, index) => index + 1).map(rating => {
                        const percentage = (ratingCounts[rating] || 0) / totalReviews * 100;
                        return (
                            <div key={rating} className="flex items-center mb-2">
                                <Star rating={rating} />
                                <Progress className="ml-4 w-[75px] h-[5px]" value={percentage} />
                                <p className="ml-2">{ratingCounts[rating] || 0}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <hr/>
            {currentReviews.length > 0 ? (
                <>
                    {currentReviews.map((review, index) => (
                        <div className="" key={index}>
                            <div key={index} className="grid grid-cols-6">
                                <p className="col-span-2  text-normal font-semibold p-2">{review.customerName}</p>
                                <div className="col-span-4 p-2">
                                    <div className="p-2">      
                                        <Star rating={review.ratingPoint}/>
                                    </div>
                                    <p className="p-2">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                            <hr/>
                        </div>


                    ))}
                    {totalReviews/reviewsPerPage >1 &&(
                        <Pagination
                        currentPage={currentPage}
                        pageSize={reviewsPerPage}
                        totalItems={totalReviews}
                        paginate={paginate}
                    />
                    )}
                    
                </>
            ) : (
                <div className='p-2'>
                    <p>Sản phẩm chưa có đánh giá</p>
                </div>
            )}
        </div>
    );
};

export default BookReview