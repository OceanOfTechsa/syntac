import SectionHeader from "@/components/site/shared/section-header";
import React from "react";
import AppSettings from "@/utils/AppSettings";
import UserBanner from "@/components/site/shared/user-banner";

const OurStory = () => {
    return (
        <section id="our-story">
            <div
                className={
                    "mx-auto max-w-235 space-y-6 px-4 py-8 sm:px-6 sm:py-16 lg:border-x lg:border-dashed lg:px-12 lg:py-24"
                }
            >
                <SectionHeader
                    preTitle={`The Story Behind ${AppSettings.COMPANY_NAME}`}
                    showTitle={false}
                    showDescription={false}
                />

                <p className="text-lg">
                    The story of {AppSettings.COMPANY_NAME} began in 2021, while we were still at
                    university. It started with a passion for technology and a
                    growing interest in solving real-world challenges through
                    software. We became fascinated by the idea that technology
                    could do more than simply exist, it could solve problems,
                    improve the way businesses work, and create opportunities.
                </p>

                <p className="text-lg">
                    That idea became the foundation for{" "}
                    <strong>Ocean of Tech</strong>, the name under which we
                    started our journey. In the beginning, our focus was
                    primarily on website development and helping businesses
                    establish and improve their presence online. It was a
                    relatively small beginning, but it gave us the opportunity
                    to learn what it really meant to build technology for
                    someone else's business.
                </p>

                <p className="text-lg">
                    In 2022,{" "}
                    <strong>Sanele Jeza</strong> joined the journey as
                    co-founder and developer. What had started as an individual
                    idea became a shared vision. Working together allowed us to
                    explore more ideas, take on more challenging projects, and
                    develop a deeper understanding of both the technical and
                    business sides of building digital solutions.
                </p>

                <p className="text-lg">
                    One of the projects that became an important part of that
                    journey was <strong>Enoway</strong>, a delivery company
                    project that gave us the opportunity to work more closely
                    with real business requirements. Experiences like these
                    helped us understand that the most valuable technology is
                    not necessarily the most complicated, it is technology
                    that solves the right problem and fits the way a business
                    actually operates.
                </p>

                <p className="text-lg">
                    As we gained experience, our ambitions grew with us. We
                    began moving beyond website development and into more
                    structured software and business systems. We adopted
                    technologies such as modern <strong>.NET</strong> to build
                    more capable, maintainable solutions, while continuing to
                    work across web development and other digital technologies.
                    At the same time, we became more intentional about how we
                    worked with clients, keeping them involved throughout the
                    process rather than simply presenting a finished product
                    at the end.
                </p>

                <p className="text-lg">
                    Over the years, the biggest change has not simply been the
                    technologies we use or the projects we build. It has been
                    how much we have learned. Every project, challenge, and
                    new technology has helped shape our understanding of what
                    it takes to build useful software. We have learned to
                    listen more carefully, question assumptions, understand
                    the problem before choosing the technology, and build with
                    the future of the solution in mind.
                </p>

                <p className="text-lg">
                    By 2026, it became clear that the name{" "}
                    <strong>Ocean of Tech</strong> no longer represented the
                    direction we wanted to take. We wanted an identity that
                    felt less generic and better reflected the broader vision
                    we had developed over the years. That led to{" "}
                    <strong>{AppSettings.COMPANY_NAME}</strong>, a new chapter built around the
                    idea of synchronising ideas with technology.
                </p>

                <p className="text-lg">
                    Today, {AppSettings.COMPANY_NAME} brings together everything we have learned
                    along the way. We provide{" "}
                    <a href="/services" className="underline">
                        web development, custom software development, and
                        ongoing maintenance
                    </a>
                    , creating tailored digital solutions for businesses,
                    brands, organisations, and teams of different sizes.
                    While the scale of the vision has changed, the original
                    idea remains the same: <strong>use technology to solve meaningful
                    problems.</strong>
                </p>

                <p className="text-lg">
                    We are still growing, still learning, and still building.
                    Our ambition is to grow {AppSettings.COMPANY_NAME} into a company capable of
                    working with clients across South Africa and around the
                    world, while keeping the principles that shaped us from
                    the beginning, thoughtful engineering, genuine
                    collaboration, and technology built around the people and
                    businesses it serves.
                </p>


                <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col sm:items-center">
                  <UserBanner
                    image={'https://ik.imagekit.io/syntac/Syntac%20team/tr:w-390,h-390,fo-face:r-max/me.jpeg'}
                    fullName={'Sithuliso Zulu'}
                    linkedInUrl={'https://www.linkedin.com/in/sithuliso-zulu'}
                    role={'Co-founder & Developer'}
                  />

                  <UserBanner
                    image={'https://ik.imagekit.io/syntac/Syntac%20team/tr:w-410,h-410,fo-face:r-max/sanele.jpeg'}
                    fullName={'Sanele Jeza'}
                    linkedInUrl={'https://www.linkedin.com/in/sithuliso-zulu'}
                    role={'Co-founder & Developer'}
                    className={'flex grow items-center justify-end gap-3 max-sm:flex-row-reverse'}
                  />
                </div>
            </div>
        </section>
    );
};

export default OurStory;
