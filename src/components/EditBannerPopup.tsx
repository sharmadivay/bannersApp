import React, { useRef, useState } from "react";
import ImageInput from "./ImageInput";

interface EditBannerPopupProps {
  banner: {
    _id: string;
    title: string;
    description: string;
    cta: string;
    image: string;
    background: string;
  };
  onClose: () => void;
  onSave: (banner: any) => void;
}

const EditBannerPopup: React.FC<EditBannerPopupProps> = ({
  banner,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(banner.title);
  const [description, setDescription] = useState(banner.description);
  const [image, setImage] = useState(banner.image);
  const [bgImage, setBgImage] = useState(banner.background);
  const [preview, setPreview] = useState<string>(banner.image);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBgImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBgImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      handleImageChange(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const updatedBanner = {
      ...banner,
      title,
      description,
      image,
      background: bgImage,
    };

    onSave(updatedBanner); // Call the onSave function passed via props

    onClose(); // Close the popup after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 h-screen w-100">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button className="absolute top-2 right-2 text-black" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Banner</h2>
        <div className="flex items-center space-x-2 mb-4">
          <ImageInput
            currentImage={bgImage}
            onImageChange={handleBgImageChange}
          />
        </div>

        <div className="flex items-center space-x-2 mb-4 h-20">
          <img
            src={image}
            alt={banner.title}
            className="w-16 h-16 rounded-full"
          />
          <input
            type="file"
            className="hidden"
            id="upload"
            onClick={handleImageClick}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <label
            htmlFor="upload"
            className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full cursor-pointer"
          >
            <span className="text-gray-600 ">+</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleSave}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EditBannerPopup;
