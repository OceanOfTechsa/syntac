import React from 'react'
import Link from 'next/link';
import {Phone, MapPin, Mail} from "lucide-react";

import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const MapSection = () => {
    return (

        <section className="pb-16 xl:pb-24 pt-0">
            <div
                className=" mx-auto px-4 py-16 xl:py-24 bg-center bg-cover"
                style={{ backgroundImage: "url(/assets/site/about/map.svg)" }}
            >
                <div className=" mx-auto text-center">
                    <SectionHeader
                        preTitle="Where We’re From"
                        title="Rooted in South Africa. Connected to the World."
                        markedWord="Connected to the World"
                        desc={`${AppSettings.COMPANY_NAME} is proudly based in South Africa, where we design and develop modern digital solutions for businesses of all sizes. From our home base to clients around the world, we bring the same thoughtful approach to every project.`}
                    />

                    <div className="flex flex-wrap gap-8 text-left justify-center mt-10">
                        {/* South Africa Card */}
                        <div className="bg-white dark:bg-neutral-900 border border-dashed rounded-sm p-6">
                              <Avatar size="lg">
                                <AvatarImage
                                  src={'/assets/site/about/SouthAfricaFlag.svg'}
                                  alt={'SA Flag'}

                                />
                                <AvatarFallback>
                                  SA
                                </AvatarFallback>
                              </Avatar>
                            <p className="font-semibold text-sm mb-4 mt-1">South Africa, Durban</p>

                            <ul className="space-y-4 text-sm text-[#606261] dark:text-[#c4c5c7]">
                                <li className="flex items-center gap-2 hover:text-[#0B0F19">
                                    <Phone size={18} />
                                    <Link href={`tel:${AppSettings.CompanyContacts.Phone}`}>{AppSettings.CompanyContacts.Phone}</Link>
                                </li>
                                <li className="flex items-center gap-2 hover:text-[#0B0F19">
                                    <Mail size={18} />
                                    <Link href={`mailto:${AppSettings.CompanyContacts.Email}`}>{AppSettings.CompanyContacts.Email}</Link>
                                </li>
                                <li className="flex items-center gap-2 hover:text-[#0B0F19">
                                  <MapPin size={18} />
                                  <Link href={'https://share.google/zahG43f0OvkbSODqk'} target={'_blank'}>{AppSettings.CompanyContacts.Address}</Link>
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
