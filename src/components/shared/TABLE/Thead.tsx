import React, { ReactNode } from 'react';

interface TheadProps {
  className?: string;
  children: ReactNode;
}

const Thead: React.FC<TheadProps> = ({ className, children }) => {
  const defaultClass = "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-950 text-white";
  return (
    <th className={className ? className : defaultClass}>
      {children}
    </th>
  );
};

export default Thead;
