"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useSelector,useDispatch  } from "react-redux";
import BookImages from '@/components/book/BookImages';
import BookInfo from '@/components/book/BookInfo';
import BookReview from '@/components/book/BookReviews';
import BookSales from '@/components/book/BookSales';
import { useEffect, useState } from "react";
import { useGetBookDetailsQuery } from "@/services/book/BookApi";
import { setSelectedBook } from "@/redux/bookSlice";
import SkeletonBookDetail from '@/components/shared/book/BookSkeleton';
import { useAddToCartMutation } from "@/services/cart/CartApi";
import { SuccessModal } from "@/components/shared/SuccessModal";
import { ErrorModal } from "@/components/shared/ErrorModal";
import RecommendBook from "@/components/shared/book/Recommed";
import { updateCartState } from "@/redux/cartSlice";
import { useUser } from "@clerk/nextjs";




export default function DetailsBook(){
    const selectedBook = useSelector((state)=>state.books.selectedBook);
    const [successModal,setSuccessModal] = useState(false);
    const [errorModal,setErrorModal] = useState(false);

    const dispatch = useDispatch();
    const param = useParams();
    const router = useRouter();

    const {isSignedIn} = useUser();

    const name = decodeURIComponent(param.name);
    let sname = name ? name : selectedBook.bookTitle

    const { data:bookDetails,isLoading,isSuccess } = useGetBookDetailsQuery({
      name: sname.replace(/\+/g, '%cong')
    });      
    const [addtoCart] = useAddToCartMutation();

    const [cart,setCart] = useState({bookId:'',quantity:1});
    

    useEffect(()=>{
      if(bookDetails && isSuccess){
        console.log(bookDetails)
        dispatch(setSelectedBook(bookDetails))
        setCart((pre)=>({...pre,bookId:bookDetails.bookId}));
      } 
    },[isSuccess,bookDetails])
    const handleaddtoCart  = async () =>{
      if(!isSignedIn){
        router.push("/auth/signin");
        return
      }
      try{
        const rs = await addtoCart(cart);
        if(rs.data){
          setSuccessModal(true);
          dispatch(updateCartState(1))
        }else{
          setErrorModal(true)
        }
      }catch(e){
        console.error(e);
      }
    }

    useEffect(()=>{
      if(successModal || errorModal){
        setTimeout(()=>setSuccessModal(false),2000)
        setTimeout(()=>setErrorModal(false),2000)
      }
    },[successModal,errorModal])
    if(isLoading) return(
      <SkeletonBookDetail/>    
    )


    return(
        <section className="py-2"> 
        <div className="container mx-auto px-4 max-w-7xl">

          <div className="lg:col-gap-12 xl:col-gap-16 grid grid-cols-1 gap-2 mt-2 lg:grid-cols-5">
            <BookImages imgs={bookDetails.image}/>
            <BookSales handleAddToCart={handleaddtoCart} setCart={setCart} book={bookDetails}/> 
          </div>
          <div className="bg-white p-2 mt-2 rounded-lg shadow">
            <div className='p-2'>
              <h5 className="font-semibold text-lg">Thông tin sản phẩm</h5>
              <div className='lg:w-2/5 w-full'>
                <BookInfo book={bookDetails}/>
              </div>
              <div className="flex flex-row items-center">
                <span className="whitespace-nowrap">Mô tả</span>
                <hr className="w-full mx-2"/>
              </div>
              <div className="mt-2">
                <p className="">
                  {bookDetails.summary}
                </p>
              </div>
            </div>

          </div>
          <div className="bg-white p-2 mt-2">
            <BookReview reviews={bookDetails.reviews}/>
          </div>
        </div>
         {successModal &&(
          <SuccessModal message={'Đã thêm vào giỏ'} onClose={()=>setSuccessModal(false)}/>
          )}
        {errorModal &&(
                <ErrorModal message={'Không đủ số lượng hàng'} onClose={()=>setErrorModal(false)}/>
                )}
        <div className="mt-4">
          <RecommendBook/>
        </div>
      </section>
     
      
    )
}