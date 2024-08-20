import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Address from "../shared/checkout/Address"
import Voucher from "../shared/checkout/Voucher"
import PaymentMethod from "../shared/checkout/PaymentMethod"
const CheckOutInfo = ({setCkInfo,ckInfo})=>{
   
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

  
    const handleCityChange = (val) =>{
        setCkInfo((pre)=>({...pre,city:val}))
    }
    const handleDistrictChange = (val)=>{
        setCkInfo((pre)=>({...pre,district:val}))

    }
    const handleWardChange = (val) =>{
        setCkInfo((pre)=>({...pre,ward:val}))

    }
    const handleAddressChange = (val)=>{
        setCkInfo((pre)=>({...pre,address:val}))

    }
    const handleChangePaymentMethod = (value) =>{
        if(value)
            setCkInfo((pre)=>({...pre,paymentMethod:1}));
        else
            setCkInfo((pre)=>({...pre,paymentMethod:0}))

    }
    const handleVoucherChange = (val) =>{
        setCkInfo((pre)=>({...pre,voucher:val}))

    }

    return(<>
                <div className="">
                    <div className="px-4 py-6 sm:py-10">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="lg:col-span-1 col-span-2">
                                <Label className="p-2">Họ tên</Label>
                                <Input value={ckInfo.name} onChange={(e)=>setCkInfo((pre)=>({...pre,name:e.target.value}))}  className="mt-2" type="text" placeholder="Họ và tên người nhận"/>
                            </div>
                            <div className="lg:col-span-1 col-span-2">
                                <Label className="p-2">Số điện thoại</Label>
                                <Input value={ckInfo.phoneNumber} onChange={(e)=>setCkInfo((pre)=>({...pre,phoneNumber:e.target.value}))} className="mt-2" type="text" onKeyDown={validateNumber} maxLength={10} placeholder="Số điện thoại"/>
                            </div>
                        </div>
                        <Address cityWidth={'col-span-4'} districtWidth={'lg:col-span-2 col-span-3'} wardWidth={'lg:col-span-2 col-span-3'} 
                        ct={ckInfo.city} dt={ckInfo.district} w={ckInfo.ward} a={ckInfo.address} setCT={handleCityChange} setDT={handleDistrictChange} setW={handleWardChange} setAD={handleAddressChange}
                        />
                        <Voucher setVC={handleVoucherChange}/>
                        <PaymentMethod setPM={handleChangePaymentMethod} />
                    </div>
                </div>
    </>)
}

export default CheckOutInfo