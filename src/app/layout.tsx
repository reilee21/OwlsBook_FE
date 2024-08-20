import type { Metadata } from "next";
import "./globals.css";
import Auth from './auth';
import Providers from './provider';
import { ClerkProvider } from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Owls Book - Nhà sách thông minh",
  description: "By Tung Lee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <head>
        <link
              rel="icon"
              href="/icon?<generated>"
              type="image/<generated>"
              sizes="<generated>"
            />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
      </head>
      <body className={cn( "min-h-screen bg-[#f5f5fa] font-sans antialiased", fontSans.variable )}>
          <Providers>
            <Auth>
                {children}
            </Auth>
          </Providers>
          <Toaster/>
      </body>
    </html>
    </ClerkProvider>        

  );
}
