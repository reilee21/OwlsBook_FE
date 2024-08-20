import React from 'react';
import { FaCircle } from "react-icons/fa";
import { format } from 'date-fns';
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';

interface Discount {
  discountName: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

interface DiscountTableProps {
  discounts: Discount[];
  setEditDC: (item: Discount) => void;
}

const DiscountTable: React.FC<DiscountTableProps> = ({ discounts, setEditDC }) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <Thead>Tên chương trình</Thead>
              <Thead>Phần trăm giảm</Thead>
              <Thead>Bắt đầu</Thead>
              <Thead>Kết thúc</Thead>
              <Thead>Trạng thái</Thead>
            </tr>
          </thead>
          <tbody>
            {discounts && discounts.map((item, index) => (
              <TRow key={index} onClick={() => setEditDC(item)}>
              
                <TCell>
                    <div className='font-semibold'>
                        {item.discountName}
                    </div>
                </TCell>
                <TCell>
                    {item.discountPercent}
                </TCell>
                <TCell>
                    {format(new Date(item.startDate), 'dd/MM/yyyy')}
                </TCell>
                <TCell>
                    {format(new Date(item.endDate), 'dd/MM/yyyy')}
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

export default DiscountTable;
