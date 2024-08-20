import React from 'react';
import { FaCircle } from "react-icons/fa";

interface StatusBadgeProps {
  status: string;
}

const statusColors = {
  Pending: 'bg-yellow-200 text-yellow-800',
  Shipped: 'bg-green-200 text-green-800',
  Delivered: 'bg-green-500 text-white',
  Cancelled: 'bg-pink-200 text-pink-800',
  CustomerCancelled: 'bg-red-200 text-red-800',
};

const statusText = {
  Pending: "Đã đặt hàng",
  Shipped: "Đang giao hàng",
  Delivered: "Đã nhận hàng",
  Cancelled: "Đã hủy",
  CustomerCancelled: "Đã hủy đặt hàng",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClass = statusColors[status as keyof typeof statusColors] || 'bg-gray-200 text-gray-800';
  const statusLabel = statusText[status as keyof typeof statusText] || 'Unknown Status';

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center ${statusClass}`}>
      {statusLabel}
    </span>
  );
};

export default StatusBadge;
