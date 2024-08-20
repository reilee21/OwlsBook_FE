import React from 'react';
import { format } from 'date-fns';
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';
import { TooltipLabel } from '../shared/ToolTipLabel';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineViewInAr } from "react-icons/md";
import ModalSimilar from './ModalSimilar';

interface BookCrawl {
  bookName: string;
  price: string;
  bookUrl: string;
  website: string;
  dateCrawl: string;
  bookType: string;
  similarBookInDB:string[];
}

interface BookCrawlProps {
  booksCrawl: BookCrawl[];
}

const BookCrawlTable: React.FC<BookCrawlProps> = ({booksCrawl }) => {


  const handleOpenURL = (url:string) =>{
    window.open(url);
  }
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <Thead>Tên </Thead>
              <Thead>Giá</Thead>
              <Thead>Loại</Thead>
              <Thead>Website</Thead>
              <Thead>Thời điểm làm mới</Thead>
              <Thead> </Thead>
              <Thead> </Thead>

            </tr>
          </thead>
          <tbody>
            {booksCrawl && booksCrawl.map((item, index) => (
              <TRow key={index} >              
                <TCell>
                    <TooltipLabel label={item.bookName}/>
                </TCell>
                <TCell>
                    {item.price}
                </TCell>
                <TCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center text-white ${item.bookType ==='Mới' ? 'bg-green-500' :'bg-red-500 '}`}>
                    {item.bookType}
                  </span>
                </TCell>
                <TCell>
                  {item.website}
                </TCell>
                <TCell>
                  
                  {format(new Date(item.dateCrawl), 'hh:mm dd/MM/yyyy')}

                </TCell>
                <TCell>
                  <div className='p-1 relative' onClick={()=>handleOpenURL(item.bookUrl)}>
                    <div className='absolute top-0 left-0'>
                      <TooltipLabel label={'Xem chi tiết'} className='w-6 text-transparent'/>
                    </div>
                    <IoIosInformationCircleOutline size={24}/>
                  </div>

                </TCell>
                <TCell>
                  {item.similarBookInDB && item.similarBookInDB.length>0 &&(
                    <ModalSimilar item={item}/>

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

export default BookCrawlTable;
