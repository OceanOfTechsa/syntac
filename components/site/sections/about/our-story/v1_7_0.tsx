import TimelineItem from "@/components/site/shared/time-line-item";
import BadgeAccordion from "@/components/site/shared/badge-accordion";
import { accordionDataV1_5_0 } from "@/data/changelog-data";
import AppSettings from "@/utils/AppSettings";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

function V1_7_0() {
    return (
        <div>
            <TimelineItem date="2026" version={AppSettings.COMPANY_NAME}>
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            Introducing SYNTAC
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            Ocean of Tech had grown beyond the identity we
                            started with. It was time for a name that better
                            represented where we were going.
                        </p>
                    </div>

                    <Avatar size={'lg'}>
                        <AvatarImage src="/brand/syntac-brand-kit/logos/icon/svg/syntac-icon-green-circle.svg" alt="@maxleiter" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2">
                        <img
                            src="/brand/syntac-brand-kit/presentation/syntac-brand-applications.png"
                            alt="SYNTAC brand applications"
                            className="w-52 rounded-lg border object-cover"
                        />
                        <img
                            src="/brand/syntac-brand-kit/presentation/syntac-brand-logo-system.png"
                            alt="SYNTAC logo system"
                            className="w-52 rounded-lg border object-cover"
                        />
                        <img
                            src="/brand/syntac-brand-kit/presentation/syntac-brand-presentation.png"
                            alt="SYNTAC brand presentation"
                            className="w-52 rounded-lg border object-cover"
                        />
                    </div>


                    <p className="text-muted-foreground">
                        SYNTAC was born from the idea of synchronising ideas
                        with technology — bringing business goals, creative
                        thinking, and engineering together.
                    </p>

                    <p className="text-muted-foreground">
                        The rebrand represents a broader vision: building a
                        company capable of working with businesses of different
                        sizes, both across South Africa and around the world.
                    </p>

                    <BadgeAccordion data={accordionDataV1_5_0} />
                </div>
            </TimelineItem>
        </div>
    );
}

export default V1_7_0;