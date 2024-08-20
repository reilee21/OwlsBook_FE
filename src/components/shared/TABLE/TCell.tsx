import React, { ReactNode } from 'react';

interface TCellProps {
  className?: string;
  children: ReactNode;
}

const TCell: React.FC<TCellProps> = ({ className, children }) => {
  const defaultClass = 'border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4';
  return (
    <td className={className ? className : defaultClass}>
      {children}
    </td>
  );
};

export default TCell;
