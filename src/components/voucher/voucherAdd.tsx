import { useState } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle,Dialog, DialogContent, DialogTrigger, DialogFooter  } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useCreateVoucherMutation } from "@/services/voucher/voucherApi";
import { useToast } from "../ui/use-toast";

interface Voucher{
    code:string,
    quantity:number,
    type: number,
    value:number,
    minOrderValue:number
}
const initialVoucherState: Voucher = {
    code: '',
    quantity: 0,
    type: 0,
    value: 0,
    minOrderValue: 0
};

export default function AddVoucher({updated}){
    const [newVoucher,setNewVoucher] = useState<Voucher>(initialVoucherState);
    const [create] = useCreateVoucherMutation();
    const { toast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let val = value;
        if (name === 'quantity' || name === 'minOrderValue') {
            val = val.replace(/,/g, ''); 
        }
        console.log(val);
        setNewVoucher((prevVoucher) => ({
            ...prevVoucher,
            [name]: name === 'quantity'  || name === 'minOrderValue' ? Number(val) : value
        }));
    };
    const handleSelectChange = (value) => {
        
        setNewVoucher((prevVoucher) => ({
            ...prevVoucher,
            type: Number(value),
            value:0,
        }));
    };
    const validateNumber = (evt) => {
        var theEvent = evt || window.Event;
        let key;
        if (theEvent.type === 'paste') {
            key = theEvent.clipboardData.getData('text/plain');
        } else {
            key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        const specialKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
        var regex = /[0-9]|\./;
        if (!regex.test(key) && !specialKeys.includes(evt.key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    };
    const handleSM = async (e: React.FormEvent) =>{
        e.preventDefault();

        try{
            const rs = await create(newVoucher);
            if(rs.data){
                if(rs.data.code ==='11'){
                    toast({
                        variant: "destructive",
                        title: "Lỗi",
                        description: rs.data.message,
                      })
                }else{
                    updated();
                    toast({
                        variant: "success",
                        title: "Thành công",
                      })
                    
                }
            }

        }catch(e){
        console.error(e)
        }
    }
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const val = value.replace(/,/g, ''); 

        if (newVoucher.type === 0 && Number(val) > 100) {
            return;
        }
        setNewVoucher((prevVoucher) => ({
            ...prevVoucher,
            value:Number(val)
        }));
    };
    const handleCloseDialog = () => {
        setNewVoucher(initialVoucherState); 
    };
    return(

        <Dialog onOpenChange={handleCloseDialog}>
                <DialogTrigger asChild>
                    <Button>Thêm</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Tạo mã giảm giá</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSM}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-2">
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label className="whitespace-nowrap w-30">Code</Label>
                                <Input
                                    minLength={4}
                                    name="code"
                                    placeholder="Code"
                                    type="text"
                                    value={newVoucher.code}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label className="whitespace-nowrap w-30">Số lượng</Label>
                                <Input
                                        name="quantity"
                                        placeholder="Quantity"
                                        type="text"
                                        value={newVoucher.quantity.toLocaleString()}
                                        onChange={handleChange}
                                        onKeyDown={validateNumber}
                                        required
                                    />

                               
                            </div>
                            </div>
                           
                            <div className=" flex flex-row items-center gap-4">
                                <Label className="whitespace-nowrap w-30">Loại</Label>
                                <Select onValueChange={handleSelectChange} value={newVoucher.type} required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Loại voucher" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={0}>Phần trăm</SelectItem>
                                        <SelectItem value={1}>Giá trị</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-row gap-2">
                            <div className="flex flex-row items-center gap-4">
                            {newVoucher.type === 0 ?(
                                    <Label className="whitespace-nowrap w-30">Phần trăm</Label>

                                ):(
                                    <Label className="whitespace-nowrap w-30">Số tiền</Label>
                                )}
                                 <Input
                                        name="value"
                                        placeholder="Value"
                                        type="text"
                                        value={newVoucher.value.toLocaleString()}
                                        onKeyDown={validateNumber}
                                        onChange={handleValueChange}
                                        required

                                    />
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <Label className="whitespace-nowrap w-30">Giá trị đơn hàng tối thiểu</Label>
                                <Input
                                    name="minOrderValue"
                                    placeholder="Min Order Value"
                                    type="text"
                                    onKeyDown={validateNumber}
                                    value={newVoucher.minOrderValue.toLocaleString()}
                                    onChange={handleChange}
                                    required

                                />
                            </div>
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