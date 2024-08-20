import React, { useEffect, useState } from 'react';
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';
import { format } from 'date-fns';
import { FaCircle } from 'react-icons/fa6';
import Star from '../icons/Star';

export interface Review {
  reviewId: number;
  comment: string;
  ratingPoint: number;
  createAt: string;
  bookId: number;
  status: boolean;
  book: {
    bookTitle: string;
    author: string;
    bookImages: {
        imageName: string;
    }[];
  } | null; 
  customer: {
    customerName: string;
    phoneNumber: string;
    email: string;
  };
}

interface ReviewTableProps {
  reviews: Review[];
  setEditReview: (item: Review) => void;
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews, setEditReview }) => {
  const [data, setData] = useState<Review[] | null>(null);

  useEffect(() => {
    setData(reviews);
  }, [reviews]);


  if (!data || data.length===0) {
    return (
      <div className="break-words w-full mb-6 shadow-lg rounded bg-white p-2">
        <h5 className='text-center'>Không có đánh giá</h5>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <Thead>Sách</Thead>
              <Thead>Khách hàng</Thead>
              <Thead>Điểm</Thead>
              <Thead>Ngày đăng</Thead>
              <Thead>Trạng thái </Thead>
            </tr>
          </thead>

          <tbody>
            {data && data.length > 0 && data.map((item, index) => (
              <TRow key={index} onClick={() => setEditReview(item)}>
                <TCell>
                  {item.book && (
                    <div className='font-semibold flex flex-row gap-2 object-cover'>
                      {item.book.bookImages && item.book.bookImages.length > 0 && (
                        <img
                          className='h-12 w-12'
                          src={`https://localhost:7000/File?image=${item.book?.bookImages[0].imageName}`}
                          alt="Book"
                        />
                      )}
                      <div>
                        <div>{item.book?.bookTitle}</div>
                        <div className="font-normal"> Tác giả: {item.book?.author}</div>
                      </div>
                    </div>
                  )}
                </TCell>
                <TCell>
                  {item.customer?.customerName}
                </TCell>
                <TCell>
                    <div className="flex flex-row">
                    {item.ratingPoint}/5
                  <Star rating={1} maxRating={1}/>
                    </div>
                </TCell>
                <TCell>
                  {format(new Date(item.createAt), 'HH:mm dd-MM-yyyy')}
                </TCell>
                <TCell>
                {item.status === true ? (
                    <div className='flex flex-row gap-2 items-center'>
                      <FaCircle color='green' />
                      <span className=''> Đã duyệt</span>
                    </div>
                  ) : (
                    <div className='flex flex-row gap-2 items-center'>
                      <FaCircle color='red' />
                      <span className=''> Chưa duyệt  </span>
                    </div>
                  )}
                </TCell>
              </TRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewTable;
