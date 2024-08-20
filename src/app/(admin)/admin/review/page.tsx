'use client'
import ReviewTable from "@/components/reviewManage/reviewTable";
import { LoadingModal } from "@/components/shared/LoadingModal";
import { Input } from "@/components/ui/input";
import { useGetAllReviewQuery } from "@/services/review/reviewApi"
import { useEffect, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import EditReview from "@/components/reviewManage/editReview";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';




export default function ReviewManage(){
    const router = useRouter();
    const role = useSelector((state)=>state.auth.role)
    useEffect(()=>{
      if(role) {
        if(role!=='admin' && role !== 'order-admin'){
          router.push("/");
          return;
        } 
      }
    },[role])
    const [bookName,setBookName] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [reviews,setReviews] = useState([])

    const [rv,setRv] = useState(null)
    const [isShowModal,setIsShowModal] = useState(false)


    const {data,isLoading,refetch} = useGetAllReviewQuery({
        page:page,
        pageSize:pageSize,
        search:bookName
    });
    useEffect(()=>{
        if(data){

            setReviews(data.items)
            setTotalItems(data.totalItems)
            setTotalPages(data.totalPages)

        }
    },[data])

    const handleEdit = (item) =>{
        setRv(item)
        setIsShowModal(true);

    }
    
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleCloseModal = () =>{
        setIsShowModal(false);
        setRv(null);
    }



    if(isLoading) return <LoadingModal message={"Vui lòng đợi trong giây lát."}/>


    return(
        <div className="mt-4">
            <div className="rounded-t mb-0 py-3 border-0 bg-white">
                <div className="flex flex-wrap items-center">
                    <div className=" w-full px-4 max-w-full flex flex-row">
                        <h3
                            className="font-semibold text-lg w-full" 
                        >
                            Đánh giá sản phẩm   
                        </h3>
                        <Input placeholder='Tên sản phẩm'
                        className="max-w-[250px] mr-4" onChange={(e)=>{setBookName(e.target.value);setPage(1)}} />
                    </div>
                </div>
            </div>
            <ReviewTable reviews={reviews} setEditReview={handleEdit}/>
            {totalPages > 1 && (
                <div>
                    <div className='flex flex-row gap-2 items-center justify-center'>
                        <Button onClick={handlePreviousPage} disabled={page === 1}>
                            Trước
                        </Button>
                        <Pagination 
                            currentPage={page} 
                            pageSize={pageSize} 
                            totalItems={totalItems} 
                            paginate={(num:number) => setPage(num)} 
                        />
                        <Button onClick={handleNextPage} disabled={page === totalPages}>
                            Sau
                        </Button>
                    </div>
                </div>
            )}            
           <EditReview review={rv} isOpen={isShowModal} onClose={handleCloseModal} update={refetch}/>
        </div>  

    )
}