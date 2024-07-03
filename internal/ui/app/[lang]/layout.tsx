import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "@/app/globals.css";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { ThemeProvider } from "@/app/[lang]/theme";
import { ModeToggle } from "./ui/toggle_mode";

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
    <html lang={params.lang} suppressHydrationWarning>
      <body>
        <div className={`${GeistSans.className} max-w-[1920px] px-8 m-auto`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-16 h-16">
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
