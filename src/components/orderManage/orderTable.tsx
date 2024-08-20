import React from 'react';
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';
import { format } from 'date-fns';
import {useRouter} from "next/navigation"
import StatusBadge from '../shared/order/StatusBadge';
interface OrderDetail {
  quantity: number;
  salePrice: number;
  discountPercent: number;
  orderId: string;
  bookId: number;
  bookTitle: string;
  imageThumbnail: string;
}

interface Order {
  orderId: string;
  total: number;
  createAt: string;
  paymentMethod: string;
  status: string;
  isPaid: boolean;
  deliveryAddress: string;
  transactionId: string | null;
  voucherId: string | null;
  name: string;
  phonenumber: string;
  shippingFee: number;
  payment: string | null;
  details: OrderDetail[];
}

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  const router = useRouter();
  const truncateOrderId = (orderId: string) => {
    if (orderId.length > 10) {
      return `${orderId.substring(0, 10)}...`;
    }
    return orderId;
  };
  const details = (id:string) =>{
    router.push(`order/${id}`)
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <Thead>Mã đơn hàng</Thead>
              <Thead>Số sản phẩm</Thead>
              <Thead>Tên khách hàng</Thead>
              <Thead>Ngày tạo</Thead>
              <Thead>Thanh toán</Thead>
              <Thead>Trạng thái</Thead>
              <Thead>Tổng tiền</Thead>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order, index) => (
              <TRow key={index} onClick={() => details(order.orderId)}>
                <TCell>
                  <div className='font-semibold '>
                    {truncateOrderId(order.orderId)}
                  </div>
                </TCell>
                <TCell>
                  {order.details.length}
                </TCell>
                <TCell>
                  {order.name}
                </TCell>
                <TCell>
                {format(new Date(order.createAt), 'HH:mm dd-MM-yyyy')}
                </TCell>
                <TCell>
                  {order.isPaid ? (
                    <>Đã thanh toán</>
                  ):(
                    <>Chưa thanh toán</>

                  )}
                </TCell>
                <TCell>
                    <StatusBadge status={order.status} />

                </TCell>
                <TCell>
                  {order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </TCell>
              </TRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
