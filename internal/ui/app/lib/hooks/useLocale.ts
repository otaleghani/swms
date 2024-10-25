import { AcceptedLocales } from "../types/misc";
import { usePathname } from "next/navigation";

export const useLocale = () => {
  let locale = usePathname().split("/")[1] as AcceptedLocales;
  return { locale }
}
