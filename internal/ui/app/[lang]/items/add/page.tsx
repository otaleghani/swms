/** Requests */
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getCategories } from "@/app/lib/requests/categories/get";
import { getSubcategories } from "@/app/lib/requests/subcategories/get";
import { getZones } from "@/app/lib/requests/zones/get";
import { getAisles } from "@/app/lib/requests/aisles/get";
import { getRacks } from "@/app/lib/requests/racks/get";
import { getShelfs } from "@/app/lib/requests/shelfs/get";

/** Components */
import AddItemPageComponent from "@/app/ui/items/add/component";

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
    // Had to create a new component because we cannot use useState
    // hook in a server component. The page component needs to be a 
    // server component because it has to parse the dicts.
    <AddItemPageComponent
      formName={formName} 
      locale={params.lang}

      dict_header={dict.items.add_form.header}
      dict_general_fields={dict.forms}
      dict_item_add_new={{}}
      dict_upload_image={dict.images.upload_field}

      dict_category_add_dialog={dict.categories.add_dialog}
      dict_subcategory_add_dialog={dict.subcategories.add_dialog}
      dict_zone_add_dialog={dict.zones.add_dialog}
      dict_aisle_add_dialog={dict.aisles.add_dialog}
      dict_rack_add_dialog={dict.racks.add_dialog}
      dict_shelf_add_dialog={dict.shelfs.add_dialog}

      dict_variant_delete_dialog={dict.variants.delete_dialog}
      dict_variant_edit_dialog={dict.variants.edit_dialog}
      dict_variant_add_form={dict.variants.add_form}

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
  )
}

// here -> form items, take care of the variant side of things
// a single form that you can submit that would basically
// return you an json objct
