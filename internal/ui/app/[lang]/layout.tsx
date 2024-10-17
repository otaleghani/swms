import type { Metadata, Viewport } from "next";
import { GeistSans } from 'geist/font/sans';
import "@/app/globals.css";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { ThemeProvider } from "@/app/[lang]/theme";
import Navbar from "@/app/ui/navbar";
import { Toaster } from "../ui/components/toaster";

export const metadata: Metadata = {
  title: "swms",
  description: "anvedi oh",
};
// <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

export const viewport: Viewport = {
  initialScale: 1.0,
  maximumScale: 1.0,
  width: "device-width",
  viewportFit: "cover",
}

interface LayoutProps {
  params: {
    lang: string;
  };
  children: React.ReactNode;
}

export default async function RootLayout({ params, children }: LayoutProps) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body>
        <div className={`${GeistSans.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="xl:ml-[57px] mb-[57px]">{children}</div>
          </ThemeProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
