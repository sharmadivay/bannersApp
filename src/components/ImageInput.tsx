import React, { useRef, useState } from "react";

interface ImageInputProps {
  currentImage: string;
  onImageChange: (file: File) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  currentImage,
  onImageChange,
}) => {
  const [preview, setPreview] = useState<string>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onImageChange(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <img
        src={preview}
        alt="Current"
        className="w-full h-full rounded-lg cursor-pointer object-cover"
        onClick={handleImageClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

export default ImageInput;
