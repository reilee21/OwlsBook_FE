'use client'
import {useState,useEffect} from 'react'
import SelectDiscounts from "@/components/shared/bookManage/bookDiscounts"
import BookManageImages from "@/components/shared/bookManage/bookImage"
import BookManageInfo from "@/components/shared/bookManage/bookInfo"
import BookManageSales from "@/components/shared/bookManage/bookSales"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/components/ui/use-toast'
import { useCreateBookMutation } from '@/services/book/BookManageApi'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
interface BookManage{
    bookTitle:string;
    format:string;
    author:string;
    publishedYear:number;
    publisher:string;
    pageCount:number;
    summary:string;
    categoryName:string;
    quantity:number;
    salePrice:number;
    discountsList:number[];
    images:string[];
    files:File[];
}
const initBookInfo: BookManage = {
    bookTitle: '',
    format: '',
    author: '',
    publishedYear: 2000,
    publisher: '',
    pageCount: 0,
    summary: '',
    categoryName: '',
    quantity: 0,
    salePrice: 0,
    discountsList: [],
    images:[],
    files: []
};


export default function CreateBookPage () {
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


    const [bookInfo, setBookInfo] = useState<BookManage>(initBookInfo);
    const {toast} = useToast();
    const [createB] = useCreateBookMutation();

    const updateBookInfo = (updatedInfo: BookManage) => {
        setBookInfo((pre)=>({
            ...pre,
            bookTitle:updatedInfo?.bookTitle,
            format: updatedInfo?.format,
            author: updatedInfo?.author,
            publishedYear: updatedInfo?.publishedYear,
            publisher: updatedInfo?.publisher,
            pageCount: updatedInfo?.pageCount,
            summary: updatedInfo?.summary,
            categoryName: updatedInfo?.categoryName
        }))

    };
    const updateBookSales = (quan:number,price:number)=>{
        if(quan){
            setBookInfo((pre)=>({
                ...pre,
                quantity:quan,
            }))
        }
        if(price){
            setBookInfo((pre)=>({
                ...pre,
                salePrice: price,
            }))
        }
        
    }
    const updatediscount = (listDiscount:number[]) =>{
        if(listDiscount){
            setBookInfo((pre)=>({
                ...pre,
                discountsList:listDiscount,
            }))
        }
    }
    const updateImages = (files:File[]) =>{
        if(files){
            setBookInfo((pre)=>({
                ...pre,
                files:files,
            }))
        }
    }


    const handleSM = async () =>{
        if(bookInfo?.bookTitle.trim().length===0){
            toast({ 
                title:"Lỗi dữ liệu",
                description: "Tên sách không được để trống" ,
                variant:"destructive"});

            return;
        }
        const base64Images = await Promise.all(bookInfo.files.map(async (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }));
        const bookInfoWithBase64 = {
            ...bookInfo,
            images: base64Images,
        };
        try {
           
            const response = await createB(bookInfoWithBase64)
         

        } catch (error) {
            console.error('Create book error:', error);
            toast({
                title: "Lỗi",
                description: "Không xác định",
                variant: "destructive"
            });
        }
    }
    return(
        <Card className="mt-2">
            <CardHeader>
                <div className='flex flex-row justify-between items-center'>
                    <CardTitle>Thêm sách</CardTitle>
                    <Button onClick={handleSM}>Lưu </Button>

                </div>

            </CardHeader>
            <CardContent>
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="w-full">
                        <div className="sticky top-10">
                        <BookManageInfo info={bookInfo} update={updateBookInfo} />

                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <BookManageSales info={bookInfo} update={updateBookSales} />
                        <SelectDiscounts  onChange={updatediscount}/>
                        <BookManageImages  update={updateImages}/>

                    </div>                   
                </div>
                <div className="">
                </div>
            </CardContent>
            
        </Card>
    )
}