// Actions
import { getDictionary } from "@/lib/dictionaries";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import SubmitFormButtonPattern from "@/app/ui/patterns/form/buttons/SubmitFormButtonPattern";
import { Item } from "@/app/lib/types/data/items";

// Default values
//import DialogCategoryCreate from "../dialogs/DialogCategoryCreate";

interface Props {
  locale: Locale
  item: Item
}

export default async function HeaderItemSingle({
  locale,
  item
}: Props) {
  const dict = await getDictionary(locale);

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[
          { label: dict.item.header.breadcrumbs.item, url: "/items" },
        ]}
        currentItem={item.name}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
      {
        //<SubmitFormButtonPattern />
      }
      </>
    );
  };

  return (
    <HeaderWrapper 
      Left={HeaderWrapperLeft}
      Right={HeaderWrapperRight}
    />
  );
};
