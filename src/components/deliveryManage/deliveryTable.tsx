import React from 'react';
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';

interface Delivery {
    id: number;
    city?: string;
    district?: string;
    shippingFee?: number;
    estimatedDeliveryTime?: number;
}

interface DeliveryTableProps {
    deliveries: Delivery[];
    setEditDelivery: (item: number) => void;
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ deliveries, setEditDelivery }) => {
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            <Thead>Thành phố</Thead>
                            <Thead>Quận</Thead>
                            <Thead>Phí vận chuyển</Thead>
                            <Thead>Thời gian vận chuyển (ngày)</Thead>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries && deliveries.map((item, index) => (
                            <TRow key={index} onClick={() => setEditDelivery(item.id)}>
                             
                                <TCell>
                                    {item.city ? item.city : ''}
                                </TCell>
                                <TCell>
                                    {item.district ? item.district : '-'}
                                </TCell>
                                <TCell>
                                    {item.shippingFee ? item.shippingFee.toLocaleString() +" đ" : '0'}
                                </TCell>
                                <TCell>
                                    {item.estimatedDeliveryTime ? item.estimatedDeliveryTime : '0'}
                                </TCell>
                            </TRow>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveryTable;
