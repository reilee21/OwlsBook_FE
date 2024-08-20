

import {useGetAllCatesQuery} from '@/services/cate/CateApi';
import MenuSkeleton from './../shared/search/MenuSkeleton';
import CateMenu from './../shared/search/CateMenu';
import { useEffect, useState } from 'react';


const CateSearch  = ({selectedcate=''}) =>{
    const [cate,setCate]= useState('');
    const [subCate,setSubCate]= useState('')

    
    const {data:cates} = useGetAllCatesQuery();
    useEffect(()=>{
        if(cates && selectedcate){
            const c = cates.find(item => item.categoryName === selectedcate)
            if(c.parentCategory){
                const p = cates.find(item => item.categoryId === c.parentCategory)
                console.log(p)
                setCate(p.categoryName)
                setSubCate(c.categoryName)
            }else{
                setCate(c.categoryName)
                setSubCate('')
            }

        }
    },[cates])
    if(cates == null) return (
        <>
         <h1 className="max-w-lg text-3xl mb-4 font-semibold leading-relaxed dark:text-indigo-950">Danh mục</h1>
         <MenuSkeleton/>
        </>
    ) 
    return(<>
            <CateMenu cates={cates} selectedCate={cate} selectedSubCate={subCate} />
    </>)
}



export default CateSearch
