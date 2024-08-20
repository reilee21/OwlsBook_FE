import React from 'react';
import PropTypes from 'prop-types';
import Shipping from '@/components/icons/Shipping';
import Delivered from '@/components/icons/Delivered';


const StepStatus = ({odStatus}) => {
    const orderStatus = [
        { label: 'Đã đặt hàng'},
        { label: 'Đang giao hàng'},
        { label: 'Đã nhận hàng'}
    ];
    const activeStep = orderStatus.findIndex((item)=>item.label===odStatus) +1;

    const steps = [
        { label: 'Đã đặt hàng', icon: 'check' },
        { label: 'Đang giao hàng', icon: <Shipping color={activeStep >= 2 ? '#21687F' : '#98A2B4'} /> },
        { label: 'Đã nhận hàng', icon: <Delivered color={activeStep === 3 ? '#21687F' : '#98A2B4'} /> }
    ];
  


    return (
        <div className="mx-auto w-full text-xs sm:ml-auto sm:text-base">
            <div className="relative">
                <ul className="relative flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <div
                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                                        activeStep > index ? 'text-[#21687F]' : 'text-[#12B0B4]'
                                    }`}>
                                        {step.icon === 'check' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                                stroke={activeStep > index ? '#21687F' : '#12B0B4'} strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : 
                                        (
                                            step.icon
                                        )}
                                </div>
                                <span className={`font-medium ${activeStep > index ? 'text-[#21687F] font-semibold' : 'text-gray-500'}`}>
                                    {step.label}
                                </span>
                            </li>
                            {index < steps.length - 1 && (
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                className="hidden h-4 w-4 text-gray-900 sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};

StepStatus.propTypes = {
    activeStep: PropTypes.number.isRequired
};

export default StepStatus;
