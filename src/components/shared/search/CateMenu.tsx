import { setCateSelectedData } from "@/redux/cateSlice";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxCate from "../CheckboxCate";


const CateMenu = ({cates,selectedCate='',selectedSubCate=''})=>{

    const cate = cates.filter(c=>c.parentCategory==null);
    const subcate = cates.filter(c=>c.parentCategory!=null);
    const [cateSelected,setCateSelected] = useState('');
    const [subCateSelected,setSubCateSelected] = useState('');
    const cated = useSelector((state)=>state.cates)
    const router = useRouter();

    useEffect(()=>{
        if(selectedCate){
            setCateSelected(selectedCate)
            if(selectedSubCate){
                setSubCateSelected(selectedSubCate)
            }
        }
    },[selectedCate,selectedSubCate])
    useEffect(()=>{
        const updatecate = ()=>{
            if(cated.cateSelected ){
                setCateSelected(cated.cateSelected);
                setSubCateSelected(cated.subCateSelected);
            }
        }
        updatecate();       
    },[])
   
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setCateSelectedData({cateSelected,subCateSelected}))
    },[subCateSelected])
    useEffect(()=>{
        dispatch(setCateSelectedData({cateSelected}))
    },[cateSelected])
    return(
        <div className="shadow border-2 rounded-lg p-4 min-h-fit bg-white">
         

           {cate.map((item,index)=>(
                <div key={index} >
                    <div className="" onClick={()=>{
                        setCateSelected(`${item.categoryName}`);
                        router.push(`/category/?cate=${item.categoryName}`)
                        setSubCateSelected('');
                    }}>
                        <CheckBoxCate index={index} label={item.categoryName} isCheck={cateSelected === item.categoryName ? true : false}/>
                    </div>


                    <div className={` px-4 ${cateSelected === `${item.categoryName}` ? 'block border-b-2' : 'hidden'}`}>
                        {subcate.filter(s=>s.parentCategory===item.categoryId).map((sc,indexs)=>(
                            <h5 key={indexs}
                             onClick={()=>{
                               setSubCateSelected(`${sc.categoryName}`);
                               router.push(`/category/?cate=${sc.categoryName}`)

                             }}
                            className={`py-1 px-8 m-2 text-md cursor-pointer hover:text-sky-950 transition duration-300 transform ${subCateSelected === `${sc.categoryName}` ? 'font-bold text-blue-950':''}`}>
                                {sc.categoryName}
                            </h5>
                        ))}
                    </div>
                    
                   
                </div>

           ))}


        </div>
    )
};


export default CateMenu