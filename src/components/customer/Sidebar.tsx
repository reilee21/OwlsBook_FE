
import { useRouter } from "next/navigation";


const ProfileSideBar = ({subselect,selectedPage,imageUrl,username})=>{ 
    const router = useRouter();
    
    return(
    <div className="p-4 mx-4 bg-white rounded-lg">
        <div className="flex flex-row items-center text-lg gap-4 ">
            <img className="rounded-full"
                src={imageUrl} height={70} width={70} alt="ava"/>
            <h1>{username}</h1>    
        </div>
        <div className="flex flex-col mt-4 text-sm">
            <div className={` flex hover:font-semibold
                            p-4 cursor-pointer rounded-lg  transition	 
                            ease-in-out ${selectedPage === 'profile' ? 'bg-[#304865] text-white font-semibold' : ''}`}        

                onClick={()=>router.push('/customer')}
            >

                <h1>Tài khoản</h1>
            </div>
            {selectedPage ==='profile'&&(
                <div className="p-2 ml-4">
                    <div 
                    className={`hover:font-semibold p-2  cursor-pointer ${subselect === 'info'?'font-bold text-sky-950':''}`}>
                        <h1>Thông tin cá nhân</h1>
                    </div>
                    {/* <div 
                    className={`hover:font-semibold p-2  cursor-pointer`}>
                        <h1>Cập nhật mật khẩu</h1>
                    </div> */}
                </div>
            )}
            <div className={ `flex p-4 cursor-pointer rounded-lg border-[#21687F]  transition hover:font-semibold
                    ease-in-out ${selectedPage === 'orders' ? 'bg-[#304865] text-white font-semibold' : ''}`}     
                onClick={()=>router.push('/customer/orders')}
            >
        
                <h1>Đơn mua</h1>
            </div>
            
        </div>

    </div>)
}

export default ProfileSideBar