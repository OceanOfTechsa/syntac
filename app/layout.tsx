import { JSX } from "react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { fonts } from "@/utils/Site/Fonts";

import "./globals.css";

import SiteMetadata from "@/utils/Site/Metadata";
import { TooltipProvider } from "@/components/ui/tooltip";
import CursorTrailer from "@/components/site/shared/cursor-trailer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import SmoothScroll from "@/components/providers/smooth-scroll-provider";
import ScrollToTop from "@/components/site/shared/scroll-to-top";
import { CleanHash } from "@/components/site/shared/clean-hash";
import {CookieConsentProvider} from "@/components/site/cookie-consent";
import {ConsentGuard} from "@/components/site/cookie-consent/consent-guard";

export const metadata: Metadata = SiteMetadata;

export default function RootLayout({children, }: LayoutProps<"/">): JSX.Element {
  return (
      <html
          lang="en"
          suppressHydrationWarning
          className={cn(
              "h-full",
              "antialiased",
              fonts.geistSans.variable,
              fonts.kalam.variable,
              fonts.brand.variable,
              fonts.signature.variable,
              "font-sans",
              fonts.geist.variable
          )}
      >
          <body className="style-vega flex min-h-full w-full flex-auto flex-col">
              <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
              >
                <TooltipProvider>
                    <CookieConsentProvider>
                        {children}
                        <ConsentGuard
                            gaId={process.env.NEXT_PUBLIC_GA_ID}
                            gtmId={process.env.NEXT_PUBLIC_GTM_ID}
                            sentryDsn={process.env.NEXT_PUBLIC_SENTRY_DSN}
                            sentryEnvironment={process.env.NEXT_PUBLIC_SENTRY_ENV}
                        />
                    </CookieConsentProvider>
                </TooltipProvider>

                <CursorTrailer />
                <SmoothScroll />
                <ScrollToTop />
                <CleanHash />
              </ThemeProvider>
          </body>
      </html>
  );
}