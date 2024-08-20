import { useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle,Dialog, DialogContent, DialogTrigger, DialogFooter  } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import NumberInput from "../shared/NumberInput";
import { DateRangePicker } from "../shared/DateRagePicker";
import { useCreateDiscountMutation } from "@/services/discount/discountApi";
import { format } from "date-fns";

interface DiscountCreate {
    discountName: string;
    discountPercent: number;
    startDate: Date;
    endDate: Date;
}
const initialVoucherState: DiscountCreate = {
    discountName: '',
    discountPercent: 0,
    startDate: new Date(),
    endDate: new Date(),
};

export default function AddDiscount({updated}){
    const [newDiscount,setNewDiscount] = useState<DiscountCreate>(initialVoucherState);
    const [isOpen,setIsOpen] = useState(false);
    const [create] = useCreateDiscountMutation();
    const { toast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
       setNewDiscount((prevVoucher) => ({
            ...prevVoucher,
            [name]: value
        }));
    };
   
    const handleSM = async (e: React.FormEvent) =>{
        e.preventDefault();
        var sd = format(newDiscount.startDate,'yyyy-MM-dd');
        var ed = format(newDiscount.endDate,'yyyy-MM-dd');
        const sm = {
            discountName: newDiscount.discountName,
            discountPercent: newDiscount.discountPercent,
            startDate: sd,
            endDate: ed,
        }
        try{
            const rs = await create(sm);
            if(rs.data){
                toast({
                    variant: "success",
                    title: "Giảm giá",
                    description:"Tạo mới thành công"
                  })
                  updated()
            }
        }catch(e){
            console.error(e);
            toast({
                variant: "destructive",
                title: "Lỗi",
                description: "Đã có lỗi xảy ra",
              })
        }
      
    }
    const handlePercentChange = (val:number) => {
        setNewDiscount((prevVoucher) => ({
            ...prevVoucher,
            discountPercent: val
        }));   
     };
    const handleCloseDialog = (e) => {
        setNewDiscount(initialVoucherState); 
        setIsOpen(e)
    };
    const handleDateChange = (from:Date, to:Date) =>{
        setNewDiscount((prevVoucher) => ({
            ...prevVoucher,
            startDate:from,
            endDate:to
        }));
    }
    return(

        <Dialog open={isOpen} onOpenChange={(e)=>handleCloseDialog(e)}>
                <DialogTrigger asChild>
                    <Button onClick={()=>setIsOpen(true)}>Thêm</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Tạo chương trình khuyến mãi</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSM}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    <Label className="whitespace-nowrap w-30">Tên chương trình</Label>
                                    <Input
                                        minLength={4}
                                        name="discountName"
                                        placeholder="Tên giảm giá"
                                        type="text"
                                        value={newDiscount.discountName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-row items-center gap-4 w-full">
                                    <Label className="whitespace-nowrap w-30">Phần trăm giảm</Label>
                                    <NumberInput change={handlePercentChange} initvalue={newDiscount.discountPercent} name="discountPercent" isRequired={true} placeholder={""} maxNumber={100}/>
                                
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label className="whitespace-nowrap w-30">Thời gian</Label>

                                <DateRangePicker onDateChange={handleDateChange} />
                            </div>

                        </div>
                           
                           
                        <DialogFooter>                           
                            <Button className="mt-2" type="submit" > Tạo mới </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
    )
}