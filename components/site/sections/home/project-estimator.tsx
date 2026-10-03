import React from 'react'
import SectionHeader from "@/components/site/shared/section-header";
import { StartYourProject } from "@/components/site/forms/project-estimator-wizard";

const ProjectEstimator = () => {
    return (
        <section id={'project-estimator'} className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <SectionHeader
                preTitle="Start Your Project"
                title="Let’s Build Something That Works For You"
                markedWord="Build"
                desc="Have a project in mind? Tell us what you’re looking to achieve, and we’ll help shape your requirements into a practical technology solution."
            />

            <StartYourProject />
        </section>
    )
}
export default ProjectEstimator;
