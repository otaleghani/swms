"use client";

import { useActionState, useState, useRef, useEffect } from "react"
import { FormFileUploadTestingState, TestFileUploadAction } from "./testig-action"
import { Label } from "@/components/label";
import { Upload, XIcon } from "lucide-react";

interface Image {
  file: File;
  previewUrl: string;
  id: string;
}

export default function FormFileUploadTesting() {
  const initialState: FormFileUploadTestingState = {status: ""};
  const [state, action] = useActionState(TestFileUploadAction, initialState);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const allFilesRef = useRef<File[]>([]);

  useEffect(() => {
    console.log('Updated images:', images);
    console.log('Updated files:', files);
    console.log('The input', fileInputRef.current?.files);
  }, [images, files]);


  /**
   * Adds into the default <input type="file" /> all of the different images that are updated. 
   * This function allows to upload multiple images in different uploads
   * @param e The event handler for the input element
   * @returns void
  */
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newImages: Image[] = newFiles.map((file) => {
        return {
          file: file,
          previewUrl: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9),
        };
      });

      const mimeType = newImages[0].file.type;
      const fileName = newImages[0].file.name;

      const updatedImages = [...images, ...newImages];
      const updatedFiles = [...files, ...newFiles];
      allFilesRef.current = [...files, ...newFiles];

      setImages(updatedImages);
      setFiles(updatedFiles);

      if (fileInputRef.current) {
        fileInputRef.current.files = rebuildFileList(allFilesRef.current);
      }
    }
  };

  /**
   * 
   * @param id The id of the image that you want to delete from the stack 
   * of images
  */
  const handleRemoveImage = (id: string) => {
    const updatedImages = images.filter((image) => image.id !== id);
    const updatedFiles = files.filter((file) => updatedImages.some((img) => img.file === file));

    setImages(updatedImages);
    setFiles(updatedFiles);
    allFilesRef.current = updatedFiles;

    if (fileInputRef.current) {
      fileInputRef.current.files = rebuildFileList(allFilesRef.current);
    }
  };
    
  const rebuildFileList = (items: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    items.forEach((file: File) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  return (
    <form action={action} encType="multipart/form-data" className="p-4 block">
      <div>
        <label htmlFor="images" className="flex flex-col items-center gap-2 rounded border p-4">
          <Upload />
          <div className="text-sm">Upload your images</div>
        </label>
        <input 
          ref={fileInputRef}
          onChange={handleImageChange}
          type="file" 
          id="images" 
          name="images" 
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          multiple />
        <div>{state.status}</div>
        <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-2">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-square w-24">
              <img key={image.id} src={image.previewUrl} alt={`preview-${image.id}`} className="w-full h-full object-cover border rounded" />
              <button className="absolute -top-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 shadow" type="button" onClick={() => {handleRemoveImage(image.id)}}>
                <XIcon className="" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit">daje</button>
    </form>
  )
}
