import React, { ReactNode, MouseEventHandler } from 'react';

interface TRowProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
  children: ReactNode;
}

const TRow: React.FC<TRowProps> = ({ className, onClick, children }) => {
  const defaultClass = 'hover:bg-gray-50 cursor-pointer';
  return (
    <tr className={className ? className : defaultClass} onClick={onClick}>
      {children}
    </tr>
  );
};

export default TRow;
