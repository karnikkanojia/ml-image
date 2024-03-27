import React from 'react';

interface ImageUploadFormProps {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onImageChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col py-2 gap-y-4 space-y-4 mt-4">
      <input type="file" name="myImage" onChange={onImageChange} />
      <button
        type="submit"
        className="px-0 py-4 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out bg-green dark:bg-green"
      >
        Upload
      </button>
    </form>
  );
};

export default ImageUploadForm;
