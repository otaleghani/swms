import UploadImageField from "@/app/ui/general/form/files/item-image/field";
import { getDictionary, Locale } from "@/lib/dictionaries";

export default async function TestUploadPage({
  params
  }: {params: {lang: string}}) {
  const dict = await getDictionary(params.lang as Locale)
  return (
    <>
      <UploadImageField dict_upload_image={dict.images.upload_field}/>
    </>
  )
}
