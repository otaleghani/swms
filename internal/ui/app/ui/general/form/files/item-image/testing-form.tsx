"use client";

import { useActionState, useState, useRef } from "react"
import { FormFileUploadTestingState, TestFileUploadAction } from "./testig-action"

interface Image {
  file: File;
  previewUrl: string;
  id: string;
}

export default function FormFileUploadTesting() {
  const initialState: FormFileUploadTestingState = {status: ""};
  const [state, action] = useActionState(TestFileUploadAction, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImages, setSelectedImages] = useState<Image[]>([]);
  const [rawImages, setRawImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages: Image[] = files.map((file) => {
        return {
          file: file,
          previewUrl: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9), // generate unique id
        };
      });

      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
      setRawImages((prevFiles) => [...prevFiles, ...files]);
      if (fileInputRef.current) {
        e.target.files = rebuildFileList();
        fileInputRef.current.files = rebuildFileList() as unknown as FileList;
        console.log(fileInputRef.current.files)
      }
    }
  };
  const handleRemoveImage = (id: string) => {
    setSelectedImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };
  const rebuildFileList = (): FileList => {
    const dataTransfer = new DataTransfer();
    rawImages.forEach((file: any) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  return (
    <form action={action} name="theform" id="theform" encType="multipart/form-data">
      <input 
        ref={fileInputRef}
        onChange={handleImageChange}
        type="file" 
        id="images" 
        name="images" 
        accept="image/png, image/jpeg, image/jpg"
        multiple />
      <div>{state.status}</div>
      <div>
        {selectedImages.map((image) => (
          <div key={image.id}>
            <img key={image.id} src={image.previewUrl} alt={`preview-${image.id}`} style={{ maxWidth: '150px', margin: '10px' }} />
            <button onClick={() => {handleRemoveImage(image.id)}}>adf</button>
          </div>
        ))}
      </div>
      <button type="submit" form="theform">daje</button>
    </form>
  )
}
