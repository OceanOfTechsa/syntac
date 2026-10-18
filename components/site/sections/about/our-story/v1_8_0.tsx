import { accordionDataV1_8_0} from "@/data/changelog-data";
import TimelineItem from "@/components/site/shared/time-line-item";
import BadgeAccordion from "@/components/site/shared/badge-accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function V1_8_0() {
    const teamMembers = [
        {
            name: "Malibongwe Sibisi",
            role: "Designer",
            initials: "MS",
            image: "https://ik.imagekit.io/syntac/Syntac%20team/tr:w-300,h-300,fo-face:r-max/malibongwe.webp",
        },
        {
            name: "Ntokozo Juqu",
            role: "Designer",
            initials: "NJ",
            image: "https://ik.imagekit.io/syntac/Syntac%20team/tr:w-250,h-250,fo-face:r-max/juqu.webp",
        },
        {
            name: "Sthembiso Ncwane",
            role: "Software Developer",
            initials: "SN",
            image: "https://ik.imagekit.io/syntac/Syntac%20team/tr:w-400,h-400,fo-face:r-max/sthembiso.jpeg",
        },
        {
            name: "Asiphe Khuboni",
            role: "Technical Support",
            initials: "AK",
            image: "https://ik.imagekit.io/syntac/Syntac%20team/tr:w-1000,h-1000,fo-face:r-max/asiphek.jpeg",
        },
    ];

    return (
        <div>
            <TimelineItem
                date="February, 2026 - November, 2026"
                version="Growing the Team"
            >
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            Growing the Team
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            As the company continued to grow, new team members
                            joined with different skills and perspectives,
                            strengthening the foundation we were building
                            together.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="flex min-w-20 flex-col gap-2"
                            >
                                <Avatar size="lg">
                                    <AvatarImage
                                        src={member.image}
                                        alt={member.name}
                                    />
                                    <AvatarFallback>
                                        {member.initials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="space-y-0.5">
                                    <p className="text-xs font-semibold">
                                        {member.name}
                                    </p>

                                    <p className="text-muted-foreground text-xs">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-muted-foreground">
                        With design, development, and technical support
                        capabilities growing alongside the team, we became
                        better equipped to take on a wider range of projects
                        and build more complete digital solutions.
                    </p>

                    <p className="text-muted-foreground">
                        Each new addition brought valuable expertise while
                        helping shape the team behind SYNTAC.
                    </p>

                    <BadgeAccordion data={accordionDataV1_8_0} />
                </div>
            </TimelineItem>
        </div>
    );
}

export default V1_8_0;
