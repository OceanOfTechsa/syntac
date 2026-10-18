"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamMemberImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  priority?: boolean;
}

const TeamMemberImage = ({
                           src,
                           fallbackSrc,
                           alt,
                           priority = false,
                         }: TeamMemberImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 639px) 100vw, (max-width: 767px) 275px, (max-width: 1279px) 275px, 275px"
      quality={100}
      priority={priority}
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
      }}
      className="h-full w-full transform object-cover transition-transform duration-800 ease-in-out group-hover:scale-104"
    />
  );
};

export default TeamMemberImage;
