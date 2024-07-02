import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { getDictionary, Locale } from "@/lib/dictionaries";

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

export default async function RootLayout({ params, children }: LayoutProps) {
  const dict = await getDictionary(params.lang as Locale);

  return (
    <html lang={params.lang}>
      <body className={`${GeistSans.className} max-w-[1920px] px-8 m-auto`}>
        {children}
      </body>
    </html>
  );
}
