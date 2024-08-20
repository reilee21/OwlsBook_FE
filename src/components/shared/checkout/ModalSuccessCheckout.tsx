import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { ModalLayout } from "../Modal";
import SuccessIcon from "@/components/icons/SuccessIcon";
import { useRouter } from "next/navigation";

const SuccessPlaceOrder = ({payment}) => {
    const [progress, setProgress] = useState(0);
    const [pm,setPm] = useState('');
    const [type,setType] = useState('');
    const router = useRouter();
    

    useEffect(()=>{
        if(payment.checkoutUrl) {
            setPm(payment)
            setType('2')
            console.log(payment)
            return;
        }
        setType('1')

    },[])
    useEffect(()=>{
        if(type==='1'){
            setTimeout(()=>router.push('/cart/checkout/success'),2000)
            return;
        }
    },[type])
    useEffect(()=>{
        if(progress>=100 && pm){
            window.location.href = pm.checkoutUrl;
        }
            
    },[progress,pm])

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 40);

        return () => {clearInterval(interval);};
    }, []);

    return (
        <>
        {type === '1' ? (
                <ModalLayout
                    icon={<SuccessIcon />}
                    mess={
                        <div className="w-full">
                            <h5 className="p-2 text-teal-800 font-medium">
                                Xử lí đơn hàng hoàn tất
                            </h5>
                        </div>
                    }
                />):(
                 <ModalLayout
                    icon={<SuccessIcon />}
                    mess={
                        <div className="w-full">
                            <h5 className="p-2 text-teal-800 font-medium">
                                Chuyển hướng đến trang thanh toán
                            </h5>
                            <Progress value={progress} />
                        </div>
                    }
                />
            )}
        </>
        
    );
};

export default SuccessPlaceOrder;
