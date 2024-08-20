import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RatingItem } from "./RatingItem"
import { useEffect, useState } from "react"
import {useUploadReviewMutation} from '@/services/review/reviewApi'
interface Review {
  bookId:number,
  comment:string,
  ratingPoint:number
}

export function Rate({items,orderId,handleSuccess}) {
  const [reviews,setReviews] = useState<Review[]>([]);
  const [isOpen,setIsOpen] = useState(false); 
  const [rate] = useUploadReviewMutation();
  useEffect(()=>{
    if (items) {
      const initialReviews = items.map((item) => ({
        bookId: item.book.bookId,
        comment: '',
        ratingPoint: 5,
      }));
      setReviews(initialReviews);
    }
  },[items])

  const handleChangeReviews = (bookid,comment,ratingPoint) =>{
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.bookId === bookid
          ? { ...review, comment, ratingPoint }
          : review
      )
  );
  }
  const submit = async () =>{
    const dt = {
      bookReviews : Object.values(reviews),
      orderId : orderId
    }
    try{
      var rs = await rate(dt);
      if(rs.data.statusCode===200){
        setIsOpen(false)
        setTimeout(()=>handleSuccess(),500)
      }
    }catch(e){
      console.error(e)
    }
  }

  
  return (
    <Dialog open={isOpen} onOpenChange={(e)=>setIsOpen(e)}>
      <DialogTrigger asChild>
        <Button> Đánh giá</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[700px] " >
        <DialogHeader>
          <DialogTitle> Đánh giá sản phẩm</DialogTitle>
        </DialogHeader>
        <div className="lg:max-h-[400px]  overflow-auto">
           {items && items.map((item,index)=>(
              <RatingItem key={index} review={item} updateReview={handleChangeReviews}/>
           ))}

        </div>
        <DialogFooter>
          <Button onClick={submit}>Lưu đánh giá</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
