import OrderCus from "../shared/customer/Order"



const CustomerOrder = ({orders})=>{    
    if(!orders) return<><h1>...</h1></>
    return(
        <div className="mx-2 mt-4 lg:mt-0 px-2">
        {orders.length > 0 ? (
            orders.map((item, index) => (
                <div key={index}>
                    <OrderCus order={item} />
                </div>
            ))
        ) : (
            <div>
                <h1>No orders available</h1>
            </div>
        )}
    </div>
       


)}

export default CustomerOrder