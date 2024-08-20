'use client'
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import AddDiscount from "@/components/discount/discountAdd";
import { LoadingModal } from "@/components/shared/LoadingModal";

import { useGetAllDiscountQuery } from "@/services/discount/discountApi";
import { useEffect,useState } from "react";
import DiscountTable from "@/components/discount/discountTable";
import EditDiscount from "@/components/discount/discountEdit";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function DiscountPage(){
    const router = useRouter();
    const role = useSelector((state)=>state.auth.role)
    useEffect(()=>{
      if(role) {
        if(role!=='admin'){
          router.push("/");
          return;
        } 
      }
    },[role])


    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [discounts,setDiscounts] = useState([]);
    const [editModal,setEditmodal] = useState(false);
    const [editDC,setEditDC] = useState(null);

    

    const {data,refetch,isLoading} = useGetAllDiscountQuery({
        page:page,
        pageSize:pageSize
    });
    useEffect(()=>{
        if(data){
            setTotalItems(data.totalItems)
            setTotalPages(data.totalPages)
            setDiscounts(data.items)
        }
    },[data])
    const changepage = (page)=> setPage(page);
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
    const setEDDC = (discount) =>{
        console.log(discount)
        setEditDC(discount)
        setEditmodal(true);
    }
    if(isLoading) return(
        <LoadingModal message={"Vui lòng chờ trong giây lát"}/>
      )
    return(
        <div className=' mt-4'>
        <div className="rounded-t mb-0 py-3 border-0 bg-white">
            <div className="flex flex-wrap items-center">
                <div className=" w-full px-4 max-w-full flex flex-row">
                    <h3
                        className="font-semibold text-lg w-full" 
                    >
                        Khuyến mãi 
                    </h3>
                    <AddDiscount updated={refetch}/>
                </div>
            </div>
        </div>
        <DiscountTable discounts ={discounts} setEditDC ={setEDDC}/>
        <div>
            <div className='flex flex-row gap-2 items-center justify-center'>
                <Button onClick={handlePreviousPage} disabled={page === 1}>
                    Trước
                </Button>
                <Pagination currentPage={page} pageSize={pageSize} totalItems={totalItems} paginate={changepage}/>
                <Button onClick={handleNextPage} disabled={page === totalPages}>
                    Sau
                </Button>
            </div>
        </div>
        <EditDiscount discount={editDC} 
                      isOpen={editModal}
                      onClose={()=>{
                          setEditmodal(false);
                          setEditDC(null);
                      }}
                      update={refetch}/>
                
        
    </div>
    )
}