import { useEffect, useState } from "react";

export const ModalLayout = ({ icon, mess, onClose }) => {
    return (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden flex">
            <div aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer" onClick={onClose}></div>

            <div className="relative w-full cursor-pointer pointer-events-none transition lg:mt-14 my-auto p-4">
                <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
                    <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="space-y-2 p-2">
                        <div className="p-4 space-y-2 text-center dark:text-white">
                            <h2 className="text-xl font-bold tracking-tight" id="page-action.heading">
                            <div className="w-12 h-12 rounded-full  p-2 flex items-center justify-center mx-auto mb-3.5">

                                {icon}
                            </div>
                            </h2>

                            <div className="text-gray-500">
                                {mess}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
