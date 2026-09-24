import { JSX } from "react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { fonts } from "@/utils/Site/Fonts"

import "./globals.css";
import SiteMetadata from "@/utils/Site/Metadata";
import Footer from "@/components/site/shared/footer";
import Header from "@/components/site/shared/header";
import { TooltipProvider } from "@/components/ui/tooltip"
import AppSettings from "@/utils/AppSettings/AppSettings";
import ScrollToTop from "@/components/site/shared/scroll-to-top";
import CursorTrailer from "@/components/site/shared/cursor-trailer";
import { ThemeProvider } from "@/components/providers/theme-provider"
import SmoothScroll from "@/components/providers/smooth-scroll-provider";

export const metadata: Metadata = SiteMetadata;

export default function RootLayout({ children }: LayoutProps<"/">): JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={cn("h-full", "antialiased", fonts.geistSans.variable, fonts.kalam.variable, fonts.brand.variable, "font-sans", fonts.geist.variable)}
    >
      <body className="style-vega flex min-h-full w-full flex-auto flex-col  bg-[#fff] dark:bg-[#0a0a0a] dark:text-white">
        <ThemeProvider
            attribute="class"
            defaultTheme="sytem"
            enableSystem
            disableTransitionOnChange
        >
          <Header showBanner={AppSettings.SHOW_BANNER} />
          <TooltipProvider>
            <main className="flex-grow flex-1 flex-col">
              <div className={'mx-auto h-full w-full max-w-350 border-dashed min-[1400px]:border-x min-[1800px]:max-w-384'}>
                <div className={'flex h-full w-full min-w-0 flex-col'}>

                  {children}
                </div>
              </div>
            </main>
          </TooltipProvider>
          <Footer />
          <CursorTrailer />
          <SmoothScroll />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
