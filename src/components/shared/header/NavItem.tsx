import React from 'react';
import { IconType } from 'react-icons';
import { usePathname, useRouter } from "next/navigation";

interface NavItemProps {
  path: string;
  label: string;
  icon: IconType;
  class?:string;
}

const NavItem: React.FC<NavItemProps> = ({ path, label, icon: Icon,class:additionalClass }) => {
  const router = useRouter();
  const curPath = usePathname();  
  return (
    <div
      onClick={() => router.push(path)}
      className={`rounded-lg flex flex-row gap-2 items-center px-2 transition duration-150 ease-out cursor-pointer text-xs select-none  ${
        curPath.includes(path) ? "bg-darkBlue text-white font-semibold" : "text-gray-600 font-medium hover:bg-blue-100"}
        `}
    >
      <Icon size={18}  />
      <h5 className={` uppercase py-3 block ${additionalClass ? additionalClass :""}
        `}
      >
        {label}
      </h5>
    </div>
  );
};

export default NavItem;
