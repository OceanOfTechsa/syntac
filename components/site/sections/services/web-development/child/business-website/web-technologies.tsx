import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import {TechnologyStack} from "@/components/site/shared/technology-stack";

const WebTechnologies = () => {
    return (
        <section
            id="technologies"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our Technologies"
                title="The Technology Behind Your Website"
                markedWord="Technology"
                desc={`At ${AppSettings.COMPANY_NAME}, we use modern, reliable technologies to build professional business websites that reflect your brand and support your goals. From responsive interfaces and smooth interactions to performance optimisation, search engine optimisation, and website analytics, our technology choices help us create fast, accessible, and maintainable websites designed to grow with your business.`}
            />

            <TechnologyStack
                columns={3}
                show={[
                    { category: "frontend", technologies: ["react", "ts", "tailwind", "nextjs"], title: "Frontend" },
                    {category: "design"},
                    {category: 'monitoring', technologies: ["sentry", "uptimerobot", "google-analytics"] },
                ]}
            />
        </section>
    )
}
export default WebTechnologies;
