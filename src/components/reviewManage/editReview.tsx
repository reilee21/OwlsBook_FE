import { Review } from "./reviewTable";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Card, CardContent  } from "../ui/card";
import Star from "../icons/Star";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {useEditReviewMutation,useDeleteReviewMutation} from "@/services/review/reviewApi"
import { useToast } from '@/components/ui/use-toast';
interface ReviewRequest{
    reviewId:number;
    status:boolean;
} 

interface EditReviewProps{
    review:Review;
    isOpen:boolean;
    onClose: () => void;
    update: () => void;
}

export default function EditReview ({review,isOpen,onClose,update}:EditReviewProps){
    const [reviewRQ,setReviewRQ] = useState<ReviewRequest>(null)
    const [img,setImage] = useState('');
    const customerInfo = `Tên: ${review?.customer.customerName}\nEmail: ${review?.customer.email}\nSố điện thoại: ${review?.customer.phoneNumber}`;
    const {toast} = useToast();
    const [updateRV] = useEditReviewMutation();
    const [deleteRV] = useDeleteReviewMutation();

    useEffect(() => {
        if(review){
            console.log(review)
            setReviewRQ({ reviewId: review.reviewId, status: review.status });
            const thumb = "https://localhost:7000/File?image="+review.book?.bookImages[0].imageName;
            setImage(thumb);
        }
    }, [review]);
    const handleSwitchChange = (val) => {
        setReviewRQ((prev) => ({ ...prev, status: val }));
    };
    const handleSM = async () =>{
        try {
            var rs =  await updateRV(reviewRQ).unwrap(); 
            if(rs && rs.code){
             toast({ title: "Cập nhật đáng giá thất bại.",description:rs.message, variant: "destructive" });
 
            }else{
             toast({ description: "Cập nhật đáng giá thành công." ,variant:"success"});
             update();
             onClose();
            }
            
         } catch (error) {
             toast({ description: "Đã có lỗi xảy ra.", variant: "destructive" });
         }
    }
    const handleDelete = async () =>{
        try {
            var rs =  await deleteRV({id:reviewRQ.reviewId}); 
            if(rs ){
                toast({ description: "Xoá  danh mục thành công." ,variant:"success"});
                update();
                onClose();
            }
            
         } catch (error) {
             toast({ description: "Xoá danh mục thất bại", variant: "destructive" });
         }
    }
    if(!review) return(<></>)
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>

        <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
            <DialogHeader>
                <DialogTitle>Đánh giá</DialogTitle>
            </DialogHeader>
                    <Card>
                       
                        <CardContent>
                            <div className="flex flex-row mt-4 gap-2">
                                <img
                                    className='h-16 w-16'
                                    src={img}
                                    alt="Book"
                                    />
                                <div className="py-2 w-full">
                                    <Label className="">{review?.book?.bookTitle} </Label>
                                    <div className="flex flex-row items-center">
                                        {review.ratingPoint}
                                        <Star rating={1} maxRating={1}/>
                                    </div>
                                </div>
                                <div className="w-full">
                                <Label className="whitespace-nowrap">Bình luận</Label>
                                <Textarea className="w-full" value={review?.comment} readOnly/>
                                        
                                </div>

                                
                            </div>
                            <hr className="my-2"/>
                            <div className="p-2">
                                <div className="flex flex-row gap-4">
                                    <div className="w-full">
                                        <Label className="whitespace-nowrap">Khách hàng</Label>
                                        <Textarea className=" p-2" value={customerInfo} readOnly/>
                                    </div>
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <Label className="whitespace-nowrap" htmlFor="approve">Duyệt</Label>
                                        <Switch checked={reviewRQ?.status}  id="approve" onCheckedChange={handleSwitchChange}/>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
               
                <DialogFooter>
                    <div className="w-full mt-2">
                        <Button  variant="destructiveOutline" onClick={handleDelete}>Xoá </Button>
                    </div>
                    <Button onClick={handleSM}>
                        Cập nhật
                    </Button>
                </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}