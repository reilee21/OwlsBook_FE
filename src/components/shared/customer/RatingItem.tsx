import { useEffect, useState } from "react";
import StarRating from "./RatingStar";
import { Textarea } from "@/components/ui/textarea";



export function RatingItem({review,updateReview}) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const img = review.book.image ? 'https://localhost:7000/File?image='+review.book.image : '/demo.png';

    const handleRatingChange = (newRating) => {
      setRating(newRating);
    };
    useEffect(()=>{
      updateReview(review.book.bookId,comment,rating);
    },[rating,comment])
    
  return (
    <div className=" border-2 p-2">
        <div className="grid grid-cols-8 p-2">
            <img className="object-contain w-[70px] col-span-1" 
                       src={img} alt="image" />  
            <div className="col-span-6 w-full text-wrap">
                <h1 className=" break-all">{review.book.title}</h1>
            </div>
        </div>
        <div className="p-2 flex flex-row">
            <h1>Chất lượng sản phẩm</h1>
            <StarRating rating={rating} onRatingChange={handleRatingChange} />      
        </div>
        <Textarea 
        onChange={(e)=>setComment(e.target.value)}
        placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm"/>
    </div>
  )
}
