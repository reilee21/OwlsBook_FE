import React, { useEffect, useState } from 'react';

const QuantityInput = ({max, onChange}) => {
    const [quantity, setQuantity] = useState(1);
    useEffect(()=>{
        if(quantity > max ){
            setQuantity(max); return;
        }
        if(quantity < 1){
            setQuantity(1); return;
        }
        onChange(quantity)
    },[quantity,max])
   
    const handleInputChange = (event) => {
        const inputVal = event.target.value;
        const numericValue = parseInt(inputVal.replace(/\D/g, '')); 
        if (!isNaN(numericValue)) {            
            setQuantity(numericValue);
        } else { 
            setQuantity(1);
        }
    };
    const incrementQuantity = () => {
        if (quantity < max) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    return (
        <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg max-w-[150px]">
            <div className="flex items-center gap-x-1.5">
                <button
                    type="button"
                    className="size-6 inline-flex justify-center items-center
                     gap-x-2 text-sm font-medium rounded-md border
                      border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 
                      disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                    onClick={decrementQuantity}
                >
                    <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                    </svg>
                </button>
                <input
                    className="p-0 w-full bg-transparent border-0 text-gray-800 text-center 
                     
                             focus:outline-none dark:text-black"
                    type="text"
                    value={quantity}
                    onChange={handleInputChange}
                />
                <button
                    type="button"
                    className="size-6 inline-flex justify-center  items-center gap-x-2 text-sm 
                    font-medium rounded-md border border-gray-200 bg-white text-gray-800 
                    shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                    onClick={ incrementQuantity}
                >
                    <svg className="flex-shrink-0 size-3.5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default QuantityInput;
