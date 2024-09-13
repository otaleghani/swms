/**
* Only one component like this for form is usable. The reason is
* that if you use more than one you run the risk of overriding 
* the inputs between forms. It looks like the DataTransfer object
* does not allow multiple inputs to be taken into consideration.
* 
* @todo Add text input for each image (label)
* @todo Allow multiple upload field in a page (for variants)
*/

"use client";

import { useState, useRef, useEffect } from "react"
import { Upload, XIcon } from "lucide-react";
import { clientSideImageCompression } from "./optimization";
import FormFieldError from "../../error_field";

interface Image {
  file: File;
  previewUrl: string;
  id: string;
}

interface UploadImageFieldProps {
  dict_upload_image: any;
  description: string[];
}

export default function UploadImageField({ 
  dict_upload_image,
  description
}: UploadImageFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const allFilesRef = useRef<File[]>([]);

  useEffect(() => {
    // console.log('Updated images:', images);
    // console.log('Updated files:', files);
    // console.log('The input', fileInputRef.current?.files);
  }, [images, files]);

  /**
   *
   * Adds into the default <input type="file" /> all of the different images that are updated. 
   * This function allows to upload multiple images at different time.
   *
   * @param e - The event handler for the input element
   * @returns void
  */
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the files are present
    if (e.target.files) {
      // Create an optimized version of the files using client side compression
      const newFiles = await Promise.all(
        Array.from(e.target.files).map(async (file) => {
          const compressed = await clientSideImageCompression(file, 1000, 1000, 0.5);
          return compressed as File;
      }));
      
      // Create then the image object array with a random id
      const newImages: Image[] = newFiles.map((file) => {
        return {
          file: file,
          previewUrl: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9),
        };
      });

      // Add the new images in an array
      const updatedImages = [...images, ...newImages];
      const updatedFiles = [...files, ...newFiles];

      // Set the array in the state
      setImages(updatedImages);
      setFiles(updatedFiles);

      // Uploads the new array in the field
      if (fileInputRef.current) {
        fileInputRef.current.files = rebuildFileList(updatedFiles);
      }
    }
  };

  /**
   *
   * Removes images from the image field
   *
   * @param id The id of the image that you want to delete from the stack
   * of images
   *
   * */
  const handleRemoveImage = (id: string) => {
    // Filters out the image with the given id
    const updatedImages = images.filter((image) => image.id !== id);
    // Filters out the files with the given image
    const updatedFiles = files.filter((file) => updatedImages.some((img) => img.file === file));

    // Sets new version of images and files
    setImages(updatedImages);
    setFiles(updatedFiles);

    // Uploads the new array in the field
    if (fileInputRef.current) {
      fileInputRef.current.files = rebuildFileList(updatedFiles);
    }
  };

  /**
   *
   * Rebuilds the file list. Used to handle multiple uploads
   * and deletes of files inside of the image field.
   * Needed because this field does not support those 
   * features by default.
   * 
   * */
  const rebuildFileList = (items: File[]): FileList => {
    // Creates a new DataTransfer object and then uses it to craete
    // a new array of files to then add to the input
    const dataTransfer = new DataTransfer();
    items.forEach((file: File) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };

  return (
    <div>
      <label htmlFor="images" className="bg-white flex flex-col items-center gap-2 rounded border p-4">
        <Upload />
        <div className="text-sm">{dict_upload_image.label}</div>
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
      <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-2">
        {images.map((image) => (
          <div>
            <div key={image.id} className="relative aspect-square w-24">
              <img key={image.id} src={image.previewUrl} alt={`preview-${image.id}`} className="w-full h-full object-cover border rounded" />
              <button className="absolute -top-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center p-1 shadow" type="button" onClick={() => {handleRemoveImage(image.id)}}>
                <XIcon className="" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <FormFieldError
        id="imaages-error"
        description={description}
      />
    </div>
  )
}
