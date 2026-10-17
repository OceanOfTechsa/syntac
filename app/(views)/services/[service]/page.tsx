import {Metadata} from "next";
import { notFound } from "next/navigation";

import {ServicesMetadata} from "@/utils/Site/sitePageMetadata";
import MvpDevelopmentBase from "@/components/site/sections/services/mvp-development/mvp-development-base";
import WebDevelopmentBase from "@/components/site/sections/services/web-development/web-development-base";

interface IServicePageProps {
    params: Promise<{ service: string }>;
}

interface IService {
    service: string;
}

const Services: IService[] = [
    { service: "web-development" },
    { service: "mvp-development" },
    { service: "custom-software-development" },
    { service: "legacy-system-modernisation" },
    { service: "support-maintenance" },
];


export async function generateMetadata({ params}: IServicePageProps): Promise<Metadata> {
    const { service } = await params;
    const metadata: Metadata = ServicesMetadata[service];
    if (!metadata) {
        notFound();
    }
    return metadata;
}

const ServicePage = async ({ params }: IServicePageProps) => {
    const { service } = await params;
    const currentService: IService | undefined = Services.find(
        (item: IService): boolean => item.service === service
    );

    if (!currentService) {
        notFound();
    }

    switch (currentService.service) {
        case "web-development":
            return <WebDevelopmentBase />;

        case "mvp-development":
            return <MvpDevelopmentBase />;

        case "custom-software-development":
            return <div>Custom Software Development</div>;

        case "legacy-system-modernisation":
            return <div>Legacy System Modernisation</div>;

        case "support-maintenance":
            return <div>Support and Maintenance</div>;

        default:
            notFound();
    }
};

export default ServicePage;