import { NextResponse } from "next/server"; 
import type { NextRequest } from "next/server";
import { headers } from "next/headers";


export function middleware(request: NextRequest) {
  const locales = headers().get('accept-language');
  const languages = ["it", "en"];
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/assets')) {
    return 
  }
  if (pathname.startsWith('/favicon')) {
    return 
  }

  const pathnameHasLocale = languages.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
 
  if (pathnameHasLocale) return

  if (typeof locales === "string") {
    const pattern = /;q=\d\.\d/g;
    const cleanedLocalesString = locales.replace(pattern, "");
    const cleanedLocales = cleanedLocalesString.split(",")
    const matchingLocale = findFirstMatchingLanguage(languages, cleanedLocales);
    request.nextUrl.pathname = `/${matchingLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  } 
}

// Exclude nextjs chunks
export const config = {
  matcher: [
    '/((?!_next|api|_next/static|_next/image|favicon.ico).*)',
  ],
}

const findFirstMatchingLanguage = (locales: string[], languages: string[]) => {
  for (let locale of locales) {
    for (let language of languages) {
      if (locale.startsWith(language)) {
        return language;
      }
    }
  }
  return "en"; 
};
