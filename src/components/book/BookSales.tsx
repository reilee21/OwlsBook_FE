
import { useEffect, useState } from 'react';
import Star from './../icons/Star';
import QuantityInput from './../shared/book/QuantityInput';
import Address from '../shared/checkout/Address';
import DeliveryEstimate from './Delivery';
import { useGetProfileQuery } from '@/services/profile/profileApi';
import { useGetShippingFeeMutation } from '@/services/checkout/CheckoutApi';
import {format} from 'date-fns'

const BookSales = ({book,setCart,handleAddToCart})=>{
  const [quantity, setQuantity] = useState(1);
  const {data:user} = useGetProfileQuery();
  
  const [delivery,setDelivery] = useState({city:'01',district:'',estimateTime:0,expecteDate:''})
  
  const [getDeliveryData] = useGetShippingFeeMutation()
  useEffect(()=>{
    const fetch = async () =>{
      try{
        var rs = await getDeliveryData({city:delivery.city,district:delivery.district})
        if(rs) 
          setDelivery(prev => ({
            ...prev,
            estimateTime: rs.data.estimatedDeliveryTime,
          }));

      }catch(e){console.error(e)}
    }
    fetch()
    console.log(delivery)
  },[delivery.city,delivery.district])
  useEffect(()=>{
    const expect = new Date();
    expect.setDate(expect.getDate()+delivery.estimateTime);
    const date = format(new Date(expect), "dd/MM/yyyy")
    setDelivery(prev => ({
      ...prev,
      expecteDate:date
    }));

  },[delivery.city,delivery.district,delivery.estimateTime])

  useEffect(() => {
    if (user && user.city && user.district) {
      setDelivery(prev => ({
        ...prev,
        city: user.city,
        district: user.district,
        ward:user.ward
      }));
    }
  }, [user]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setCart((prevCart) => ({
      ...prevCart,
      quantity: newQuantity,
    }));
  };
  const handleChangeDelivery = () =>{

  }

  const averageRating = book.reviews.reduce((acc, review) => acc + review.ratingPoint, 0) / book.reviews.length;
  const totalReviews = book.reviews.length;
  const roundedAverageRating = Math.floor(averageRating);

    return(
        <div className="lg:col-span-2 shadow p-4 rounded-lg bg-white">
          <div className=' flex flex-col justify-between h-full'>
            <div className='px-2'>
                <h1 className="sm: text-xl font-semibold text-gray-900 sm:text-3xl">{book.bookTitle}</h1>
                <div className='mt-2 text-sm flex flex-col gap-2'>
                  <h5 className=''> Tác giả : <span className='font-semibold'>{book.author}</span></h5>
                  <h5 className=''> NXB : <span className='font-semibold'>{book.publisher}</span></h5>
                  <h5 className=''> Loại bìa : <span className='font-semibold'>{book.format}</span></h5>
                  <div className='flex flex-row'>
                    <Star rating={roundedAverageRating}/>
                    <h5 className='text-sm px-2 text-gray-500'>{`(`}{totalReviews} đánh giá   {`)`}</h5>
                  </div>
                </div>
                <div className="mt-5 flex items-center text-indigo-900">
                  <div className="flex items-end">
                    {book.totalDiscount !=0 ? (
                      <>
                        <h1 className="text-3xl font-bold">{book.salePriceAfterDiscount.toLocaleString()}<sup className='font-normal underline text-lg pl-2'>đ</sup> </h1>
                        <span className="line-through pl-4 text-gray-400">{book.salePrice.toLocaleString()}<span className='font-normal '>đ</span></span>
                      </>
                    ):(
                      <h1 className="text-3xl font-bold">{book.salePriceAfterDiscount.toLocaleString()}<sup className='font-normal underline text-lg pl-2'>đ</sup> </h1>
                      
                      )
                    }
                  </div>          
                </div>
               
            </div>
            <div className='p-2'>
                <div className='w-full'>
                  <hr/>
                  <div className='flex flex-row py-2 gap-2'>
                      <h5 className='w-1/3 whitespace-nowrap py-2'>Giao hàng </h5>
                      <div className='text-sm'>
                        <DeliveryEstimate deli={delivery} setDeli={setDelivery}/>
                        <h5 className='w-full'>Dự kiến ngày giao: {delivery.expecteDate} </h5>
                      </div>

                  </div>
                  <hr/>
                </div>
            
              {book.quantity > 0 ? (
                    <div className='flex flex-col items-start'>
                        <div className='flex flex-row justify-between my-2 py-2 items-center '>
                          <h5 className='w-[100px]'> Số lượng </h5>
                          <QuantityInput max={book.quantity} onChange={handleQuantityChange} />        
                        </div>
                        <div className='w-full flex flex-row'>
                          <div className='w-[100px]'></div>
                          <button type="button" onClick={handleAddToCart}
                            className="max-w-[200px] flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                  </svg>
                                  <h5 className='w-full whitespace-nowrap'>
                                  Thêm vào giỏ

                                  </h5>
                            </button>

                        </div>
                    </div>


                ):(
                  <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                    <button type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-500 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow ">
                        Hết hàng
                    </button>
                  </div>
                )}
            
            </div>
          </div>
      </div>
    )
}
export default BookSales