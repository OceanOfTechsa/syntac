import { JSX } from "react";

import FlagSettings from "@/utils/FlagSettings";
import Footer from "@/components/site/shared/footer";
import Header from "@/components/site/shared/header";
import { SiteProviders } from "@/components/site/shared/site-providers";

async function Layout({ children }: LayoutProps<"/">): Promise<JSX.Element> {
        const [showAnnouncementBanner, bannerText, bannerUrl, bannerButtonText] = await Promise.all([
            FlagSettings.GetBoolean("ShowAnnouncementBanner"),
            FlagSettings.GetString("AnnouncementBannerText"),
            FlagSettings.GetString("AnnouncementBannerUrl"),
            FlagSettings.GetString("AnnouncementBannerButtonText"),
        ]);

      return (
            <SiteProviders>
                <Header
                    showAnnouncementBanner={showAnnouncementBanner}
                    bannerText={bannerText || undefined}
                    bannerUrl={bannerUrl || undefined}
                    bannerButtonText={bannerButtonText || undefined}
                />

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
