import {Metadata} from "next";
import {notFound} from "next/navigation";

import {WebDevelopmentChildMetadata} from "@/utils/Site/sitePageMetadata";
import WebApplicationBase from "@/components/site/sections/services/web-development/child/web-application/web-application-base";
import WebsiteDevelopmentBase from "@/components/site/sections/services/web-development/child/business-website/website-development-base";
import NotFound from "@/components/site/shared/not-found";
import EcommerceBase from "@/components/site/sections/services/web-development/child/ecommerce/ecommerce-base";

interface IServicePageProps {
    params: Promise<{ ChildService: string }>;
}

interface IChildService {
    ChildService: string;
}

const ChildServices: IChildService[] = [
    { ChildService: "business-websites" },
    { ChildService: "web-applications" },
    { ChildService: "ecommerce" },
    { ChildService: "portfolios" },
    { ChildService: "blogs-and-content" },
];

export async function generateMetadata({ params}: IServicePageProps): Promise<Metadata> {
    const { ChildService } = await params;
    const metadata: Metadata = WebDevelopmentChildMetadata[ChildService];
    if (!metadata) {
        notFound();
    }
    return metadata;
}

const ChildServicePage = async  ({params}: IServicePageProps) => {
    const { ChildService } = await params;
    const currentService: IChildService | undefined = ChildServices.find(
        (item: IChildService): boolean => item.ChildService === ChildService
    );

    if (!currentService) {
        return <NotFound />
    }

    switch (currentService.ChildService) {
        case "business-websites":
            return <WebsiteDevelopmentBase />;

        case "web-applications":
            return <WebApplicationBase />;

        case "ecommerce":
            return <EcommerceBase />;

        case "portfolios":
            return <div>Portfolios and personal sites</div>;

        case "blogs-and-content":
            return <div>blogs-and-content</div>;

        default:
            return <NotFound />;
    }
}
export default ChildServicePage;
