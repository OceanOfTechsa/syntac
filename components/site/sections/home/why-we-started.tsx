import SectionHeader from "@/components/site/shared/section-header";
import React from "react";
import AppSettings from "@/utils/AppSettings";
import UserBanner from "@/components/site/shared/user-banner";

const WhyWeStarted = () => {
    return (
        <section id={'why-we-started'}>
            <div
                className={'mx-auto max-w-235 space-y-6 px-4 py-8 sm:px-6 sm:py-16 lg:border-x lg:border-dashed lg:px-12 lg:py-24'}>
                <SectionHeader
                    preTitle={`Why We Built ${AppSettings.COMPANY_NAME}?`}
                    showTitle={false}
                    showDescription={false}
                />

                <p className="text-lg">
                    We started SYNTAC because we believe technology should adapt to the way a business works — not force a business to adapt to technology. Every business has different challenges, processes, and goals, which is why we build
                    {" "}
                    <a href="/services" className="underline">
                        tailored digital solutions
                    </a>
                    {" "}around the way our clients actually work.
                </p>

                <p className="text-lg">
                    We saw too many businesses settling for generic websites, disconnected tools, and software that was never designed around their specific needs. We wanted to create something different — a company that takes the time to understand the problem before building the solution, as you can see through our
                    {" "}
                    <a href="/work" className="underline">
                        work
                    </a>
                    {" "}and the solutions we've delivered.
                </p>

                <p className="text-lg">
                    We believe custom software should not be reserved for large organisations with large budgets. Our goal is to make thoughtfully engineered, scalable technology accessible to businesses that want to improve how they operate, serve their customers, and grow. Explore our
                    {" "}
                    <a href="/services" className="underline">
                        services
                    </a>
                    {" "}to see how we can help turn those goals into technology.
                </p>

                <p className="text-lg">
                    We also wanted to build technology that lasts. A project should not simply work on the day it launches — it should be maintainable, scalable, and ready to evolve as the business changes and new opportunities emerge. That's why we focus on building solutions with the
                    {" "}
                    <a href="/about" className="underline">
                        long term
                    </a>
                    {" "}in mind.
                </p>

                <p className="text-lg">
                    Most importantly, we wanted to build long-term partnerships rather than simply deliver projects. We take the time to understand the businesses we work with, solve the right problems, and build technology that continues to create value long after launch. If you have an idea, challenge, or project you'd like to explore, we'd love to
                    {" "}
                    <a href="/contact" className="underline">
                        start a conversation
                    </a>
                    {" "}with you.
                </p>
                <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col sm:items-center">
                    <UserBanner
                        image={'https://res.cloudinary.com/lbge76mf/image/upload/v1790977929/sithu.jpg'}
                        fullName={'Sithuliso Zulu'}
                        linkedInUrl={'https://www.linkedin.com/in/sithuliso-zulu'}
                        role={'Co-founder & Developer'}
                    />

                    <UserBanner
                        image={'https://res.cloudinary.com/lbge76mf/image/upload/v1790977929/sithu.jpg'}
                        fullName={'Sanele Jeza'}
                        linkedInUrl={'https://www.linkedin.com/in/sithuliso-zulu'}
                        role={'Co-founder & Developer'}
                        className={'flex grow items-center justify-end gap-3 max-sm:flex-row-reverse'}
                    />
                </div>
            </div>
        </section>
    )
}
export default WhyWeStarted;
