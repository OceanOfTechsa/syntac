import React from 'react'
import SectionHeader from "@/components/site/shared/section-header";
import Testimonials from "@/components/site/testimonials";

const TestimonialsSection = () => {
    return (
        <section id={'testimonials'} className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <SectionHeader
                preTitle="Client Experiences"
                title="Trusted To Build What Matters"
                markedWord="Trusted"
                desc="See how businesses and teams have experienced working with SYNTAC to turn ideas, challenges, and requirements into practical digital solutions."
            />

            <Testimonials />
        </section>
    )
}
export default TestimonialsSection;
