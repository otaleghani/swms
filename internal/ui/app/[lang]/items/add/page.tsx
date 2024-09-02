/** Requests */
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getCategories } from "@/app/lib/requests/categories/get";
import { getSubcategories } from "@/app/lib/requests/subcategories/get";
import { getZones } from "@/app/lib/requests/zones/get";
import { getAisles } from "@/app/lib/requests/aisles/get";
import { getRacks } from "@/app/lib/requests/racks/get";
import { getShelfs } from "@/app/lib/requests/shelfs/get";

/** Components */
import FormAddItem from "@/app/ui/items/add/form";
import ItemHeaderAdd from "@/app/ui/items/headers/add";
import { ScrollArea } from "@/components/scroll-area";
import UploadImageField from "@/app/ui/general/form/files/item-image/field";

interface AddItemPageProps {
  params: {
    lang: string;
  }
}

export default async function AddItemPage({
  params
}: AddItemPageProps) {
  const formName = "items-add-form";

  /** Fetch data */
  const dict = await getDictionary(params.lang as Locale);
  const pCategories = getCategories();
  const pSubcategories = getSubcategories();
  const pZones = getZones();
  const pAisles = getAisles();
  const pRacks = getRacks();
  const pShelfs = getShelfs();

  const [
    categories, 
    subcategories,
    zones,
    aisles,
    racks,
    shelfs,
  ] = await Promise.all([
    pCategories, 
    pSubcategories,
    pZones,
    pAisles,
    pRacks,
    pShelfs,
  ]);

  return (
    <>
      <ItemHeaderAdd
        dict_header={dict.items.add_form.header}
        dict_general_fields={dict.forms}
        formName={formName} />
      <form id={formName}  className="grid xl:grid-cols-2">
        <ScrollArea className="h-[calc(100vh_-_57px)] p-4" type="always">
          <FormAddItem 
            locale={params.lang}
            formName={formName}
            dict_item_add_new={{}}
            dict_general_fields={dict.forms}

            dict_category_add_dialog={dict.categories.add_dialog}
            dict_subcategory_add_dialog={dict.subcategories.add_dialog}
            dict_zone_add_dialog={dict.zones.add_dialog}
            dict_aisle_add_dialog={dict.aisles.add_dialog}
            dict_rack_add_dialog={dict.racks.add_dialog}
            dict_shelf_add_dialog={dict.shelfs.add_dialog}

            dict_category_select={dict.categories.select_field}
            dict_subcategory_select={dict.subcategories.select_field}
            dict_zone_select={dict.zones.select_field}
            dict_aisle_select={dict.aisles.select_field}
            dict_rack_select={dict.racks.select_field}
            dict_shelf_select={dict.shelfs.select_field}

            categories={categories}
            subcategories={subcategories} 
            zones={zones}
            aisles={aisles}
            racks={racks}
            shelfs={shelfs}
            />
        </ScrollArea>
        <ScrollArea className="h-[calc(100vh_-_57px)] p-4" type="always">
          <UploadImageField dict_upload_image={dict.images.upload_field}/>
        </ScrollArea>
      </form>
    </>
  )
}

// here -> form items, take care of the variant side of things
// a single form that you can submit that would basically
// return you an json objct
