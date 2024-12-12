import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../../components/dialog";
import Image from "next/image";

/** 
* Dialog used to view images at higher resolutions. 
* You should also be able to modify the viewed image?
* */
interface Props {
  imageId: string;
  imageAlt: string;
}
export default function ImageViewer({
  imageId,
  imageAlt
}: Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Image
            height={300}
            width={300}
            className="w-full aspect-square object-cover border rounded"
            alt={imageAlt}
            src={`http://localhost:8080/media/${imageId}.jpg`}
          />
        </DialogTrigger>
        <DialogContent className="min-w-[80vw] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
            <Image
              height={1500}
              width={1500}
              className="object-contain w-full h-full max-w-[80vw] max-h-[80vh]"
              alt={imageAlt}
              src={`http://localhost:8080/media/${imageId}.jpg`}
            />
          <div className="">
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
