import { useEffect, useState } from "react";
import Container from "../shared/Container"
import CartItem from './CartItem';
import DeActiveCartItem from './DeActiveCartItem';
import { useRouter } from "next/navigation";



const ShowCart = ({carts,refetch})=>{
    const [change,setChange] = useState(false);
    const router = useRouter();

    const [cart, setCart] = useState([]);
    let total = 0;
    if(carts){
      total = carts.filter(item => item.isActive).reduce((acc, item) => acc + (item.salePriceAfterDiscount * item.quantity), 0);

    }
    useEffect(() => {
      if (change) {
        refetch().then(() => setChange(false));
      }
    }, [change, refetch]);

    useEffect(()=>{
      setCart(carts);
    },[carts])
     return(
        <Container>
              <div className="mx-auto">
                <div className="mx-auto max-w-3xl">
                  <div className="bg-white shadow">
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                      <div className="flow-root">
                        <ul className="my-8">
                          {cart && cart.filter(item => item.isActive).map((item,index)=>(
                             <CartItem item={item} key={index} setChange={setChange} change={change}/>
                          ))}
                        </ul>
                        <ul className="my-8 opacity-50">
                        {cart && cart.filter(item => !item.isActive).map((item,index)=>(
                             <DeActiveCartItem item={item} setChange={setChange} key={index} />
                          ))}
                        </ul>
                      </div>


                      <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Tạm tính</p>
                        <p className="text-2xl font-semibold text-gray-900"><span className="text-md font-normal">{total.toLocaleString()} </span><span className='font-normal '>đ</span> </p>
                      </div>

                      <div className="mt-6 text-center">
                        <button type="button" onClick={()=>router.push(`/cart/checkout`)} className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                          Thanh toán
                          <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </Container>
    )
}

export default ShowCart