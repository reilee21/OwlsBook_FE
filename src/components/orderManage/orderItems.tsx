
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';
interface OrderDetail {
    quantity: number;
    salePrice: number;
    discountPercent: number;
    orderId: string;
    bookId: number;
    bookTitle: string;
    imageThumbnail: string;
  }
  
  interface OrderDetailProps {
    items: OrderDetail[];
  }

export default function OrderItems ({items}:OrderDetailProps) {
  return(
  <Card>
      <CardContent>
      <table className="items-center w-full bg-transparent border-collapse mt-4">
          <thead>
            <tr>
              <Thead>Sản phẩm</Thead>
              <Thead>Số lượng</Thead>
              <Thead>Giá</Thead>
              <Thead>Giảm giá</Thead>
              <Thead>Tạm tính</Thead>
            </tr>
          </thead>
          <tbody>
            {items && items.map((item, index) => (
              <TRow key={index} >
                <TCell>
                    <div className="flex flex-row gap-2">
                      <img className='h-12 w-12'
                            src={`https://localhost:7000/File?image=${item.imageThumbnail}`}
                            alt="Book"
                          />
                      <h5 className="">
                        {item.bookTitle}
                      </h5>
                    </div>
                </TCell>
                <TCell>
                  {item.quantity}
                </TCell>
                <TCell>
                    {item.salePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </TCell>
                <TCell>
                    {(item.salePrice*(item.discountPercent/100)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </TCell>
                <TCell>
                    {(item.salePrice*(1-item.discountPercent/100)*item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </TCell>
              </TRow>
            ))}
          </tbody>
        </table>

      </CardContent>
      <CardFooter></CardFooter>
  </Card>
  )
}