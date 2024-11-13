import type { Metadata, Viewport } from "next";
import { GeistSans } from 'geist/font/sans';
import "@/app/globals.css";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { ThemeProvider } from "@/app/[lang]/theme";
import { Toaster } from "../ui/components/toaster";
import { SidebarProvider } from "../ui/components/sidebar";
import { DefaultSidebar } from "../ui/modules/sidebar/DefaultSidebar";
import getCurrentUser from "../lib/requests/currentUser";

export const metadata: Metadata = {
  title: "swms",
  description: "anvedi oh",
};

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
  const currentUser = await getCurrentUser();

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={`${GeistSans.className}`}>
        <SidebarProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DefaultSidebar dict={dict.sidebar} />
            <main className="w-full h-full">
                <div className="w-full">
                  {children}
               </div> 
               {
                //<Navbar />
                //<div className="xl:ml-[57px] xl:mb-0 mb-[57px]">{children}</div>
                }
                
            </main>
          <Toaster />
          </ThemeProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
