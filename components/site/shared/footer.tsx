import {JSX} from "react";
import Link from "next/link";
import Image from "next/image";
import {ArrowRight} from "lucide-react";

import AppSettings from "@/utils/AppSettings";
import {CompanyLinks, LinkType, PageLinks, SocialLinkProps} from "@/utils/Site/Links";
import { CookieSettingsTrigger } from "../cookie-consent";

const SocialLink = ({label, color, children }: SocialLinkProps): JSX.Element => {
    return (
        <Link href="#"
            aria-label={label}
            className={`${color} transition-opacity hover:opacity-70`}
        >
            {children}
        </Link>
    )
}

const Footer = (): JSX.Element => {
    return (
        <footer className="flex w-full flex-col overflow-x-hidden">
            <div className={'mx-auto w-full max-w-350 border-dashed min-[1400px]:border-x min-[1800px]:max-w-384 '}>
                <div className={'relative px-4 text-center w-full'}>
                    {/* Large background brand name */}
                    <div aria-hidden="true"
                         className="pointer-events-none absolute inset-x-0 top-0 z-10 py-3 text-center md:block"
                    >
                      <span className="block whitespace-nowrap uppercase font-sans text-[clamp(7rem,20vw,16rem)] font-semibold leading-[0.8] tracking-[0.3em] text-black/[0.06] dark:text-white/[0.06] font-brand">
                            {AppSettings.COMPANY_NAME.slice(0, 3)}<span className={'hidden sm:inline-flex'}>{AppSettings.COMPANY_NAME.slice(3)}</span>
                      </span>
                    </div>
                    {/* Light mode: white at the top, transparent at the bottom */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[clamp(2.2rem,6vw,5rem)] z-20 w-[100%] h-[clamp(18rem,30vw,25rem)] blur-[50px] md:block dark:hidden"
                        style={{
                            background:
                                'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.97) 12%, rgba(255,255,255,0.88) 30%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0) 100%)',
                        }}
                    />

                    {/* Dark mode: #0a0a0a at the top, transparent at the bottom */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[clamp(2.2rem,6vw,5rem)] z-20 hidden w-[100%] h-[clamp(18rem,30vw,25rem)] blur-[50px] dark:block"
                        style={{
                            background:
                                'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.97) 12%, rgba(10,10,10,0.88) 30%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.3) 75%, rgba(10,10,10,0) 100%)',
                        }}
                    />

                </div>

                <div className="relative z-30 mt-[90px] sm:mt-[220px] flex flex-col justify-end px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-10 pt-6 md:grid-cols-[1.55fr_0.7fr_0.7fr_1.45fr] md:gap-x-8 md:gap-y-12 lg:gap-x-12">
                        {/* Brand + description + socials */}
                        <section className="w-full sm:max-w-[320px]">
                            <Link
                                href="/"
                                className="mb-5 inline-flex items-center gap-2.5"
                                aria-label="Syntac home"
                            >
                                <Image
                                    width={34}
                                    height={34}
                                    src="/brand/syntac-brand-kit/logos/icon/png/syntac-icon-transparent.png"
                                    alt="syntac brand logo"
                                    className="w-full max-w-none block"
                                    aria-hidden="true"
                                />
                                <span className="text-[18px] mt-1 tracking-[-0.02em] text-neutral-900 dark:text-white font-brand">
                              {AppSettings.COMPANY_NAME}
                            </span>
                            </Link>
                            <p className="w-full sm:max-w-[320px] text-[14.5px] leading-[1.55] text-neutral-500 dark:text-white/55">
                                Shadcn studio is an open-source Tailwind CSS components library
                                with UI examples, blocks, templates, plugins, and a Figma design
                                system.
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                {/* Facebook */}
                                <SocialLink label="Facebook" color="text-[#1877F2]">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="h-[18px] w-[18px] fill-current"
                                    >
                                        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
                                    </svg>
                                </SocialLink>

                                {/* LinkedIn */}
                                <SocialLink label="LinkedIn" color="text-[#0A66C2]">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="h-[18px] w-[18px] fill-current"
                                    >
                                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
                                    </svg>
                                </SocialLink>

                                {/* X */}
                                <SocialLink label="X" color="text-neutral-900 dark:text-white">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="h-[17px] w-[17px] fill-current"
                                    >
                                        <path d="M18.2 2H21l-6.1 7 7.2 13h-5.6l-4.4-7.9L5.2 22H2.4l6.5-7.5L2 2h5.7l4 7.2L18.2 2Zm-1 17.7h1.6L6.1 4.2H4.4l12.8 15.5Z" />
                                    </svg>
                                </SocialLink>

                                {/* GitHub */}
                                <SocialLink label="GitHub" color="text-neutral-800 dark:text-[#f0f0f0]">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="h-[18px] w-[18px] fill-current"
                                    >
                                        <path d="M12 .7a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.6 1.3 3.2 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6a4.7 4.7 0 0 1 1.2-3.3 4.4 4.4 0 0 1 .1-3.2s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.5 1.3.2 2.7.1 3.2a4.7 4.7 0 0 1 1.2 3.3c0 4.6-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .7Z" />
                                    </svg>
                                </SocialLink>

                                {/* Instagram */}
                                <SocialLink label="Instagram" color="text-[#E1306C]">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="h-[18px] w-[18px] fill-none stroke-current"
                                        strokeWidth="1.8"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle
                                            cx="17.5"
                                            cy="6.5"
                                            r=".8"
                                            className="fill-current stroke-none"
                                        />
                                    </svg>
                                </SocialLink>

                                {/* YouTube */}
                                <SocialLink label="YouTube" color="text-[#FF0000]">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="h-[19px] w-[19px] fill-current"
                                    >
                                        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.3 3.7-6.3 3.7Z" />
                                    </svg>
                                </SocialLink>
                            </div>
                        </section>

                        {/* Company + Other Pages – side by side on mobile */}
                        <div className="grid grid-cols-2 gap-8 md:contents">
                            {/* Company links */}
                            <nav aria-label="Company">
                                <h2 className="mb-5 text-[15px] font-semibold text-neutral-900 dark:text-white">
                                    Company
                                </h2>
                                <ul className="space-y-3.5 text-[14.5px] text-neutral-500 dark:text-white/55">
                                    {CompanyLinks.map((link: LinkType) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href!}
                                                className="relative transition-colors
                                            after:absolute after:left-0 after:-bottom-0.5
                                            after:h-[2px] after:w-0
                                            after:bg-[#0B9944]
                                            after:transition-all after:duration-300
                                            hover:after:w-full
                                            hover:text-neutral-900 dark:hover:text-white"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Other pages */}
                            <nav aria-label="Other pages">
                                <h2 className="mb-5 text-[15px] font-semibold text-neutral-900 dark:text-white">
                                    Other Pages
                                </h2>
                                <ul className="space-y-3.5 text-[14.5px] text-neutral-500 dark:text-white/55">
                                    {PageLinks.map((link: LinkType) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href!}
                                                className="relative transition-colors
                                            after:absolute after:left-0 after:-bottom-0.5
                                            after:h-[2px] after:w-0
                                            after:bg-[#0B9944]
                                            after:transition-all after:duration-300
                                            hover:after:w-full
                                            hover:text-neutral-900 dark:hover:text-white"
                                            >
                                                {link.label}
                                                {link.label == 'Careers' && AppSettings.HIRING &&
                                                        <span className={'px-1 py-0.5 ms-2 no-underline text-[10.5px] leading border text-indigo-800 bg-indigo-100 rounded-full'}>We are hiring</span>
                                                }
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Newsletter */}
                        <section>
                            <h2 className="mb-5 text-[15px] font-semibold text-neutral-900 dark:text-white">
                                Leave us your email
                            </h2>
                            <form className="flex items-center gap-2">
                                <label htmlFor="email" className="sr-only">
                                    Your email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your email..."
                                    className="min-w-0 flex-1 rounded-md border  bg-white px-4 py-2.5 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-neutral-400  dark:bg-transparent dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/50"
                                />
                                <button
                                    type="submit"
                                    aria-label="Subscribe"
                                    className="group grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-md hover:rounded-full bg-[#0B0F19] text-white transition-all duration-500 hover:bg-[#0B9944] dark:bg-white dark:text-black dark:hover:bg-[#0B9944]"
                                >
                              <span
                                  aria-hidden="true"
                                  className="text-base transition-all duration-500 group-hover:-rotate-45"
                              >
                                <ArrowRight />
                              </span>
                                </button>
                            </form>

                            {/* Partner / community logos row */}
                            <div className="mt-6 border-t border-dashed pt-4 text-[12px] text-neutral-400 dark:text-white/30">
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                                    <span className="font-medium tracking-tight text-neutral-500 dark:text-white/40">
                                      How We Build:
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                 stroke-linejoin="round" className="lucide lucide-dot" aria-hidden="true">
                                            <circle cx="12.1" cy="12.1" r="1"></circle>
                                        </svg>
                                        Client-Centric
                                    </span>

                                    <span className="flex items-center gap-1">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                               stroke-linejoin="round" className="lucide lucide-dot" aria-hidden="true">
                                             <circle cx="12.1" cy="12.1" r="1"></circle>
                                         </svg>
                                        Scalable
                                    </span>

                                    <span className="flex items-center gap-1">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                              stroke-linejoin="round" className="lucide lucide-dot" aria-hidden="true">
                                             <circle cx="12.1" cy="12.1" r="1"></circle>
                                         </svg>
                                        Modern stack
                                    </span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div
                    className={'mt-5 mb-0 border-t border-dashed pt-3 pb-5 px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row justify-between align-center text-neutral-500 dark:text-white/40'}>
                    <div className={'flex flex-col gap-2'}>
                        <p className="text-[12.5px] leading-[1.55] mb-0">
                            © {new Date().getFullYear()} {AppSettings.FULL_COMPANY_NAME} — Software development company.
                        </p>
                        <Link
                            href="https://radar.syntac.online/"
                            className="transition-colors hover:text-neutral-900 text-[12.5px] align-center gap-2"
                        >
                            <span className={'underline underline-offset-4'}>Tech Radar Syntac</span>
                            <span className={'px-1 py-0.5 ms-2 no-underline text-[10.5px] leading border text-zinc-800 bg-zinc-100 rounded-full'}>Coming soon</span>
                        </Link>
                        <p className="text-[12.5px] leading-[1.55] mb-0">
                            All rights reserved.
                        </p>
                    </div>
                    <div className={'flex gap-3 align-center text-[12.5px] '}>
                        <Link
                            href="/offer"
                            className="underline underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
                        >
                            Public Offer Agreement
                        </Link>

                        <Link
                            href="/privacy-policy"
                            className="transition-colors hover:text-neutral-900  dark:hover:text-white underline underline-offset-4"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/ai-usage"
                            className="transition-colors hover:text-neutral-900  dark:hover:text-white underline underline-offset-4"
                        >
                            Use of AI
                        </Link>
                        <span>
                          <CookieSettingsTrigger className="cursor-pointer underline underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white" />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;