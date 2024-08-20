import { useRouter } from "next/navigation";




interface Book {
    bookId: number;
    title: string;
    image: string;
}

interface OrderItemProps {
    quantity: number;
    salePrice: number;
    discountPercent: number;
    isRated: boolean;
    book: Book;
}
const OrderItem: React.FC<{ item: OrderItemProps }> = ({ item }) => {
    const img = item ? 'https://localhost:7000/File?image='+item.book.image : '';
    const router = useRouter();
    const bookDetails = ()=>{
        router.push(`/books/${item.book.title}`)
    }
    return (
        <>
        <div className="w-full grid grid-cols-12 p-2 items-start">

            <div className="col-span-1 w-full relative cursor-pointer" onClick={bookDetails} >
                <img className="object-contain h-16 w-16" 
                     src={img} alt="image" />
                <span className="absolute bottom-0 right-0 bg-white px-2 rounded-full mb-1 text-sm">
                    x{item ? item.quantity : 'q'}
                </span>
            </div>
            <h1 className="col-span-8 m-2 cursor-pointer h-full" onClick={bookDetails}>{item.book.title}</h1>
            <div className="col-span-3 text-left flex items-center justify-end pr-4 whitespace-nowrap">
                {item.discountPercent > 0 ? (
                    <>
                        <h1 className="text-sm text-gray-500 px-2 line-through">
                            {item.salePrice.toLocaleString()} đ
                        </h1>
                        <h1 className="text-md text-indigo-950">{(item.salePrice*(1-item.discountPercent/100)).toLocaleString()} đ</h1>
                    </>
                ):(
                    <h1 className="text-md text-indigo-950">
                    {item.salePrice.toLocaleString()} đ
                </h1>
                )}
               
            </div>
        </div>
        <hr className="my-1"/>
        </>

    );
};

export default OrderItem;