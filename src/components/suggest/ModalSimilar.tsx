import { useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle,Dialog, DialogContent, DialogTrigger, DialogFooter  } from "../ui/dialog";
import { MdOutlineViewInAr } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";


interface BookCrawl {
    bookName: string;
    price: string;
    bookUrl: string;
    website: string;
    dateCrawl: string;
    bookType: string;
    similarBookInDB:string[];
}
interface Props{
    item:BookCrawl;
}

export default function ModalSimilar({item}:Props){
   
    return(

        <Dialog >
            <DialogTrigger asChild>
                <div className='p-1'>
                  <MdOutlineViewInAr size={24}/>
                </div>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>{item.bookName}</DialogTitle>
                </DialogHeader>
                <div className=''>
                    <h5 className="">
                        Sách tương tự trong kho 
                    </h5>
                    {item.similarBookInDB && item.similarBookInDB.length>0 &&item.similarBookInDB.map((book,index)=>(
                        <div className='flex flex-row gap-2 p-2 hover:bg-slate-200 rounded-lg items-center'  key={index}>
                            <span><FaCircle size={8}/></span>

                            <h5 className="">
                                {book}
                            </h5>
                        </div>                        
                    ))}
                </div>

            </DialogContent>
        </Dialog>
    )
}