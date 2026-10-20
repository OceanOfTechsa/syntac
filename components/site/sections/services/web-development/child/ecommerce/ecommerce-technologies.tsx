import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import { TechnologyStack } from "@/components/site/shared/technology-stack";

const ECommerceTechnologies = () => {
    return (
        <section
            id="technologies"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our Technologies"
                title="The Technology Behind Your Online Store"
                markedWord="Technology"
                desc={`At ${AppSettings.COMPANY_NAME}, we use modern technologies to build custom e-commerce websites tailored to your products, customers, and business requirements. From responsive storefronts and intuitive shopping experiences to backend processing, database management, and third-party integrations, we choose technologies that support performance, maintainability, and a reliable purchasing journey as your business grows.`}
            />

            <TechnologyStack
                columns={3}
                show={[
                    {
                        category: "frontend",
                        technologies: [
                            "react",
                            "ts",
                            "tailwind",
                            "nextjs",
                        ],
                        title: "Storefront",
                    },
                    {
                        category: "design",
                    },
                    {
                        category: "ecommerce",
                    },
                    {
                        category: "notifications",
                    },
                    {
                        category: "database",
                        technologies: [
                            "sqlserver",
                            "postgresql",
                            "mongodb",
                            "redis",
                        ],
                    },
                    {
                        category: "monitoring",
                        technologies: [
                            "sentry",
                            "google-analytics",
                            "google-search-console",
                            "uptimerobot",
                        ],
                    },
                ]}
            />
        </section>
    );
};

export default ECommerceTechnologies;