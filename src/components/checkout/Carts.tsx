
import CheckOutCartitem from './Item';
import Container from '../shared/Container';
const CheckOutCart = ({cart})=>{
    return(<>
            <div className="mx-auto w-full">
                <div className="max-w-full">
                    <div className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                <ul className="my-8">
                                    {cart && cart.map((item,index)=>(
                                        <CheckOutCartitem item={item} key={index}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>)
}

export default CheckOutCart