import React from 'react'
import Link from "next/link";
import Image from "next/image";

import AppSettings from "@/utils/AppSettings";

const PageSpeed = () => {
    return (
        <section className="grid border-t border-dashed md:grid-cols-2 divide-x divide-dashed " id={'page-speed'}>
            {/* Brand */}
            <div className="flex items-center justify-center px-6 py-12 lg:px-8">
                <div className="flex flex-col items-center gap-5 text-center">
                    <Image
                        width={84}
                        height={84}
                        loading="lazy"
                        quality={100}
                        src="/assets/site/images/speedometer.webp"
                        alt="page speedometer"
                        className="block h-auto w-auto"
                        aria-hidden="true"
                    />

                    <span className="text-4xl font-semibold">
                        Importance of Site Speed
                    </span>
                </div>
            </div>

            {/* Web Development Services */}
            <div className="flex flex-col">
                {/* Business Websites */}
                <div className="group flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 sm:px-6 lg:px-8">
                    <h3 className="text-xl font-medium">
                        Website speed is a critical factor in the success of your online presence. In an environment where users expect information to be available almost instantly,
                        even a few extra seconds of loading time can affect how visitors perceive your business. A slow website can frustrate potential customers,
                        discourage them from exploring your services, and increase the likelihood that they leave before taking action. Performance also influences how search engines evaluate page experience,
                        making speed an important consideration for businesses looking to improve their visibility online.
                    </h3>

                    <p className="text-muted-foreground">
                        At {AppSettings.COMPANY_NAME}, we consider performance throughout the website development process rather than treating it as a final adjustment.
                        We optimise images and other media, reduce unnecessary code, apply appropriate caching strategies, and implement efficient loading techniques to help pages respond quickly.
                        We also consider factors such as hosting infrastructure, server response times, mobile performance, and the delivery of essential page resources. By combining these practices with responsive design and careful testing,
                        we aim to deliver websites that feel fast, remain usable across devices, and provide a smoother experience for visitors. A well-performing website helps build confidence in your brand, encourages users to explore your offerings,
                        and creates a stronger foundation for engagement, conversions, and long-term search visibility.
                    </p>

                    <Link
                        data-roll
                        href="/contact"
                        className="cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-6 has-[>svg]:px-4 gap-2 rounded-sm px-6! text-base max-[400px]:flex-1"
                    >
                        Speed Up My Website
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default PageSpeed
