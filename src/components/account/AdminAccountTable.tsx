
import { FaCircle, FaEllipsisV } from 'react-icons/fa';
import GoogleIcon from '../icons/GoogleIcon';
import FaceBookIcon from './../icons/FacebookIcon';
import ProfileModal from '../shared/account/ProfileModal';
import { useEffect, useState } from 'react';
import { Loading } from '../shared/Loading';
export const roles = {
    "admin": "Admin",
    "customer": "Khách hàng",
    "product-admin": "Quản lí sản phẩm",
    "order-admin": "Quản lí đơn hàng",
};
export default function AdminAccountTable ({account,infos,update}){
    const [modal,setModal] = useState(false);
    const [usn,setUsn] = useState('');
    useEffect(()=>{
        if(usn && usn.length>0){
            setModal(true)
        }
    },[usn])
    useEffect(()=>{
        if(!modal){
            setUsn('')
        }
    },[modal])
    const handleShowModal = (val)=>{
        setModal(val)
        update()
    }
    const handleClick = (val)=>{
        setUsn(val)
        update()

    }
    return(
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
           
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-950 text-white">
                                User
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-950 text-white">
                                Họ tên
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-950 text-white">
                                Chức vụ
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-950 text-white">
                                Email
                            </th>
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-950 text-white">
                                Trạng thái 
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {account && account.map((item,index)=>{
                            const userInfo = infos.find(info => info.email.trim() === item.emailAddresses[0].emailAddress);
                            const role = userInfo ? userInfo.role : 'N/A';
                            return(
                                <tr className='hover:bg-gray-50 cursor-pointer' key={index} onClick={()=>handleClick(item.username)}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                  <img className='h-12 w-12 bg-white rounded-full border ' src={item.imageUrl}/>
                                  <span className='mx-2 '>{item.username} </span>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                  <h5 className='mx-2'>{item.firstName} {item.lastName} </h5>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                  <h5 className='mx-2'> {roles[role]} </h5>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className='flex flex-row items-center gap-2'>
                                      {item.emailAddresses[0].emailAddress}
                                      {item.emailAddresses[0].linkedTo.some(link => link.type === 'oauth_google') && <GoogleIcon />}
                                      {item.emailAddresses[0].linkedTo.some(link => link.type === 'oauth_facebook') && <FaceBookIcon />}
  
                                  </div>                                
                                
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {item.banned === false?(
                                      <div className='flex flex-row gap-2 items-center'>
                                          <FaCircle color='green'/>
                                          <span className=''> Đang hoạt động</span>
                                      </div>
                                  ):(
                                      <div className='flex flex-row gap-2 items-center'>
  
                                          <FaCircle color='red'/>
                                          <span className=''> Không hoạt động</span>
                                      </div>
                                  )}
                                </td>
                               
                            </tr>
                            )
                           
                                  })}
                      
                    </tbody>
                </table>
            </div>
            <ProfileModal show={modal} username={usn} handleShow={handleShowModal}/>

        </div>

    )
}