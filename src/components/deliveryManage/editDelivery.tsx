import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import NumberInput from "../shared/NumberInput";
import { useDeleteDeliveryMutation, useEditDeliveryMutation, useGetDeliveryByIdQuery } from "@/services/delivery/deliveryApi";
import Address from "../shared/checkout/Address";


interface DeliveryEdit{
    id:number;
    cityId: string;
    districtId?: string;
    shippingFee: number;
    estimatedDeliveryTime: number;

}

interface EditDeliveryProps {
    delivery: number;
    isOpen:boolean;
    onClose: () => void;
    update: () => void;
}

export default function EditDelivery({ delivery,isOpen, onClose, update }: EditDeliveryProps) {
    const [newDelivery, setNewDelivery] = useState<DeliveryEdit>(null);
    const { toast } = useToast();
    
    const {data:dev} = useGetDeliveryByIdQuery({id:delivery})
    const [updateDev] = useEditDeliveryMutation();
    const [deleteDev] = useDeleteDeliveryMutation();

    useEffect(()=>{
        if(dev) {
            setNewDelivery(dev)
        }
    },[dev])

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
            const rs = await updateDev(newDelivery);
            console.log(rs)
            if(rs.data && rs.data.code==='11'){
                toast({
                    variant: "destructive",
                    title: "Cập nhật thất bại",
                    description:rs.data.message
                  })
            }else{
                toast({
                    variant: "success",
                    title: "Thông tin vận chuyển",
                    description:"Cập nhật thành công"
                  })
                  update()
            }
           
        }catch(e){
            toast({
                variant: "destructive",
                title: "Lỗi",
                description: "Đã có lỗi xảy ra",
              })
        }
         
    };
    const handleDelete = async (e:React.FormEvent) => {
        e.preventDefault();
     
    }
    const handleCLose = () =>{
        onClose();
        setNewDelivery(null);
    }

    if(!isOpen || newDelivery ===null) return <></>

    return (
        <Dialog open={isOpen} onOpenChange={handleCLose}>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin vận chuyển</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 ">
                        <div className="flex flex-row gap-2 p-2">
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
                        <div className="w-full mt-2">
                            <Button  variant="destructiveOutline" onClick={handleDelete}>Xoá </Button>
                        </div>
                        <Button onClick={handleSM}>
                            Cập nhật
                        </Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
