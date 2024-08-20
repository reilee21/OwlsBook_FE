import React, { useEffect, useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { CiCircleRemove } from "react-icons/ci";
import { useDropzone } from 'react-dropzone';
interface BImages {
  imageName: string;
  imageId: number;
  imageUrl: string;
}

interface Props {
  oldImage: BImages[] | null;
  update: (files:File[]) =>void
}

const BookManageImages: React.FC<Props> = ({ oldImage,update }) => {
  const [images, setImages] = useState<BImages[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);



  const onDrop = (acceptedFiles: File[]) => {
    const newImageObjects = acceptedFiles.map((file) => ({
      imageId: Date.now() + Math.random(),
      imageName: file.name,
      imageUrl: URL.createObjectURL(file),

      file,
    }));

    setImages([...images, ...newImageObjects]);
    setNewImages([...newImages, ...acceptedFiles]);

  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (oldImage) {
      const fetchFilesFromUrls = async () => {
        const files = await Promise.all(
          oldImage.map(async (image) => {
            const response = await fetch(`https://localhost:7000/File?image=${image.imageName}`);
            const blob = await response.blob();
            const file = new File([blob], image.imageName, { type: blob.type });

            return {
              ...image,
              file,
              imageUrl: URL.createObjectURL(blob)
            };
          })
        );

        setImages(files);
        setNewImages(files.map((fileObj) => fileObj.file));

      };

      fetchFilesFromUrls();
    }
  }, [oldImage]);

  useEffect(()=>{
    update(newImages)
  },[newImages])

  const handleRemoveImage = (imageName: string) => {
    const filteredImages = images.filter((img) => img.imageName !== imageName);
    const filteredNewImages = newImages.filter((img) => img.name !== imageName);


    setImages(filteredImages);
    setNewImages(filteredNewImages);

  };

  const handleReorder = (newImagesOrder: BImages[]) => {
    const orderedFiles = newImagesOrder.map((image) => {
      const foundFile = newImages.find((file) => file.name === image.imageName);

      if (foundFile) {
        return foundFile;
      } else {
        return null;
      }
    }).filter((file): file is File => file !== null);

    setImages(newImagesOrder);

    setNewImages(orderedFiles);

  };

  return (
    <div className="z-20">
        <h5 className='p-2 text-md font-semibold'>
            Ảnh - {images?.length}
        </h5>
      <Reorder.Group axis="y" values={images} onReorder={handleReorder}>
        {images.map((image,index) => (
          <Reorder.Item
            key={image.imageId}
            value={image}
            className="flex items-center mb-2 border p-2 rounded z-20 bg-slate-50"
          >
            <motion.div className="flex items-center w-full">
                <img
                        src={image.imageUrl }
                        alt={`Image ${image.imageId}`}
                        className="w-16 h-16 object-cover mr-2 "
                    
                    />
              <div 
              className='w-full flex flex-row items-center justify-between px-4'>
                <span>
                    {index===0 ? 'Ảnh bìa' : 'Ảnh '+index}
                </span>
                <div 
                 onClick={() => handleRemoveImage(image.imageName)} className="hover:text-rose-600 cursor-pointer transition ease-in-out  duration-350 hover:scale-110 p-4">
                    <CiCircleRemove size={24}/>
                </div>
              </div>
             


            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div
        {...getRootProps()}
        className={`p-4 w-full bg-slate-100 text-center border-2 border-dotted border-black ${
          isDragActive ? 'bg-gray-200' : ''
        }`}
      >
        <input {...getInputProps()} accept="image/*" multiple />
        <p>Chọn hoặc kéo vào để thêm ảnh</p>
      </div>
    </div>
  );
};

export default BookManageImages;
