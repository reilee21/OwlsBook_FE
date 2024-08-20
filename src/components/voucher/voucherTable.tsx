import React from 'react';
import { FaCircle } from 'react-icons/fa';
import TRow from '../shared/TABLE/TRow';  
import TCell from '../shared/TABLE/TCell'; 
import Thead from '../shared/TABLE/Thead'; 

interface Voucher {
  code: string;
  quantity: number;
  type: 'Amount' | 'Percent';
  value: number;
  active: boolean;
}

interface VoucherTableProps {
  vouchers: Voucher[];
  setEditVC: (item: Voucher) => void;
}

const VoucherTable: React.FC<VoucherTableProps> = ({ vouchers, setEditVC }) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <Thead>Mã giảm giá</Thead>
              <Thead>Số lượng</Thead>
              <Thead>Loại</Thead>
              <Thead>Giá trị</Thead>
              <Thead>Trạng thái</Thead>
            </tr>
          </thead>
          <tbody>
            {vouchers && vouchers.map((item, index) => (
              <TRow key={index} onClick={() => setEditVC(item)}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left flex items-center">
                  <span className='mx-2'>{item.code}</span>
                </th>
                <TCell>
                  <h5 className='mx-2'>{item.quantity}</h5>
                </TCell>
                <TCell>
                  <h5 className='mx-2'>{item.type === 'Amount' ? 'Giá trị' : 'Phần trăm'}</h5>
                </TCell>
                <TCell>
                  <h5 className='mx-2'>{item.type === 'Amount' ? item.value.toLocaleString() + " đ" : item.value + "%"}</h5>
                </TCell>
                <TCell className="text-sm">
                  {item.active ? (
                    <div className='flex flex-row gap-2 items-center'>
                      <FaCircle color='green' />
                      <span>Đang hoạt động</span>
                    </div>
                  ) : (
                    <div className='flex flex-row gap-2 items-center'>
                      <FaCircle color='red' />
                      <span>Không hoạt động</span>
                    </div>
                  )}
                </TCell>
              </TRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherTable;
