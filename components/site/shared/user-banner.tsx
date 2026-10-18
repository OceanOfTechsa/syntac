import React from 'react'
import Link from "next/link";
import Image from "next/image";

interface IUserBannerProps {
    image: string
    fullName: string
    linkedInUrl?: string
    xUrl?: string
    role: string
    className?: string
}

const UserBanner = ({image, fullName = 'Unknown', linkedInUrl, xUrl, role, className = 'flex grow items-center justify-start gap-3'}: IUserBannerProps) => {
    return (
        <div className={className}>
            <span data-slot="avatar" data-size="default" className="group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 size-11 shadow-md">
                <Image data-slot="avatar-image" className="size-full object-cover"
                    alt={fullName}
                    width={200}
                    height={200}
                    src={image}
                    priority={false}
                    quality={100}
                />
            </span>
            <div className="flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-4">
                    <h3 className="font-semibold">{fullName}</h3>
                    <div className="flex items-center gap-2">
                        {xUrl && (
                            <Link target="_blank" rel="noopener noreferrer" className="not-hover:text-muted-foreground" href={xUrl}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                                     className="size-4">
                                    <path fill="currentColor"
                                          d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                                </svg>
                                <span className="sr-only">X</span>
                            </Link>
                        )}
                        {linkedInUrl && (
                            <Link target="_blank" rel="noopener noreferrer" className="not-hover:text-muted-foreground" href={linkedInUrl}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" aria-hidden="true" className="size-4">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"> </path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        )}
                    </div>
                </div>
                <p className="text-muted-foreground text-sm">{role}</p>
            </div>
        </div>
    )
}
export default UserBanner;
