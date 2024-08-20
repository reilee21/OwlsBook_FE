'use client'
import { useGetStaffQuery } from "@/services/acccount/accountApi"
import { useEffect, useState } from "react";
import Pagination from '@/components/shared/Pagination';
import { Button } from '@/components/ui/button';
import AdminAccountTable from "@/components/account/AdminAccountTable";
import { LoadingModal } from "@/components/shared/LoadingModal";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


export default function Employee (){
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

    const {data:staff} = useGetStaffQuery();
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [users,setUsers] = useState([]);
    const [change,setChange] = useState(false); 

    useEffect(() => {
        const fetchStaff = async (listStaffEmail) => {
            try {
                const datasm = {listStaffEmail,page,pageSize }
                const response = await fetch(`/api/adminaccount`,{
                    method:'POST',
                    body: JSON.stringify(datasm),
                    headers: {
                        'content-type': 'application/json'
                    },
                });
                const data = await response.json();
                setUsers(data.data)
                setTotalPages(Math.ceil(data.totalCount / pageSize));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        if (staff && Array.isArray(staff)) {
            const emails = staff.map(member => member.email.trim());
            fetchStaff(emails)
        }
    }, [staff,change]);
  

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
    const changepage = (page)=>{
        setPage(page)
    }

    if(users.length===0) return(
        <LoadingModal message={"Vui lòng chờ trong giây lát"}/>
      )
    return(<>
     <div className=' mt-4'>
                <div className="rounded-t mb-0 py-3 border-0 bg-white">
                    <div className="flex flex-wrap items-center">
                        <div className=" w-full px-4 max-w-full flex flex-row">
                            <h3
                                className="font-semibold text-lg w-full" 
                            >
                                Nhân viên
                            </h3>
                        </div>
                    </div>
                </div>
                <AdminAccountTable infos={staff} account={users} update={()=>setChange(!change)} />
            
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
            </div>
    </>)
}