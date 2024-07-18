import Image from "next/image";
import GetItems from "@/app/lib/items/get";
import { getCategory, getSubcategory } from "@/lib/reqs";
import { getDictionary, Locale } from "@/lib/dictionaries";
import AddItemForm from "../ui/general/form/items/add/form";
import { ComboboxForm } from "../ui/general/form/test-shad";
import TestForm from "../ui/general/form/test/form";
import SelectCategory from "../ui/general/form/select/category/field";

interface HomeProps {
  params: {
    lang: string;
  }
}

export default async function Home({ params }: HomeProps ) {
  const dict = await getDictionary(params.lang as Locale);

  const data = GetItems()
  const category = getCategory()
  const subcategory = getSubcategory()
  const [ parsedData, parsedCategory, parsedSubcategory ] = await Promise.all([data, category, subcategory])

  return (
    <main className="w-full p-4">
      <SelectCategory 
        categoryData={parsedCategory} 
        subcategoryData={parsedSubcategory}
        lang={params.lang} 
        dictCategory={dict.category.form}
        dictSubcategory={dict.subcategory.form} />
    </main>
  );
}
