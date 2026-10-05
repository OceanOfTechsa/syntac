import TimelineItem from "@/components/site/shared/time-line-item";
import BadgeAccordion from "@/components/site/shared/badge-accordion";
import { accordionDataV1_3_0 } from "@/data/changelog-data";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

function V1_3_0() {
    return (
        <div>
            <TimelineItem date="2022" version="Growing the Team">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            Growing the Team
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            Sanele Jeza joined as co-founder and developer,
                            turning what had started as an individual idea into
                            a shared vision.
                        </p>
                    </div>

                    <div className={'flex flex-col gap-2'}>
                      <Avatar size="lg">
                        <AvatarImage src="/assets/site/team/sanele.jpeg" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <p className={'text-xs font-semibold'}>Sanele Jeza</p>
                    </div>

                    <p className="text-muted-foreground">
                        With two developers working toward the same goal, we
                        began taking on more ambitious projects and exploring
                        what the company could become.
                    </p>

                    <p className="text-muted-foreground">
                        The foundation of the team behind SYNTAC began to take
                        shape.
                    </p>

                    <BadgeAccordion data={accordionDataV1_3_0} />
                </div>
            </TimelineItem>
        </div>
    );
}

export default V1_3_0;
