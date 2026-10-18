import React from 'react'

import type {CaseStudy} from "@/utils/Site/case-studies";
import UserBanner from "@/components/site/shared/user-banner";
import SectionHeader from "@/components/site/shared/section-header";

interface IClientFeedbackSectionProps {
    study: CaseStudy
}

const ClientFeedbackSection = ({study}: IClientFeedbackSectionProps) => {
    const {feedback} = study;
    if (!feedback) return null;

    return (
        <section id={'feedback'} className={'border-t border-dashed '}>
            <div
                className={'mx-auto max-w-235 space-y-6 px-4 py-8 sm:px-6 sm:py-16 lg:border-x lg:border-dashed lg:px-12 lg:py-24'}>
                <SectionHeader
                    preTitle={'Client Feedback'}
                    title={'A Word From Our Client'}
                    markedWord={'Client'}
                    showTitle={false}
                    showDescription={false}
                    desc={'Hear about our client’s experience working with us and the value this project brought to their business.'}
                />

                <p className="text-lg">
                    {feedback.quote}
                </p>
                <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col sm:items-center">
                    <UserBanner
                        image={feedback.author.image}
                        fullName={feedback.author.name}
                        linkedInUrl={feedback.author.linkedInUrl}
                        role={feedback.author.role}
                    />
                </div>
            </div>
        </section>
    )
}
export default ClientFeedbackSection