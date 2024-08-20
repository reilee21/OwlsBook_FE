
const Pagination = ({currentPage, pageSize, totalItems, paginate,background="" }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <div className={`pagination flex flex-row justify-center ${background}`}>
                {pageNumbers.map(number => (
                    <div key={number} className={`page-item px-4 py-2 m-2 rounded-md cursor-pointer transition transform delay-50 
                             ${currentPage === number ? 'bg-gray-800 text-white' 
                             : ''}`}
                             onClick={() => paginate(number)}
                        >
                                                    {number}

                    </div>
                ))}
            </div>
        </nav>
    );
};
export default Pagination;