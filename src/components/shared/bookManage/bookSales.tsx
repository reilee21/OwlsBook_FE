import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import NumberInput from "../NumberInput";
import { useEffect, useState } from "react";



interface BManageSales{
    quantity:number;
    salePrice:number;
}
interface Props{
    info:BManageSales;
    update: (quan:number,price:number) => void;
}

export default function BookManageSales ({info,update}:Props){
    const [val,setVal] = useState<BManageSales>({quantity:0,salePrice:0})
    useEffect(() => {
        if (info) {
            setVal((prev) => ({
                ...prev,
                quantity: info.quantity,
                salePrice: info.salePrice,
            }));
        }
    }, [info]);
    const handleQuantityChange = (newQuantity: number) => {
        setVal((prev) => ({ ...prev, quantity: newQuantity }));
    };

    const handleSalePriceChange = (newSalePrice: number) => {
        setVal((prev) => ({ ...prev, salePrice: newSalePrice }));
    };
    useEffect(()=>{
        if(val.quantity !== info?.quantity || val.salePrice !== info?.salePrice){
            update(val.quantity,val.salePrice)
        }
    },[val])


    return(
        <Card>
            <CardHeader>
            </CardHeader>
            <CardContent>
                <div className="">
                    <div className="">
                        <Label>Số lượng</Label>
                        <NumberInput  change={handleQuantityChange} name="quantity" initvalue={val?.quantity} isRequired={true} placeholder="Số lượng sản phẩm" maxNumber={Number.MAX_VALUE}/>
                    </div>
                    <div className="">
                        <Label>Giá </Label>
                        <NumberInput change={handleSalePriceChange} name="salePrice" initvalue={val?.salePrice} isRequired={true} placeholder="Giá" maxNumber={Number.MAX_VALUE}/>
                    </div>
                </div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>

    )
}