'use client'
import ChangePass from "@/components/customer/ChangePass";
import CustomerOrder from "@/components/customer/CustomerOrder";
import OrderDetails from "@/components/customer/OrderDetails";
import Profile from "@/components/customer/Profile";
import CustomerProfileLayout from "@/components/shared/layouts/MiniCus";
import { ClerkLoading, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"
import {useGetProfileQuery, useUpdateProfileMutation} from '@/services/profile/profileApi'
import { SuccessModal } from "@/components/shared/SuccessModal";




const ProfilePage = ()=>{
    const [selectedPage,setSelectedPage] = useState('profile');
    const [subselect,setSubselect] = useState('info') 
    const [isSC,setisSC] = useState(false); 


    const {user} = useUser();
 
    const {data} = useGetProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const [img,setImg] = useState('');

    const [fname,setFname] = useState(user?.firstName);
    const [lname,setLname] = useState(user?.lastName);

    const [address, setAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    useEffect(()=>{
        setFname(user?.firstName)
        setLname(user?.lastName)
        setImg(user?.imageUrl)
    },[user])


    useEffect(()=>{
        if(data) {
            setPhonenumber (data.phoneNumber || '')
            setSelectedCity(data.city || '')
            setSelectedDistrict(data.district || '')
            setSelectedWard(data.ward || '')
            setAddress(data.address || '')
        }
        
    },[data])
    const handleUpdateClerkAccount = async () =>{
        if (user) {
            if(fname && lname ){              
                await user.update({ firstName: fname, lastName:lname })
                .then(() => user.reload())
                .catch((e) => {
                    console.error('Error updating user details:', e.message, e.response?.data);
                });                
            }      

    
            if (img && img != user.imageUrl) {

             await user.setProfileImage({ file: img })
                    .then(() => user.reload())
                    .catch((e) => {
                        console.error('Error setting profile image:', e.message, e.response?.data);
                    });
            }
        }
    }
    const handleUpdateDBAccount = async () =>{
        const newprofile = {
            firstName: fname,
            lastName: lname,
            city: selectedCity,
            district: selectedDistrict,
            ward: selectedWard,
            address: address,
            phoneNumber: phonenumber,
        }
        try{
            await updateProfile(newprofile);
        }catch(e){
            console.error(e);
        }


    }

    const handleUpdate = () =>{
        handleUpdateClerkAccount();
        handleUpdateDBAccount();
        setisSC(true);
        setTimeout(()=>setisSC(false),2000)
        
    }

    if(!user) return(<><ClerkLoading/></>)
    return(
        <CustomerProfileLayout 
            subselect={'info'} 
            selectedPage={'profile'} 
            user={user}
        >
             <Profile img={img} setImg={setImg}
                fname={fname} setFname={setFname}
                lname={lname} setLname={setLname}
                address={address} setAddress={setAddress}
                selectedCity={selectedCity} setSelectedCity={setSelectedCity}
                selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict}
                selectedWard={selectedWard} setSelectedWard={setSelectedWard}
                phonenumber={phonenumber} setPhonenumber={setPhonenumber}
                 update={handleUpdate} />
  
            {isSC &&(
                <SuccessModal message={'Cập nhật thông tin thành công'} onClose={()=>setisSC(false)} />
            )}
        </CustomerProfileLayout>      
    )
}

export default ProfilePage