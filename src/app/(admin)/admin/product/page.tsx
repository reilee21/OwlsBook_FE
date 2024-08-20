'use client'
import { useEffect, useState } from "react"
import {useGetAllBooksManageQuery} from "@/services/book/BookManageApi"
import CategoryDropdown from "@/components/shared/bookManage/categoryDropdown";
import BookTable from "@/components/bookManage/bookTable";
import { LoadingModal } from "@/components/shared/LoadingModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/navigation";

import { useSelector } from 'react-redux';


export default function ProductManage(){
    const router = useRouter();
    const role = useSelector((state)=>state.auth.role)
    useEffect(()=>{
      if(role) {
        if(role!=='admin' && role !== 'product-admin'){
          router.push("/");
          return;
        } 
      }
    },[role])
    const [page,setPage]  = useState(1);
    const pageSize = 7;

    const [selectCategory,setSelectCategory] = useState('');
    const [searchNamme,setSearchName] = useState('');

    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);

    const [books,setBooks] = useState([]);
    
    const {data:bks,isLoading,refetch} = useGetAllBooksManageQuery({
        page:page,
        pageSize:pageSize,
        search: searchNamme,
        cate:selectCategory
    });

    useEffect(()=>{
        refetch()
    },[])

    useEffect(()=>{
        if(bks){
            setBooks(bks.items)
            setTotalItems(bks.totalItems)
            setTotalPages(bks.totalPages)
        }
    },[bks])

    const handleSelectCateChange = (selectCate:string) =>{
        setSelectCategory(selectCate)
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
    if(isLoading) return(
        <LoadingModal message={"Vui lòng chờ trong giây lát"}/>
      )
    return(
       <>
        <div className="rounded-t mb-0 py-3 border-0 bg-white">
            <div className="flex flex-wrap items-center">
                <div className=" w-full px-4 max-w-full flex flex-row">
                    <h3
                        className="font-semibold text-lg w-full" 
                    >
                       Kho Sách
                    </h3>

                     <CategoryDropdown width={'max-w-[300px]'} onChange={handleSelectCateChange}/>
                     <Input
                     className="max-w-[250px] mx-4" placeholder="Tên sách" onChange={(e)=>setSearchName(e.target.value)}/>
                    <Button onClick={()=>router.push('product/create')}>Thêm mới</Button>
                </div>
            </div>
        </div>
        <BookTable products={books}/>

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