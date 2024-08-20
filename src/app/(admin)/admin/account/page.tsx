'use client'

import AccountTable from '@/components/account/AccountTable';
import Pagination from '@/components/shared/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { LoadingModal } from "@/components/shared/LoadingModal";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';



export default function Account (){
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



    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [searchEmail,setSearchEmail] = useState('');
    const [change,setChange] = useState(false); 
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if(searchEmail.length > 0) return;
                const response = await fetch(`/api/user?page=${page}&pageSize=${pageSize}`);

                const data = await response.json();

                setUsers(data.data);

                setTotalItems(data.totalCount);

                setTotalPages(Math.ceil(data.totalCount / pageSize));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [page, pageSize,searchEmail,change]);
    useEffect(()=>{
        const fetchUsersByEmail = async () => {

            try {
                if(searchEmail.length < 2 || !searchEmail.includes('@gmail')) return;
                
                const response = await fetch(`/api/user?email=${searchEmail}`);

                const data = await response.json();

                setUsers(data.data);
                setPage(1);
                setTotalItems(data.totalCount);
                setTotalPages(Math.ceil(data.totalCount / pageSize));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsersByEmail();
    },[searchEmail,change])


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
    return(
        <>
            <div className=' mt-4'>
                <div className="rounded-t mb-0 py-3 border-0 bg-white">
                    <div className="flex flex-wrap items-center">
                        <div className=" w-full px-4 max-w-full flex flex-row">
                            <h3
                                className="font-semibold text-lg w-full" 
                            >
                                Tài khoản
                            </h3>
                            <Input placeholder='Tìm kiếm theo email' className="max-w-[250px]" onChange={(e)=>setSearchEmail(e.target.value)} />
                        </div>
                    </div>
                </div>
                <AccountTable account={users} update={()=>setChange(!change)}/>
            
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
        </>
    )
}