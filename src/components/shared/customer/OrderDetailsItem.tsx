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
const OrderDetailsItem: React.FC<{ item: OrderItemProps }> = ({ item }) => {
    const img = item ? 'https://localhost:7000/File?image='+item.book.image : '';
    const router = useRouter();
    const bookDetails = ()=>{
        router.push(`/books/${item.book.title}`)
    }
    return (
        <>
            <div className="w-full grid grid-cols-8 p-2 items-start">
                <div className="col-span-4 w-full flex flex-row " onClick={bookDetails}>
                    <img className="object-contain h-16 w-16" 
                        src={img} alt="image" />
                    <h1 className=" m-2">{item.book.title}</h1>
                    
                </div>
                <div className="whitespace-nowrap">
                    <h1 className="text-sm text-indigo-950 px-2 text-center">
                        {item.salePrice.toLocaleString()} đ
                    </h1>
                </div>
                <div className="whitespace-nowrap">
                    <h1 className="text-sm text-indigo-950 px-2 text-center">
                        {item.quantity}
                    </h1>
                </div>
                <div className="whitespace-nowrap">
                    <h1 className="text-sm text-indigo-950 px-2 text-center">
                        {(item.salePrice*(item.discountPercent/100)).toLocaleString()} đ
                    </h1>
                </div>
                <div className="whitespace-nowrap">
                    <h1 className="text-sm text-indigo-950 px-2 text-center">
                        {(item.salePrice*(1-item.discountPercent/100)*item.quantity).toLocaleString()} đ
                    </h1>
                </div>
                
            </div>
            <hr className="mt-1"/>

        </>

    );
};

export default OrderDetailsItem;