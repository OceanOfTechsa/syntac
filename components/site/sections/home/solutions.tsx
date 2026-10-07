import Link from "next/link";

import {Button} from "@/components/ui/button"
import SectionHeader from "@/components/site/shared/section-header";

const LinkSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4.5 rotate-45"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  )
}

const Solutions = () => {
  return (
      <section id="solutions" className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
          <SectionHeader
            preTitle="Our Services"
            title="Digital Solutions Built For Your Business"
            markedWord="Solutions"
            desc="We design, develop, and evolve digital solutions that solve real business challenges, streamline operations, and help your business move forward."
          />

        <div>
          {/* Top Row */}
          <div className="grid divide-dashed border-y border-dashed max-md:divide-y md:grid-cols-2 md:divide-x">

            {/* Web Development */}
            <Link
              href="/services/web-development"
              className="group px-4 py-8 sm:px-6 lg:px-8"
            >
              <div className="flex flex-col gap-7.5">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      Web Development
                    </h3>

                    <Button
                      type="button"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[>svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex"
                    >
                      <LinkSvg />
                      <span className="sr-only"> View Web Development</span>
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-pretty">
                    Build fast, modern websites and web
                    experiences that communicate your brand,
                    engage your audience, and support your
                    business goals.
                  </p>
                </div>

                <div className="relative">
                  Have image or sliding here

                  <div className="from-background absolute inset-y-0 left-0 w-[15%] bg-linear-to-r to-transparent" />
                  <div className="from-background absolute inset-y-0 right-0 w-[15%] bg-linear-to-l to-transparent" />
                </div>
              </div>
            </Link>

            {/* MVP Development */}
            <Link href="/services/mvp-development" className="group px-4 py-8 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-7.5">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      MVP Development
                    </h3>

                    <Button type="button" className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[>svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex">
                      <LinkSvg />
                      <span className="sr-only">View MVP Development</span>
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-pretty">
                    Turn your idea into a working product that
                    can be tested, validated, and prepared for
                    future growth.
                  </p>
                </div>

                <div className="relative">
                  Have image or sliding here

                  <div className="from-background absolute inset-y-0 left-0 w-[15%] bg-linear-to-r to-transparent" />
                  <div className="from-background absolute inset-y-0 right-0 w-[15%] bg-linear-to-l to-transparent" />
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom Row */}
          <div className="grid divide-dashed border-b border-dashed max-md:divide-y md:grid-cols-6 md:divide-x">

            {/* Custom Software Development */}
            <Link
              className="group col-span-full px-4 pt-8 sm:px-6 md:max-lg:border-b lg:col-span-2 lg:px-8"
              href="/services/custom-software-development"
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      Custom Software Development
                    </h3>

                    <Button
                      type="button"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[>svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex"
                    >
                      <LinkSvg />
                      <span className="sr-only">View Custom Software Development</span>
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-pretty">
                    Purpose-built software designed around your
                    unique processes, requirements, workflows,
                    and business goals.
                  </p>
                </div>

                <div className="relative mt-auto h-46 overflow-hidden">
                  <img
                    src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ecommerce-light.png?width=338&format=auto"
                    alt="Custom Software Development"
                    loading="lazy"
                    className="absolute top-0 left-1/2 max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:hidden"
                  />

                  <img
                    src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ecommerce-dark.png?width=338&format=auto"
                    alt="Custom Software Development"
                    loading="lazy"
                    className="absolute top-0 left-1/2 hidden max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:inline-block"
                  />
                </div>
              </div>
            </Link>

            {/* Legacy System Modernisation */}
            <Link
              className="group px-4 pt-8 sm:px-6 md:col-span-3 md:max-lg:col-span-3 lg:col-span-2 lg:px-8"
              href="/services/legacy-system-modernisation"
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      Legacy System Modernisation
                    </h3>

                    <Button
                      type="button"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[>svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex"
                    >
                      <LinkSvg />
                      <span className="sr-only">View Legacy System Modernisation</span>
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-pretty">
                    Modernise ageing systems, improve
                    performance, and evolve your technology
                    without disrupting the business.
                  </p>
                </div>

                <div className="relative mt-auto h-46 overflow-hidden">
                  <img
                    src="https://cdn.shadcnstudio.com/ss-assets/landing-page/datatable-light.png?width=338&format=auto"
                    alt="Legacy System Modernisation"
                    loading="lazy"
                    className="absolute top-0 left-1/2 max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:hidden"
                  />

                  <img
                    src="https://cdn.shadcnstudio.com/ss-assets/landing-page/datatable-dark.png?width=338&format=auto"
                    alt="Legacy System Modernisation"
                    loading="lazy"
                    className="absolute top-0 left-1/2 hidden max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:inline-block"
                  />
                </div>
              </div>
            </Link>

            {/* Support & Maintenance */}
            <Link
              className="group px-4 pt-8 sm:px-6 md:col-span-3 md:max-lg:col-span-3 lg:col-span-2 lg:px-8"
              href="/services/support-maintenance"
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      Support & Maintenance
                    </h3>

                    <Button
                      type="button"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[>svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex"
                    >
                      <LinkSvg />
                      <span className="sr-only">View Support & Maintenance</span>
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-pretty">
                    Keep your software secure, reliable, and
                    ready for what comes next with ongoing
                    technical support and maintenance.
                  </p>
                </div>

                <div className="relative mt-auto h-46 overflow-hidden">
                  <img
                    src="https://cdn.shadcnstudio.com/ss-assets/landing-page/bento-grid-light.png?width=338&format=auto"
                    alt="Support and Maintenance"
                    loading="lazy"
                    className="absolute top-0 left-1/2 max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:hidden"
                  />

                  <img
                    src="https://cdn.shadcnstudio.com/ss-assets/landing-page/bento-grid-dark.png?width=338&format=auto"
                    alt="Support and Maintenance"
                    loading="lazy"
                    className="absolute top-0 left-1/2 hidden max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:inline-block"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
  );
};

export default Solutions;
