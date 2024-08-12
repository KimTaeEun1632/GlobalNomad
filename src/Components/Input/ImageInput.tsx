import React, { forwardRef } from "react";

interface ImageInputProps {
  profileImageUrl?: string;
  name: string;
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ profileImageUrl, name }, ref) => {
    return (
      <div className="relative hidden  items-center justify-center space-x-3">
        <label className="relative flex h-[160px] w-[160px] cursor-pointer flex-nowrap items-center overflow-auto rounded-full border-4 border-gnGray200 bg-gnGray200">
          <input type="file" name={name} className="hidden" ref={ref} />
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="text-gnGray500">이미지 선택</span>
          )}
        </label>
      </div>
    );
  },
);

ImageInput.displayName = "ImageInput";

export default ImageInput;
