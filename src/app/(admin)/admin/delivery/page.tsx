'use client'

import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect,useState } from "react";
import {useGetAllDeliveryQuery} from "@/services/delivery/deliveryApi"
import DeliveryTable from "@/components/deliveryManage/deliveryTable";
import AddDelivery from "@/components/deliveryManage/addDelivery";
import EditDelivery from "@/components/deliveryManage/editDelivery";
import { LoadingModal } from "@/components/shared/LoadingModal";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
export default function DeliveryPage(){
    const router = useRouter();
    const role = useSelector((state)=>state.auth.role)
    useEffect(()=>{
      if(role) {
        if(role!=='admin' && role!=='order-admin'){
          router.push("/");
          return;
        } 
      }
    },[role])
    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(10);
    const [searchName,setSearchName]= useState('');

    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [delivery,setDelivery] = useState([]);
    const [editModal,setEditmodal] = useState(false);
    const [editDelivery,setEditDelivery] = useState<Number>(null);

    

    const {data,refetch,isLoading} = useGetAllDeliveryQuery({
        page:page,
        pageSize:pageSize,
        search:searchName
    });
    useEffect(()=>{
        if(data){
            setTotalItems(data.totalItems)
            setTotalPages(data.totalPages)
            setDelivery(data.items)
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
    const setEDDelivery = (id:number) =>{
        setEditDelivery(id)
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
                        Thông tin vận chuyển 
                    </h3>
                    <Input placeholder='Tên thành phố'
                     className="max-w-[250px] mr-4" onChange={(e)=>setSearchName(e.target.value)} />
                    <AddDelivery updated={refetch}/>
                </div>
            </div>
        </div>
        <DeliveryTable deliveries={delivery} setEditDelivery={setEDDelivery}/>
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
        <EditDelivery delivery={editDelivery} 
                      isOpen={editModal}
                      onClose={()=>{
                          setEditmodal(false);
                          setEditDelivery(null);
                      }}
                      update={refetch}/>
                
        
    </div>
    )
}