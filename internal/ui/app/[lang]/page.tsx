import GetItems from "@/app/lib/items/get";
import { getCategory, getSubcategory } from "@/lib/reqs";
import { getDictionary, Locale } from "@/lib/dictionaries";
import FormItemsAdd from "@/app/ui/general/form/add/items/form";

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
      {
      //<FormItemsAdd 
      //  listCategory={parsedCategory} 
      //  listSubcategory={parsedSubcategory}
      //  lang={params.lang} 
      //  dict={dict}
      //  dictCategory={dict.categories.form}
      //  dictSubcategory={dict.subcategories.form} />
      }
    </main>
  );
}
