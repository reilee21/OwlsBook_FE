import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';
import { FaCircle } from "react-icons/fa6";
import { useRouter } from "next/navigation";


interface BImage{
    imageName:string;
}
interface Product {
    bookTitle: string;
    format:string;
    category:any;
    bookImages:BImage[];
    author:string;
    salePrice:number;
    quantity:number;
    isActive:boolean

  }
  
  interface ProductTableProps {
    products: Product[];
  }
  

export default function BookTable ({products}:ProductTableProps) {
  const router = useRouter();
  if(!products || products.length < 1) return(
    <div className="w-full mb-6 shadow-lg rounded bg-white">
      <h5 className="p-2 font-medium text-center">Không có sản phẩm</h5>
    </div>

  )
    return(
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <Thead>Sách</Thead>
                <Thead>Giá </Thead>
                <Thead>Số lượng </Thead>
                <Thead>Trạng thái </Thead>
              </tr>
            </thead>
            <tbody>
              {products.map((item,index)=>(
                <TRow key={index} onClick={()=>router.push(`product/${item.bookId}`)}>
                    <TCell>
                      <div className="flex flex-row gap-2">
                          <img src={`https://localhost:7000/File?image=${item.bookImages[0]?.imageName}`} className="w-12 h-12" alt={item.bookTitle}/>
                          <div className="flex flex-col ">
                            <h5 className="font-medium">{item.bookTitle}</h5>
                            <h5 className="">{item.author}</h5>
                          </div>
                      </div>
                    </TCell>
                    <TCell>
                      <h5 className="">
                        {item.salePrice.toLocaleString('vi-VN',{style:'currency',currency:'VND'})}
                      </h5>
                    </TCell>
                    <TCell>
                      <h5>
                        {item.quantity}
                      </h5>
                    </TCell>
                    <TCell>
                    <div className="flex flex-row gap-2 items-center">
                      {item.isActive ? (
                        <>
                          <FaCircle color="green"/>
                          <h5 className="">
                            Đang bán
                          </h5>

                        </>
                          
                        ):
                        (
                         <>
                          <FaCircle color="red"/>
                          <h5 className="">
                            Dừng bán
                          </h5>
                          </>

                        )}
                      </div>
                    </TCell>
                </TRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}