import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useEditVoucherMutation,useDeleteVoucherMutation } from "@/services/voucher/voucherApi";
import { useToast } from "../ui/use-toast";

interface VoucherEdit {
    code: string;
    quantity: number;
    type: number;
    value: number;
    minOrderValue: number;
    active: boolean;
    voucherId: number;
}

interface EditVoucherProps {
    voucher: VoucherEdit;
    isOpen: boolean;
    onClose: () => void;
    update:()=>void;
}

export default function EditVoucher({ voucher, isOpen, onClose,update }: EditVoucherProps) {
    const [newVoucher, setNewVoucher] = useState<VoucherEdit>(voucher);
    const [edit] = useEditVoucherMutation();
    const [deleteVC] = useDeleteVoucherMutation();
    const {toast} = useToast();
    useEffect(() => {
        setNewVoucher(voucher);
    }, [voucher]);
    useEffect(() => {
        if(voucher && (voucher.type==='Percentage' || voucher.type==='Amount')) {
            setNewVoucher((pre)=>({
                ...pre,
                type: voucher.type ==='Percentage'? 0 : 1
            }))
        }
    }, [voucher?.type]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let val;
        if(name === 'quantity' || name === 'type' || name === 'value' || name === 'minOrderValue'){
            val = value.replace(/,/g, ''); 
        }
        setNewVoucher((prevVoucher) => ({
            ...prevVoucher,
            [name]: name === 'quantity' || name === 'type' || name === 'value' || name === 'minOrderValue' ? Number(val) : value
        }));
    };

    const handleSelectChange = (value) => {
        setNewVoucher((prevVoucher) => ({
            ...prevVoucher,
            type: Number(value),
            value:0,
        }));
    };
    const handleActiveChange = (checked: boolean) => {
        setNewVoucher((prevVoucher) => ({
            ...prevVoucher,
            active: checked
        }));
    };
    

    const validateNumber = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const theEvent = evt || window.Event;
        let key: string;
        if (theEvent.type === 'paste') {
            key = (evt as ClipboardEvent).clipboardData!.getData('text/plain');
        } else {
            key = theEvent.key;
        }
        const specialKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
        const regex = /^[0-9\b]+$/;
        if (!regex.test(key) && !specialKeys.includes(key)) {
            theEvent.preventDefault();
        }
    };
    const handleDelete = async () => {
  

        try{
            const rs = await deleteVC({id:newVoucher.voucherId});
            if(rs.data){
                update();
                toast({
                        variant: "success",
                        title: "Xoá thành công",
                      })
            }
        }catch(e){
            console.error(e)
            toast({
                variant: "destructive",
                title: "Lỗi",
                description: "Không thể xoá. Hãy ngừng phát hành.",

              })
        }
    }
    const handleSM = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const rs = await edit(newVoucher);
            if(rs.data){
                if(rs.data.code ==='11'){
                    toast({
                        variant: "destructive",
                        title: "Lỗi",
                        description: rs.data.message,
                      })
                }else{
                    update();
                    toast({
                        variant: "success",
                        title: "Cập nhật thành công",
                      })
                    
                }
            }
        }catch(e){
            console.error(e)
        }
    };
    if(!isOpen || newVoucher === null) return <></>
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật mã giảm giá</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSM}>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row gap-4 w-full">
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label className="whitespace-nowrap w-30">Code</Label>
                                <Input
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
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row items-center gap-4 w-full">
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
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label htmlFor="active" className="whitespace-nowrap w-30">Phát hành</Label>
                                <Checkbox id="active" checked={newVoucher.active} onCheckedChange={handleActiveChange}/>
                            </div>

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
                                    onChange={handleChange}
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
                    <DialogFooter className="mt-2">  
                        <div className="w-full">
                            <Button  variant="destructiveOutline" onClick={handleDelete}>Xoá </Button>
                        </div>
                        <Button onClick={handleSM}>Cập nhật</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
