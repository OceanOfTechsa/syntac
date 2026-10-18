import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import {TechnologyStack} from "@/components/site/shared/technology-stack";

const Technologies = () => {
    return (
        <section
            id="technologies"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our Technologies"
                title="The Technology Behind Our Solutions"
                markedWord="Technology"
                desc={`At ${AppSettings.COMPANY_NAME}, we choose reliable, modern technologies that fit your project's needs. From frontend experiences to backend systems and databases, our technology stack helps us build secure, scalable, and maintainable digital solutions.`}
            />
            <TechnologyStack
                columns={4}
            />
        </section>
    )
}
export default Technologies;
