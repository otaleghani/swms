"use client";

/** React hooks */
import { useState, useRef, useEffect } from "react"

/** Third-party components */
import { Upload, XIcon } from "lucide-react";

/** Scripts and actions */
import { clientSideImageCompression } from "./images-optimization";

interface PreviewImage {
  file: File;
  previewUrl: string;
  id: string;
}

interface InputImagesProps {
  dict: any;
}
/**
 * InputImages component allows users to upload and preview images with client-side compression.
 *
 * The component uses a file input to select images, compresses them using a client-side optimization
 * function, and displays the image previews. Users can also remove selected images.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.dict - Localization dictionary for labels and placeholders.
 */
export default function InputImages({ 
  dict,
}: InputImagesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  /**
   * Handles image upload, compresses the images, and adds them to the preview list.
   * Supports multiple uploads at different times.
   *
   * @async
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event containing image files.
   * @returns {Promise<void>}
   */
  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the files are present
    if (e.target.files) {
      // Create an optimized version of the files using client side compression
      const newCompressedFiles = await Promise.all(
        Array.from(e.target.files).map(async (file) => {
          const compressedFiles = await clientSideImageCompression(file, 1000, 1000, 0.5);
          return compressedFiles as File;
      }));

      // Create then the image object array with a random id
      const newPreviewImages: PreviewImage[] = newCompressedFiles.map((file) => {
        return {
          file: file,
          previewUrl: URL.createObjectURL(file),
          id: Math.random().toString(36).substring(2, 9),
        };
      });

      // Add the new images in an array
      const updatedPreviewImages = [...previewImages, ...newPreviewImages];
      const updatedFiles = [...files, ...newCompressedFiles];

      // Set the array in the state
      setPreviewImages(updatedPreviewImages);
      setFiles(updatedFiles);

      // Uploads the new array in the field
      if (fileInputRef.current) {
        fileInputRef.current.files = rebuildFileList(updatedFiles);
      }
    }
  };

  /**
   * Removes an image from the preview list and updates the file input field.
   *
   * @param {string} id - The ID of the image to be removed.
   */
  const handleRemoveImage = (id: string) => {
    // Filters out the image with the given id
    const updatedPreviewImages = previewImages.filter((image) => image.id !== id);
    // Filters out the files with the given image
    const updatedFiles = files.filter((file) => updatedPreviewImages.some((img) => img.file === file));

    // Sets new version of images and files
    setPreviewImages(updatedPreviewImages);
    setFiles(updatedFiles);

    // Uploads the new array in the field
    if (fileInputRef.current) {
      fileInputRef.current.files = rebuildFileList(updatedFiles);
    }
  };

  /**
   * Rebuilds the FileList from an array of File objects.
   *
   * @param {File[]} items - Array of File objects to be added to the FileList.
   * @returns {FileList} - A new FileList containing the provided files.
   */
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
        <div className="text-sm">{dict.label}</div>
      </label>
      <input 
        ref={fileInputRef}
        onChange={handleAddImage}
        type="file" 
        id="images" 
        name="images" 
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        multiple />
      <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-2">
        {previewImages.map((image) => (
          <div>
            <div key={image.id} className="relative aspect-square w-24">
              <img 
                key={image.id} 
                src={image.previewUrl} 
                alt={`preview-${image.id}`} 
                className="w-full h-full object-cover border rounded" 
              />
              <button 
                className="absolute -top-1 -right-1 bg-white rounded-full w-6 h-6 
                flex items-center justify-center p-1 shadow" 
                type="button" 
                onClick={() => {handleRemoveImage(image.id)}}
              >
                <XIcon className="" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
