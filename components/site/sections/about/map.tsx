import React from 'react'

import AppSettings from "@/utils/AppSettings";
import {Headphones, MapPin} from "lucide-react";
import SectionHeader from "@/components/site/shared/section-header";

const MapSection = () => {
    return (

        <section className="pb-16 xl:pb-24 pt-0">
            <div
                className="max-w-7xl mx-auto px-4 py-16 xl:py-24 bg-center bg-cover"
                style={{ backgroundImage: "url(/assets/site/about/map.svg)" }}
            >
                <div className="max-w-3xl mx-auto text-center">
                    <SectionHeader
                        preTitle="Where We’re From"
                        title="Rooted in South Africa. Connected to the World."
                        markedWord="Connected to the World"
                        desc={`${AppSettings.COMPANY_NAME} is proudly based in South Africa, where we design and develop modern digital solutions for businesses of all sizes. From our home base to clients around the world, we bring the same thoughtful approach to every project.`}
                    />

                    <div className="flex gap-8 text-left justify-center mt-10">
                        {/* South Africa Card */}
                        <div className="bg-white dark:bg-neutral-900 border border-dashed rounded-sm p-6">
                            <div className="mb-6">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <img
                                        src="/assets/site/about/SouthAfricaFlag.svg"
                                        alt="South Africa Flag"

                                        className="object-cover"


                                    />
                                </div>
                            </div>
                            <h6 className="font-semibold text-lg mb-4">
                                <a href="#" className="hover:text-primary transition">
                                    South Africa
                                </a>
                            </h6>
                            <ul className="space-y-4 text-sm text-[#606261] dark:text-[#c4c5c7]">
                                <li className="flex items-start gap-2">
                                    <MapPin size={18} className="mt-1" />
                                    {AppSettings.CompanyContacts.Address}
                                </li>
                                <li className="flex items-start gap-2">
                                    <Headphones size={18} className="mt-1" />
                                    Call: {AppSettings.CompanyContacts.Phone}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MapSection;
