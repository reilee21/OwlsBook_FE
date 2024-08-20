import { useEffect, useState } from "react";

const BookImages = ({imgs}) => {

    const [selectImg, setSelectImage] = useState(imgs[0]);

    const handleImageClick = (url) => {
        setSelectImage(url);
    };

    return (
        <div className="lg:col-span-3 lg:row-end-1 border-b-2 p-4 rounded-lg shadow bg-white">
            <div className="lg:flex lg:items-start items-center justify-center">
                <div className="lg:order-2 lg:ml-5 ">
                    <div className="max-w-[500px] max-h-[500px] min-h-[500px] overflow-hidden rounded-lg border-[1px] mx-auto">
                        <img className="object-contain max-h-[500px] min-h-[500px]" src={'https://localhost:7000/File?image='+selectImg} alt="" />
                    </div>
                </div>

                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                    <div className="flex flex-row items-start lg:flex-col justify-center">
                        {imgs.map((image, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 ${
                                    image === selectImg ? 'border-gray-900' : 'border-transparent'
                                } text-center`}
                                onClick={() => handleImageClick(image)}
                            >
                                <img className="h-full w-full object-cover" src={'https://localhost:7000/File?image='+image} alt="" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookImages;
