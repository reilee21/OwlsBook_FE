import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from "../ui/card";
import { Label } from "../ui/label";
import OwlsLabel from "../shared/LabelCustom";





export default function OrderInfo ({order}){
    const [subtotal,setSubtotal]= useState(0);
    const shippingFee = order?.shippingFee || 0;
    const total = order?.total || 0;
    const [vchReduce,setVchReduce] = useState(0);
  
    useEffect(() => {
      if (order?.voucher) {
        const vch = order.voucher;
        let sub;
        if (vch.Type === 'Amount') {
          sub = total - vch.value - shippingFee;
        } else {
          sub = total * (1 - vch.value) - shippingFee;
        }
        setSubtotal(sub);
      } else {
        setSubtotal(total - shippingFee);
      }
      setVchReduce(total-subtotal-shippingFee)
    }, [order, total, shippingFee,subtotal]);

    return(
        <Card  className="h-full">
            <CardHeader>
                <CardDescription>
                    Giá trị đơn hàng
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1">
                    <OwlsLabel label="Tạm tính" value={subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/>
                    <OwlsLabel label="Phí vận chuyển" value={shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/>
                    <OwlsLabel label="Khuyên mãi" value={vchReduce.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/>
                    <OwlsLabel label="Tổng cộng" value={total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/>
                </div>

            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}