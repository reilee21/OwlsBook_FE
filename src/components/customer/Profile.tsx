import { useEffect, useState } from "react"
import Address from "../shared/checkout/Address";
import { Input } from "../ui/input";

const Profile = ({update, fname,setFname,lname,setLname,img,setImg,address,setAddress,selectedCity,setSelectedCity,selectedDistrict,setSelectedDistrict,selectedWard,setSelectedWard,phonenumber,setPhonenumber})=>{ 
    
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};

        if (!fname||!lname) errors.name = "Họ tên không được để trống";
        if (!phonenumber) {
            errors.phonenumber = "Hãy nhập số điện thoại của bạn";
        } else if (!/^\d{10}$/.test(phonenumber)) {
            errors.phonenumber = "Số điện thoại không hợp lệ";
        }
        if (!address||!selectedCity||!selectedDistrict||!selectedWard)
             errors.address = "Hãy nhập địa chỉ của bạn";
 

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = ()=>{
        if (validateForm()) {
            update()
       }

    }

    




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

    const handleImageChange = (e:any) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImg(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

  
    return(
        <div className="flex flex-col items-center justify-center shadow-xl p-2 rounded-xl text-sm bg-white" >
            <div className="grid grid-cols-4 w-full min-h-[400px] ">
                <div className="col-span-4 lg:col-span-3 p-4 ">
                    <div className="grid grid-cols-5 justify-center justify-items-center items-center p-4 gap-2">
                        <h1 className="text-md font-semibold w-full">Họ tên</h1>
                        <Input className="md:col-span-2 col-span-1" value={lname? lname:''} type="text" onChange={(e)=>setLname(e.target.value)} />

                        <Input className="md:col-span-2 col-span-1" value={fname? fname:''}  type="text" onChange={(e)=>setFname(e.target.value)} />
                        {errors.name && <p className="text-red-500 mt-2 ml-2 col-span-4">{errors.name}</p>}


                    </div>
                    <div className="grid grid-cols-5 justify-center	justify-items-center items-center p-4">
                        <h1 className="text-md font-semibold w-full">Số điện thoại</h1>
                        <Input className="col-span-4" type="text" maxLength={10}
                                 onKeyDown={validateNumber} value={phonenumber ? phonenumber :''} placeholder="Nhập số điện thoại"
                                onChange={(e)=> setPhonenumber(e.target.value)} />
                        {errors.phonenumber && <p className="text-red-500 col-span-4 mt-2 ml-2">{errors.phonenumber}</p>}

                    </div>
                    <div className="grid grid-cols-5 p-4">
                        <div className="col-span-1">
                            <h1 className="text-md font-semibold">Địa chỉ</h1>
                        </div>
                        <div className="col-span-4">                            
                            <Address ct={selectedCity} dt={selectedDistrict} w={selectedWard} a={address}
                             setCT={setSelectedCity} setDT={setSelectedDistrict} setW={setSelectedWard} setAD={setAddress}
                             cityWidth="col-span-4" districtWidth = "lg:col-span-2 col-span-4" wardWidth="lg:col-span-2 col-span-4"/>   
                            {errors.address && <p className="text-red-500 mt-2 ml-2">{errors.address}</p>}
                        </div>

                    </div>
                </div>
                <div className="col-span-4 lg:col-span-1">
                    <div className="my-10 p4 min-h-[300px] flex flex-col items-center">
                        <div className="p-2" >
                            <label htmlFor="upload-img" className="cursor-pointer">
                                <img className="rounded-full" 
                                    src={img} height={100} width={100} alt="ava"/> 
                            </label>

                           
                        </div>
                        <div className="w-full p-4 flex flex-col justity-center">
                            <label htmlFor="upload-img"
                                className="p-2 mx-2 text-lg font-semibold rounded-lg border-2 w-full text-center cursor-pointer
                                            hover:border-black hover:font-bold transition ease-in-out delay-50 	text-sm	
                                            ">
                               Chọn ảnh
                            </label>
                            <input className="opacity-0 w-full" onChange={handleImageChange} 
                                type="file" id='upload-img' name= 'upload-img'/>
                        </div>
                    </div>
                </div>               
            </div>
            <div onClick={submit}
                className='font-bold text-sm cursor-pointer bg-[#1F2937]  hover:bg-[#3F4458
                ] hover:transition ease-in-out delay-50 text-lg font-bold px-8 py-2 text-[#F1FAFF] 
                border-2 text-center rounded-lg'>
                    Lưu
            </div>
        </div>

    )
}

export default Profile