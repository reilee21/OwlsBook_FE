import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import NumberInput from "../shared/NumberInput";
import Address from "../shared/checkout/Address";
import { useCreateDeliveryMutation } from "@/services/delivery/deliveryApi";




interface DeliveryCreate {
    cityId: string;
    districtId?: string;
    shippingFee: number;
    estimatedDeliveryTime: number;

}
const initialDeliveryState: DeliveryCreate = {
    cityId: '',
    districtId: '',
    shippingFee: 0,
    estimatedDeliveryTime: 0,
};


export default function AddDelivery({ updated }) {
    const [newDelivery, setNewDelivery] = useState<DeliveryCreate>(initialDeliveryState);
    const [isOpen, setIsOpen] = useState(false);
    const [createDe] = useCreateDeliveryMutation();
    const { toast } = useToast();


    const handleChangeSfee=(val:number)=>{
        setNewDelivery((prevDelivery) => ({
            ...prevDelivery,
            shippingFee: val
        }));

    }
    const handleChangeDeliveryTime=(val:number)=>{
        setNewDelivery((prevDelivery) => ({
            ...prevDelivery,
            estimatedDeliveryTime: val
        }));

    }
    const handleChangeCity=(val:string)=>{
        setNewDelivery((prevDelivery) => ({
            ...prevDelivery,
            cityId: val
        }));

    }
    const handleChangeDistrict=(val:string)=>{
        setNewDelivery((prevDelivery) => ({
            ...prevDelivery,
            districtId: val
        }));

    }

    const handleSM = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const rs = await createDe(newDelivery);
            console.log(rs)
            if(rs.data && rs.data.code==='11'){
                toast({
                    variant: "destructive",
                    title: "Tạo thất bại",
                    description:rs.data.message
                  })
            }else{
                toast({
                    variant: "success",
                    title: "Thông tin vận chuyển",
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
       
    };

    const handleCloseDialog = (e: boolean) => {
        setNewDelivery(initialDeliveryState); 
        setIsOpen(e);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(e) => handleCloseDialog(e)}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>Thêm</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Vận chuyển</DialogTitle>
                </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label className="whitespace-nowrap w-30">Phí vận chuyển</Label>
                                <NumberInput change={handleChangeSfee}
                                name="shippingFee" initvalue={newDelivery.shippingFee} isRequired={true} placeholder="Phí vận chuyển"  maxNumber={Number.MAX_VALUE} />
                            </div>
                            <div className="flex flex-row items-center gap-4 w-full">
                                <Label className="whitespace-nowrap w-30">Thời gian giao(ngày)</Label>
                                <NumberInput change={handleChangeDeliveryTime}
                                name="estimatedDeliveryTime" initvalue={newDelivery.estimatedDeliveryTime} isRequired={true} placeholder="Thời gian giao hàng dự tính"  maxNumber={100} />
                            </div>
                        </div>     
                        <div className="">
                            <Address setCT={handleChangeCity} setDT={handleChangeDistrict} cityWidth={"col-span-2"} districtWidth={"col-span-2"}
                            ct={newDelivery.cityId} dt={newDelivery.districtId} wardWidth={"hidden"} aWidth={"hidden"}/>
                        </div>                   
                    </div>
                    <DialogFooter>
                        <Button className="mt-2" onClick={handleSM}>Thêm</Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
