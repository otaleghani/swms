import { NextResponse, NextRequest } from "next/server"; 
import { headers, cookies } from "next/headers";

const languages = ["it", "en", "es"];

export function middleware(request: NextRequest) {
  const locales = headers().get('accept-language');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/workers")) {
    return 
  }

  if (pathname.startsWith("/api")) {
    return 
  }

  if (cookies().get("access") === undefined) {
    if (!pathname.includes("login") && !pathname.includes("register")) {
      request.nextUrl.pathname = "login"
      const response = NextResponse.redirect(request.nextUrl)
      return response
    }
  }

  if (pathname.startsWith('/assets')) {
    return 
  }
  if (pathname.startsWith('/favicon')) {
    return 
  }
  if (request.method === "POST") {
    return 
  }

  const pathnameHasLocale = languages.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
 
  if (pathnameHasLocale) {
    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    return NextResponse.next({ headers });
  }

  if (typeof locales === "string") {
    const pattern = /;q=\d\.\d/g;
    const cleanedLocalesString = locales.replace(pattern, "");
    const cleanedLocales = cleanedLocalesString.split(",")
    const matchingLocale = findFirstMatchingLanguage(languages, cleanedLocales);
    request.nextUrl.pathname = `/${matchingLocale}${pathname}`

    const response = NextResponse.redirect(request.nextUrl)
    response.headers.set('x-current-path', request.nextUrl.pathname)
    return response
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
