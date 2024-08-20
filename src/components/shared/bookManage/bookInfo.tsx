import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import NumberInput from "../NumberInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import YearPicker from "./yearPicker";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import CategoryDropdown from "./categoryDropdown";
import { Switch } from "@/components/ui/switch";



interface BManageInfo{
    bookTitle:string;
    format:string;
    author:string;
    publishedYear:number;
    publisher:string;
    pageCount:number;
    summary:string;
    categoryName:string;
    isActive:boolean;

}
interface Props{
    info:BManageInfo;
    update: (updatedInfo: BManageInfo) => void;
    showActive:boolean;
}

const initval = {
    bookTitle:'',
    format:'',
    author:'',
    publishedYear:2000,
    publisher:'',
    pageCount:0,
    summary:'',
    categoryName:'',
    isActive:false,

}

export default function BookManageInfo ({info,update,showActive=false}:Props){
    const [val,setVal] = useState<BManageInfo>(initval)
    const [change,setChange] = useState(false);
    const [active,setActive] = useState(false);

    useEffect(() => {
        if(info && info.bookTitle){
            setVal(info); 
            setChange(true)

        }
               
        if(showActive && info){
           setActive(info.isActive)
        }
  

    }, [info]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVal(prevState => ({ ...prevState, [name]: value }));
        setChange(true)

    };

    const handleYearChange = (year: number) => {
        setVal(prevState => ({ ...prevState, publishedYear: year }));
        setChange(true)

    };

    const handlePageCountChange = (count: number) => {
        setVal(prevState => ({ ...prevState, pageCount: count }));
        setChange(true)

    };

    const handleFormatChange = (format: string) => {
        setVal(prevState => ({ ...prevState, format }));
        setChange(true)

    };
    const handleCategoryChange = (nameCate: string) => {
        setVal(prevState => ({ ...prevState, categoryName:nameCate }));
        setChange(true)

    };
    const handleSwitchChange = (val) => {
        setVal(prevState => ({ ...prevState, isActive:val }));
        setChange(true)

    };

    useEffect(()=>{
        handleSwitchChange(active)
    },[active])

    useEffect(()=>{
        if(change){
            update(val);            
        }
        setChange(false)
    },[change])

    return(
        <Card>
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
                    <CardTitle>Thông tin</CardTitle>
                    {showActive&&(
                        <div className="flex flex-row items-center gap-2">
                        <Label htmlFor="active">Mở bán</Label>
                        <Switch id="active" checked={val?.isActive} onCheckedChange={handleSwitchChange}/>
                        </div>
                    )}
                   
                </div>
               
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <Label>Tên</Label>
                        <Input
                            name="bookTitle"
                            value={val?.bookTitle || ''}
                            onChange={handleChange}
                            placeholder="Tên sách"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Tác giả</Label>
                        <Input
                            name="author"
                            value={val?.author || ''}
                            onChange={handleChange}
                            placeholder="Tên tác giả"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Nhà xuất bản</Label>
                        <Input
                            name="publisher"
                            value={val?.publisher || ''}
                            onChange={handleChange}
                            placeholder="Tên nhà xuất bản"
                            required
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col gap-2 basis-1/2">
                            <Label>Năm xuất bản</Label>
                            <YearPicker onChange={handleYearChange} defaultValue={val?.publishedYear || 2000} />
                        </div>
                        <div className="flex flex-col gap-2 basis-1/2">
                            <Label>Số trang </Label>
                            <NumberInput
                                name="pagecount"
                                change={handlePageCountChange}
                                initvalue={val?.pageCount || 0}
                                placeholder="Số trang"
                                isRequired={true}
                                maxNumber={Number.MAX_VALUE}
                                />
                           
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-end">
                    <Select onValueChange={handleFormatChange} value={val?.format || ''}>
                        <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Chọn loại bìa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={'Bìa mềm'}>Bìa mềm</SelectItem>
                            <SelectItem value={'Bìa cứng'}>Bìa cứng</SelectItem>
                        </SelectContent>
                    </Select>
                    <CategoryDropdown width={'w-full'} defaultValue={val?.categoryId || ''} onChange={handleCategoryChange}/>
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-2">
                        <Label>Mô tả</Label>
                        <Textarea
                            className="resize-y min-h-[150px]"
                            name="summary"
                            value={val?.summary || ''}
                            onChange={handleChange}
                            placeholder="Mô tả"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}