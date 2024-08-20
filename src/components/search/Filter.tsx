import React, { use, useEffect, useState } from 'react';
import { FaAngleDown } from "react-icons/fa";




const FitlerSearch  = ({minPrice,maxPrice,setMinPrice,setMaxPrice,sortOrder,setSortOrder,priceError}) =>{

    const [sortdrop,setSortdrop] = useState('hidden');
    const formatNumber = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };    
  
    const handlePriceChange = (setter) => (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, ''); 
        value = formatNumber(value); 
        setter(value);
    }; 
    const sortDisplay = (i)=>{
        if(i==1) setSortdrop('block')
        else setSortdrop('hidden');
    }

    const handleSortChange = (value) => {
        setSortOrder(value);
    };



    return(  
    <div className=" w-full h-fit z-0 border-b-[1px]">
        <div className="rounded-t-lg  w-full p-4 grid lg:grid-cols-6 grid-cols-3 gap-2 bg-white">
           <div className="price-range grid grid-cols-12 col-span-3 items-center justify-center">
            <input
                            className="col-span-5 border-2 shadow-inner p-[4px] text-base rounded-md"
                            type="text"
                            id="minp"
                            placeholder="0"
                            value={minPrice}
                            onChange={handlePriceChange(setMinPrice)}
                        />
                <h5 className='text-center'>-</h5>
                
                <input
                    className="col-span-5 border-2 shadow-inner p-[4px] text-base rounded-md"
                    type="text"
                    id="maxp"
                    placeholder="0"
                    value={maxPrice}
                    onChange={handlePriceChange(setMaxPrice)}
                />
           </div>
           <div className="sort col-span-3 grid grid-cols-3 items-center justify-center z-10 ">
            <p className="text-md font-medium leading-relaxed dark:text-indigo-950">Sắp xếp theo</p>
            <div className="relative border-2 col-span-2 p-[4px] text-base rounded-md flex items-end cursor-pointer hover:shadow-inner"
                onClick={()=>sortDisplay(1)}
                >
                <span className="w-full px-2">
                        {sortOrder==='default' && 'Mặc định'}
                        {sortOrder==='asc' && 'Giá: Thấp tới cao'}
                        {sortOrder==='desc' && 'Giá: Cao tới thấp'}

                </span>
                <div className='absolute right-2 top-2'>
                    <FaAngleDown size={16} />

                </div>
                <div className={`absolute bottom-0 left-0 top-10 gird grid-row w-full cursor-default ${sortdrop} `} 
                    onMouseLeave={()=>sortDisplay(0)}                    
                    >
                   <div className='bg-slate-50 border-2 p-2 rounded-lg'>
                        <div className={`rounded-lg cursor-pointer py-1 text-base pl-2 hover:font-semibold hover:bg-gray-300 ${sortOrder === 'asc' ? 'font-semibold' : ''}`} onClick={() => handleSortChange('asc')}>Giá: Thấp tới cao</div>
                        <div className={`rounded-lg cursor-pointer py-1 text-base pl-2 hover:font-semibold hover:bg-gray-300 ${sortOrder === 'desc' ? 'font-semibold' : ''}`} onClick={() => handleSortChange('desc')}>Giá: Cao tới thấp</div>
                        <div className={`rounded-lg cursor-pointer py-1 text-base pl-2 hover:font-semibold hover:bg-gray-300 ${sortOrder === 'default' ? 'font-semibold' : ''}`} onClick={() => handleSortChange('default')}>Mặc định</div>
           </div>
                </div>

            </div>
           </div>
          
            <span className={`text-pink-900 col-span-12 px-4 pt-2 ${priceError}`}>Khoảng giá không hợp lệ</span>

        </div>

    </div>
    )
}



export default FitlerSearch
