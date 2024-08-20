import { FaCircle, FaEllipsisV } from 'react-icons/fa';
import GoogleIcon from '../icons/GoogleIcon';
import FaceBookIcon from './../icons/FacebookIcon';
import ProfileModal from '../shared/account/ProfileModal';
import { useEffect, useState } from 'react';
import Thead from '../shared/TABLE/Thead'; 
import TRow from '../shared/TABLE/TRow'; 
import TCell from '../shared/TABLE/TCell'; 

export default function AccountTable({ account }) {
  const [modal, setModal] = useState(false);
  const [usn, setUsn] = useState('');

  useEffect(() => {
    if (usn && usn.length > 0) {
      setModal(true);
    }
  }, [usn]);

  useEffect(() => {
    if (!modal) {
      setUsn('');
    }
  }, [modal]);

  const handleShowModal = (val) => {
    setModal(val);
  };

  const handleClick = (val) => {
    setUsn(val);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <Thead>User</Thead>
              <Thead>Họ tên</Thead>
              <Thead>Email</Thead>
              <Thead>Trạng thái</Thead>
            </tr>
          </thead>
          <tbody>
            {account && account.map((item, index) => (
              <TRow key={index} onClick={() => handleClick(item.username)}>
                <TCell>
                    <div className="flex flex-row gap-2 items-center ">
                        <img className='h-12 w-12 bg-white rounded-full border' src={item.imageUrl} />
                        <span className='mx-2 font-semibold'>{item.username}</span>
                    </div>
                </TCell>
                <TCell>
                  <h5 className='mx-2'>{item.firstName} {item.lastName}</h5>
                </TCell>
                <TCell>
                  <div className='flex flex-row items-center gap-2'>
                    {item.emailAddresses[0].emailAddress}
                    {item.emailAddresses[0].linkedTo.some(link => link.type === 'oauth_google') && <GoogleIcon />}
                    {item.emailAddresses[0].linkedTo.some(link => link.type === 'oauth_facebook') && <FaceBookIcon />}
                  </div>
                </TCell>
                <TCell>
                  {item.banned === false ? (
                    <div className='flex flex-row gap-2 items-center'>
                      <FaCircle color='green' />
                      <span className=''> Đang hoạt động</span>
                    </div>
                  ) : (
                    <div className='flex flex-row gap-2 items-center'>
                      <FaCircle color='red' />
                      <span className=''> Không hoạt động</span>
                    </div>
                  )}
                </TCell>
              </TRow>
            ))}
          </tbody>
        </table>
      </div>
      <ProfileModal show={modal} username={usn} handleShow={handleShowModal} />
    </div>
  );
}
