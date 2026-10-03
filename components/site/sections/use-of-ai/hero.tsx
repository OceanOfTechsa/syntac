import React from 'react'
import SectionHeader from "@/components/site/shared/section-header";

const Hero = () => {
    return (
        <section className={'my-16 flex w-full flex-col items-center gap-4'}>
            <SectionHeader
                preTitle="Use of AI"
                title="Our Approach to Artificial Intelligence"
                markedWord="Artificial Intelligence"
                desc="This policy outlines how SYNTAC uses artificial intelligence in our services and internal processes, including our approach to responsible use, data protection, security, accuracy, and human oversight."
            />
        </section>
    )
}
export default Hero
