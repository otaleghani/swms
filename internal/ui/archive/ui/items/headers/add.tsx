import SubmitButton from "../../general/form/button/submit";

interface ItemHeaderAddProps {
  dict_header: any;
  dict_general_fields: any;
  formName: string;
}

export default function ItemHeaderAdd({
  dict_header,
  dict_general_fields,
  formName,
}: ItemHeaderAddProps) {
  return (
    <header className="sticky top-0 bg-gray-50 border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <h1 className="font-semibold text-xl leading-none tracking-tight">{dict_header.title}</h1>
    
      <SubmitButton 
        isPending={false}
        dict={dict_general_fields.buttons.submit}
        className=""
        form={formName}
      />
    </header>
  )
}
