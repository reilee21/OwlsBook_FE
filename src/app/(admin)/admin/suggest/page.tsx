'use client'

import { useEffect, useState } from "react"
import {useGetBookCrawlQuery, useRefreshBookCrawlMutation} from '@/services/suggest/suggestApi'
import { LoadingModal } from "@/components/shared/LoadingModal";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import { IoRefreshCircleOutline } from "react-icons/io5";

import { useToast } from '@/components/ui/use-toast'

import BookCrawlTable from "@/components/suggest/BookCrawlTable";

export default function Page(){
    const [suggests,setSuggests] = useState([])
    const [page,setPage] = useState(1);
    const pageSize = 10;
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const {toast} = useToast();

    const {data:bk,isLoading,refetch,isFetching} = useGetBookCrawlQuery({
        pageSize:pageSize,
        page:page
    })
    const [reCrawl,{isLoading:waitRecrawl}] = useRefreshBookCrawlMutation();

    useEffect(()=>{
        if(bk){
            setSuggests(bk.items)
            setTotalItems(bk.totalItems)
            setTotalPages(bk.totalPages)
        }
    },[bk])
    const crawlNew = async () =>{

        try{
            var rs = await reCrawl({});
            if(rs.data){

                toast({ 
                    title:"Cập nhật thành công",
                    variant:"success"});
                refetch()

            }
        }catch(e){

            console.error(e)
            toast({ 
                title:"Đã có lỗi",
                variant:"destructive"});
        }
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
    useEffect(()=>{console.log(suggests)},[suggests])
    if(waitRecrawl) return<><LoadingModal message={'Xin vui lòng chờ'}/></>
    if(isFetching || isLoading) return<><LoadingModal message={'Xin vui lòng chờ'}/></>

    
    return(
        <>     
        <div className = 'w-full rounded-t-lg flex p-2 bg-white mt-2 items-center justify-between'>
            <h5 className='w-full text-lg font-semibold'>
                Gợi ý nhập sách
            </h5>
            <Button className="flex gap-2" onClick={crawlNew}>
                <IoRefreshCircleOutline size={24}/>
                <h5 className=''> Làm mới
                </h5>

            </Button>
        </div>
        <BookCrawlTable booksCrawl={suggests} />
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
        </>

        
    )
}