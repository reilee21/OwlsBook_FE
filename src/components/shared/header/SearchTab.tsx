import { useRouter } from 'next/navigation';
import Search from './../../icons/Search';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCateSelectedData } from '@/redux/cateSlice';
import SearchDialog from './SearchDialog';



const SearchTab = ()=>{
    const [searchString, setSearchString] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchString.trim()) {
            dispatch(setCateSelectedData({}));
            router.push(`/books/search/?s=${encodeURIComponent(searchString)}`);
            setSearchString('')
        }
    };

    return (
        <>
            <form className="flex items-center max-w-lg mx-auto md:flex hidden" onSubmit={handleSubmit}>   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative max-w-full">
                    <input type="text" id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                    rounded-lg focus:ring-blue-500 focus:border-blue-500
                    w-80 block p-2.5
                    mr-4
                        dark:bg-white-700 dark:border-gray-600 dark:placeholder-black-400
                        dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    placeholder="Tìm kiếm..." required />
                </div>
                <button type="submit" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    <Search className="h-6 w-6" />
                </button>
            </form>
            <form className="flex items-center max-w-lg mx-auto md:hidden flex " >   
                <SearchDialog search={setSearchString} submit={handleSubmit}/>
            </form>
        </>
)}


export default SearchTab