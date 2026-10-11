import React from 'react'

import AppSettings from "@/utils/AppSettings";
import UserBanner from "@/components/site/shared/user-banner";
import SectionHeader from "@/components/site/shared/section-header";

const ClientFeedbackSection = () => {
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
                    SIVOXI has successfully migrated the client's site to a new platform and launched their API partnerships with two companies. The team manages the project well by responding promptly to the client's questions and concerns. Moreover, their strong understanding of the client's needs stands out.
                </p>
                <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col sm:items-center">
                    <UserBanner
                        image={'https://ik.imagekit.io/syntac/Syntac%20team/tr:w-400,h-400,fo-face:r-max/me.jpeg'}
                        fullName={'Sithuliso Zulu'}
                        linkedInUrl={'https://www.linkedin.com/in/sithuliso-zulu'}
                        role={'Co-founder & Developer'}
                    />
                </div>
            </div>
        </section>
    )
}
export default ClientFeedbackSection
