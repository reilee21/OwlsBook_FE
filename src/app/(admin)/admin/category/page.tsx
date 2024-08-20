'use client'
import AddCategory from "@/components/cateManage/addCategory";
import CategoryTable from "@/components/cateManage/categoryTable";
import EditCategory from "@/components/cateManage/editCategory";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllCategoryQuery } from "@/services/cate/CateApi";
import { useEffect,useState } from "react";
import { LoadingModal } from "@/components/shared/LoadingModal";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function CategoryPage(){
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


    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(10);
    const [searchName,setSearchName]= useState('');

    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [category,setcategory] = useState([]);
    const [editModal,setEditmodal] = useState(false);
    const [editCate,setEditCate] = useState(null);

    

    const {data,refetch,isLoading} = useGetAllCategoryQuery({
        page:page,
        pageSize:pageSize,
        search:searchName
    });
    useEffect(()=>{

        if(data){
            setTotalItems(data.totalItems)
            setTotalPages(data.totalPages)
            setcategory(data.items)
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
    const setEDDC = (category) =>{
        setEditCate(category)
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
                        Danh mục sản phẩm   
                    </h3>
                    <Input placeholder='Tên danh mục'
                     className="max-w-[250px] mr-4" onChange={(e)=>setSearchName(e.target.value)} />
                    <AddCategory updated={refetch}/>
                </div>
            </div>
        </div>
        <CategoryTable categories={category} setEditCategory={setEDDC}/>
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
        <EditCategory category={editCate} 
                      isOpen={editModal}
                      onClose={()=>{
                          setEditmodal(false);
                          setEditCate(null);
                      }}
                      update={refetch}/>
                
        
    </div>
    )
}