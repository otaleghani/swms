"use client";

import { useActionState, useState } from "react"
import { FormFileUploadTestingState, TestFileUploadAction } from "./testig-action"

export default function FormFileUploadTesting() {
  const initialState: FormFileUploadTestingState = {status: ""};
  const [state, action] = useActionState(TestFileUploadAction, initialState);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setSelectedImages(prevImages => prevImages.concat(filesArray));
      //Array.from(e.target.files).map(file => URL.revokeObjectURL(file)); 
    }
  };

  return (
    <form action={action} encType="multipart/form-data">
      <input 
        onChange={handleImageChange}
        type="file" 
        id="file" 
        name="file" 
        accept="image/png, image/jpeg"
        multiple />
      <div>{state.status}</div>
      <div>
        {selectedImages.map((image, index) => (
          <img key={index} src={image} alt={`preview-${index}`} style={{ maxWidth: '150px', margin: '10px' }} />
        ))}
      </div>
      <button type="submit">daje</button>
    </form>
  )
}
