import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";
import { DateRangePicker } from "@/components/shared/DateRagePicker";
import NumberInput from "../shared/NumberInput";
import { useDeleteDiscountMutation, useEditDiscountMutation } from "@/services/discount/discountApi";
import { format } from "date-fns";

interface DiscountEdit {
    discountId: number;
    discountName: string;
    discountPercent: number;
    startDate: Date;
    endDate: Date;
    active: boolean;
}

interface EditDiscountProps {
    discount: DiscountEdit;
    isOpen:boolean;
    onClose: () => void;
    update: () => void;
}

export default function EditDiscount({ discount,isOpen, onClose, update }: EditDiscountProps) {
    const [newDiscount, setNewDiscount] = useState<DiscountEdit>(null);
    const { toast } = useToast();
    const [updateDC] = useEditDiscountMutation();
    const [deleteDC] = useDeleteDiscountMutation();
    useEffect(()=>{
        if(discount) {
            setNewDiscount(discount)
            console.log(discount)
        }
    },[discount])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewDiscount((prevDiscount) => ({
            ...prevDiscount,
            [name]: value
        }));
    };

    const handleActiveChange = (checked: boolean) => {
        setNewDiscount((prevDiscount) => ({
            ...prevDiscount,
            active: checked
        }));
    };

    const handlePercentChange = (val: number) => {
        setNewDiscount((prevDiscount) => ({
            ...prevDiscount,
            discountPercent: val
        }));
    };

    const handleDateChange = (from: Date, to: Date) => {
        setNewDiscount((prevDiscount) => ({
            ...prevDiscount,
            startDate: from,
            endDate: to
        }));
    };

    const handleSM = async (e: React.FormEvent) => {
        e.preventDefault();
        var sd = format(newDiscount.startDate,'yyyy-MM-dd');
        var ed = format(newDiscount.endDate,'yyyy-MM-dd');
        const sm = {
            discountId: newDiscount.discountId,
            discountName: newDiscount.discountName,
            discountPercent: newDiscount.discountPercent,
            startDate: sd,
            endDate: ed,
            active: newDiscount.active
        }
       
      
        try{
            const rs = await updateDC(sm);
            if(rs.data){
                update(); 
                toast({
                    variant: "success",
                    title: "Giảm giá",
                    description: "Cập nhật thành công",

                  })
                console.log(rs.data)

            }
        }catch(e){
            console.error(e)
            toast({
                variant: "destructive",
                title: "Lỗi",
                description: "Lỗi không xác định",

              })

        }

         
    };
    const handleDelete = async (e:React.FormEvent) => {
        e.preventDefault();
        
        try{
            const rs = await deleteDC({id:newDiscount.discountId});
            if(rs.data){
                update();
                toast({
                        variant: "success",
                        title: "Xoá thành công",
                      })
                onClose();

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

    if(!isOpen || newDiscount ===null) return <></>

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật chương trình khuyến mãi</DialogTitle>
                </DialogHeader>
                <form >
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
                                <NumberInput
                                    change={handlePercentChange}
                                    initvalue={newDiscount.discountPercent}
                                    name="discountPercent"
                                    isRequired={true}
                                    placeholder={""}
                                    maxNumber={100}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-row gap-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label className="whitespace-nowrap w-30">Thời gian</Label>
                                <DateRangePicker
                                    onDateChange={handleDateChange}
                                    initFrom={newDiscount.startDate}
                                    initTo={newDiscount.endDate}
                                />
                            </div>
                            <div className="flex flex-row items-center gap-4 w-full">
                                    <Checkbox id="active" checked={newDiscount.active} onCheckedChange={handleActiveChange}/>
                                    <Label htmlFor="active" className="whitespace-nowrap w-30 cursor-pointer">Phát hành</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                    <div className="w-full mt-2">
                            <Button  variant="destructiveOutline" onClick={handleDelete}>Xoá </Button>
                        </div>
                        <Button onClick={handleSM}>
                            Cập nhật
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
