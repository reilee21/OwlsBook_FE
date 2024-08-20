import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from "../ui/card";
import { Label } from "../ui/label";
import OwlsLabel from "../shared/LabelCustom";





export default function OrderCusInfo ({order}){
    const deliveryAddress = order?.deliveryAddress || '';
    const name = order?.name || '';
    const phonenumber = order?.phonenumber || '';
  
   
    return(
        <Card  className="h-full">
            <CardHeader>
                <CardDescription>
                    Thông tin liên hệ
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1">
                    <OwlsLabel label={name} value={''} className=''/>
                    <OwlsLabel label="" value={deliveryAddress} className="justfy-start"/>
                    <OwlsLabel label="" value={phonenumber} className="justfy-start"/>
                </div>

            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}