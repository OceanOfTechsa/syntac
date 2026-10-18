import React from 'react'
import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import {TechnologyStack} from "@/components/site/shared/technology-stack";

const Stack = () => {
    return (
        <section
            id="stack"
            className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our Technology Stack"
                title="Modern Technologies. Thoughtfully Chosen."
                markedWord="Technologies"
                desc={`At ${AppSettings.COMPANY_NAME}, we choose proven, modern technologies based on your project's requirements, performance needs, and long-term goals. From frontend frameworks and backend systems to databases, integrations, and monitoring tools, every technology serves a purpose in building reliable, maintainable, and scalable digital solutions.`}
            />
            <TechnologyStack columns={3} data-divider showTechName={true} />

            <p className="mx-auto max-w-6xl text-center text-muted-foreground sm:text-3xl">
                The right technology makes all the difference. We bring together
                <span className="text-black dark:text-white"> proven tools and modern frameworks </span>
                to build reliable, maintainable solutions that deliver today and
                <span className="text-black dark:text-white"> evolve with your business </span>
                as your needs grow.
            </p>
        </section>
    )
}
export default Stack;
