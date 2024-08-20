


const BookInfo = ({book})=>{
    return(
      
        <div className="mt-2 flow-root pr-20">           
            <div className="flex flex-row justify-between pr-20 py-2">
                <span className="text-md text-gray-600 min-w-[100px]">Tác giả</span>
                <span className="text-md text-gray-800 font-medium pl-8">{book.author}</span>
            </div>
            <div className="flex flex-row justify-between pr-20 py-2">
                <span className="text-md text-gray-600 ">Nhà xuất bản</span>
                <span className="text-md text-gray-800 font-medium">{book.publisher}</span>
            </div>
            <div className="flex flex-row justify-between pr-20 py-2">
                <span className="text-md text-gray-600 ">Năm xuất bản</span>
                <span className="text-md text-gray-800 font-medium  ">{book.publishedYear}</span>
            </div>
            <div className="flex flex-row justify-between pr-20 py-2">
                <span className="text-md text-gray-600 ">Loại bìa</span>
                <span className="text-md text-gray-800 font-medium  ">{book.format}</span>
            </div>
            <div className="flex flex-row justify-between pr-20 py-2">
                <span className="text-md text-gray-600 ">Số trang</span>
                <span className="text-md text-gray-800 font-medium  ">{book.pageCount}</span>
            </div>
        </div>
)
}
export default BookInfo