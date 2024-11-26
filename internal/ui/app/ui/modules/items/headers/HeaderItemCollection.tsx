// Actions
import { getDictionary } from "@/lib/dictionaries";

// Components
import { BreadcrumbsPattern } from "@/app/ui/patterns/BreadcrumbsPattern"
import HeaderWrapper from "@/app/ui/wrappers/headers/HeaderWrapper"

// Types and interfaces
import { Locale } from "@/lib/dictionaries";
import { Button } from "@/app/ui/components/button";

interface Props {
  locale: Locale
}

export default async function HeaderItemCollection({
  locale,
}: Props) {
  const dict = await getDictionary(locale);

  const HeaderWrapperLeft = () => {
    return (
      <BreadcrumbsPattern 
        itemsList={[]}
        currentItem={dict.item.header.breadcrumbs.item}
      />
  )}
  
  const HeaderWrapperRight = () => {
    return (
      <>
        <Button asChild>
          <a href="/items/add">{dict.item.dialogs.add.trigger.label}</a>
        </Button>
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
