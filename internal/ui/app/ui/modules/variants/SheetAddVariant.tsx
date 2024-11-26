"use client"
import { Button } from "../../components/button"
import { SheetTrigger } from "../../components/sheet"
import DialogWrapperHeader from "../../wrappers/dialogs/DialogWrapperHeader"
import SheetWrapper from "../../wrappers/sheets/SheetWrapper"
interface Props {
  //setVariants:
  //setCodes => Add new codes
  //
}

export default function SheetAddVariant() {
  const SheetLocalTrigger = () => {
    return (
      <>
        <SheetTrigger asChild>
          <Button
            size="sm"
            variant="secondary"
            className="h-10 w-full"
          >Open thing</Button>
        </SheetTrigger>
      </>
    )
  }
  const SheetLocalBody = () => {
    return (
      <>
        <DialogWrapperHeader 
          title="title"
          description="desc"
        />
      </>
    )
  }

  return (
    <>
      <SheetWrapper 
        Trigger={SheetLocalTrigger}
        Body={SheetLocalBody}
      />
    </>
  )
}
