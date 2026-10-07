import React, { JSX } from "react";
import AppSettings from "@/utils/AppSettings";
import Footer from "@/components/site/shared/footer";
import Header from "@/components/site/shared/header";
import { SiteProviders } from "@/components/site/shared/site-providers";

function Layout({ children }: LayoutProps<"/">): JSX.Element {
  return (
    <SiteProviders>
      <Header showBanner={AppSettings.SHOW_BANNER} />
      <div className="mx-auto h-full w-full max-w-350 border-dashed min-[1400px]:border-x min-[1800px]:max-w-384">
        <div className="flex h-full w-full min-w-0 flex-col">
          <main className="flex min-h-0 flex-1 flex-col">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </SiteProviders>
  );
}

export default Layout;
