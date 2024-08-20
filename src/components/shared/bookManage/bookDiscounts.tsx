import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetDiscountByNameQuery } from "@/services/discount/discountApi";
import { useEffect, useState } from "react";





interface Discount{
    discountId:number;
    discountPercent:number;
    discountName:string;
}

interface Props{
    init:Discount[];
    onChange:(list:number[])=>void;
}



export default function SelectDiscounts ({init,onChange}:Props){
    const [list,setList] = useState<Discount[]>([]) 
    const [open,setOpen] = useState(false);

    const [search,setSearch] = useState('')
    const [discounts,setDiscounts] = useState([]);

    const {data} = useGetDiscountByNameQuery({
        search:search
    })
    const total = () => {
        return list.reduce((total, discount) => total + discount.discountPercent, 0);
    }
    useEffect(()=>{
        if(init){
            setList(init)
        }
    },[init])

    useEffect(()=>{
        if(data){
            setDiscounts(data)
            setOpen(true)
        }else{
            setOpen(false)

        }
    },[data])
    useEffect(()=>{
        const newl = list.map((dis)=>dis.discountId);
        onChange(newl)
    },[list])



    const handleRemove = (id:number)=>{
        var newList = list.filter((item)=>item.discountId!== id);
        setList(newList);
    }
    const handleAdd = (item:Discount) =>{
        const check = list.find((discount) => discount.discountId === item.discountId);
        if (!check) {
          const newList = [...list, item]; 
          setList(newList);
        }
        
        clear();     
    }

    const clear = () =>{
        setSearch('');
    }

    return(
        <Card>
            <CardHeader>
             <Label>Giảm giá - {total()}%</Label>

            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="relative w-full z-50 " onMouseLeave={clear} >
                        <Input placeholder="Tên giảm giá" 
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)} 
                       
                        />
                        <div className="absolute p-2 w-full ">
                            {discounts && open &&(
                                <div className="border-2 bg-white border-blue-950 rounded-lg text-blue-950 transition ease-in-out delay-150 ">
                                    {discounts.map((item)=>(
                                        <div  key={item?.discountId} className="p-1">
                                            <h5 onClick={()=>handleAdd(item)}
                                                className="p-2 hover:bg-slate-200 cursor-pointer rounded-lg">
                                                {item?.discountName} - {`(`}{item.discountPercent}%{`)`}
                                            </h5> 
                                        </div>  
    
                                    ))}
                                   
                                    
                                </div>
                            )}
                           
                        </div>  
                    </div>


                    <div className="flex flex-wrap gap-2">
                        {list.length > 0 && list.map((item)=>(
                            <div key={item.discountId}
                            className="flex flex-row gap-1 py-1 px-2 rounded-lg border-[1px] border-slate-700 items-center bg-slate-200">
                                <h5 className="text-sm select-none font-semibold">
                                    {item.discountName} - {item.discountPercent} %
                                </h5>
                                <span onClick={()=>handleRemove(item.discountId)}
                                className="text-md font-semibold text-rose-900 p-[1px] cursor-pointer">x</span>
                            </div>
                        ))}
                    </div>


                </div>
            </CardContent>

            <CardFooter>

            </CardFooter>
        </Card>
        
    )
}