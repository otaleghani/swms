import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "@/app/globals.css";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { ThemeProvider } from "@/app/[lang]/theme";
import Navbar from "./ui/navbar";

export const metadata: Metadata = {
  title: "swms",
  description: "anvedi oh",
};

interface LayoutProps {
  params: {
    lang: string;
  };
  children: React.ReactNode;
}

//           {// max-w-[1920px] px-8 m-auto}

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
            <div className="xl:ml-[57px]">{children}</div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
