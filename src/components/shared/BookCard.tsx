import { setSelectedBook } from "@/redux/bookSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Star from "../icons/Star";

const BookCard = ({ book }) => {
  const imageUrl = `https://localhost:7000/File?image=${book.image}`;
  const router = useRouter();
  const dispatch = useDispatch();
  const detail = () => {
    dispatch(setSelectedBook(book));
    router.push(`/books/${book.bookTitle}`);
  };
  const ratingPoint = Math.floor(book.avgRatingPoint);

  return (
    <div
      className="relative flex w-full max-w-200 flex-col mb-4 overflow-hidden rounded-lg border border-gray-100 bg-white shadow transition-shadow duration-300 cursor-pointer hover:shadow-md hover:shadow-gray-400"
      onClick={detail}
    >
      <a
        className="relative mx-3 mt-3 flex h-40 overflow-hidden rounded-xl transition-transform duration-300 transform hover:scale-105"
      >
        <img
          className="object-cover mx-auto transition-transform duration-300 transform hover:scale-110"
          src={imageUrl}
          alt={book.bookTitle}
        />
        {book.totalDiscount !== 0 && (
          <span className="absolute top-0 left-0 rounded-full bg-black px-4 py-2 text-center text-sm font-medium text-white">
            {book.totalDiscount}%
          </span>
        )}
      </a>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-md tracking-tight text-slate-900 leading-6 min-h-12 text-pretty line-clamp-2">
          {book.bookTitle}
        </h5>
        <div className="pt-[1px]">
          <Star rating={ratingPoint} />
        </div>
        <div className="pt-2 flex items-center justify-between">
          {book.totalDiscount !== 0 ? (
            <div className="w-full flex flex-row gap-2 items-center">
              <p className="text-lg font-semibold text-slate-900 w-fit">
                {book.salePriceAfterDiscount.toLocaleString()}
                <span className="text-md"> đ</span>
              </p>
              <span className="text-sm text-slate-900 line-through">
                {book.salePrice.toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="w-full flex flex-row gap-2 items-center">
              <p className="text-lg font-semibold text-slate-900">
                {book.salePrice.toLocaleString()}
                <span className="ml-[1px] text-md"> đ</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
