import BookCard from "../shared/BookCard"





const Result  = ({books}) =>{
    if(!books || books.length === 0) return (<><h1 className="text-center font-semibold text-xl mt-4">Không tìm thấy</h1></>)
    return(<>
        <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 grid-cols-2 z-0 bg-white">
            {books.map((item,index)=>(
                <div key={index} className="p-2">
                    <BookCard  book={item}/>
               </div>

            ))}
        </div>
    </>
)
}

export default Result