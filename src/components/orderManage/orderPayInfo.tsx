import { Card, CardContent, CardFooter, CardHeader, CardDescription } from "../ui/card";
import OwlsLabel from "../shared/LabelCustom";
import { format } from 'date-fns';


 

export default function OrderPayInfo ({order}){
    const payment = order?.payment;
    const paymentMethod = order?.paymentMethod || '';
    const method = paymentMethod==='COD'? 'Khi nhận hàng' : 'Ứng dụng ngân hàng'
    const paymentStatus = payment?.status ==='PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'
    const transaction = payment?.transactions.length != 0 ?  payment?.transactions : null;
    return(
        <Card className="h-full">
            <CardHeader>
                <CardDescription>
                    Thanh toán
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1">
                    <OwlsLabel label={'Phương thức'} value={method} className=''/>
                    {payment&&(
                        <OwlsLabel label={'Trạng thái'} value={paymentStatus} className=''/>    
                    )}
                    {transaction &&(
                        <>
                            <OwlsLabel label={'Người thanh toán'} value={transaction[0].counterAccountName} className=''/>    
                            <OwlsLabel label={'Lúc'} value={format(new Date(transaction[0].transactionDateTime), 'HH:mm:ss dd-MM-yyyy')} className=''/>    
                        </>
                    )}
                </div>

            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}