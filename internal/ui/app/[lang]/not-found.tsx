import { getDictionary, Locale } from "@/lib/dictionaries"
import { headers } from "next/headers"
import { Button } from "../ui/components/button";
import HeaderWrapper from "../ui/wrappers/headers/HeaderWrapper";

export default async function NotFound() {
  const headersList = headers();
  //const lang = headersList.get("Referer")?.split("/")[3];
  const dict = await getDictionary("en");

  return (
    <>
      <HeaderWrapper 
        Left={() => {return (
          <></>
        )}}
        Right={() => {return (
          <></>
        )}}
      />
      <div className="xl:h-[calc(100vh_-_114px)] w-full flex items-center justify-center">
        <div className="p-4 xl:w-64 grid gap-4">
          <h1 className="text-xl font-semibold">{dict.misc.pageNotFound.title}</h1>
          <p>{dict.misc.pageNotFound.description}</p>
          <Button asChild>
            <a href="/">
              {dict.misc.pageNotFound.buttonLabel}
            </a>
          </Button>
        </div>
      </div>
    </>
  )
};
