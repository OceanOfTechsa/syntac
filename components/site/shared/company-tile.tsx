import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Company } from "@/data/technology-spotlight-data";

interface CompanyTileProps {
    company: Company;
    className?: string;
}

/**
 * Logo tile with a text fallback. Logos are forced to one neutral colour
 * (black in light mode, white in dark mode) so mixed brand colours and
 * dark-on-dark logos never clash with the page.
 */
export const CompanyTile = ({ company, className }: CompanyTileProps) => (
    <div
        title={company.name}
        className={cn(
            "grid h-10 place-items-center rounded-sm border bg-background/80 px-4",
            className
        )}
    >
        {company.logo ? (
            <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={32}
                className="h-5 w-auto max-w-full object-contain brightness-0 dark:invert"
            />
        ) : (
            <span className="text-sm font-medium">{company.name}</span>
        )}
    </div>
);

export default CompanyTile;