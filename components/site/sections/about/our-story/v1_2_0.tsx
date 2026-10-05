import TimelineItem from "@/components/site/shared/time-line-item";
import BadgeAccordion from "@/components/site/shared/badge-accordion";
import { accordionDataV1_2_0 } from "@/data/changelog-data";

function V1_2_0() {
    return (
        <div>
            <TimelineItem date="2021" version="Ocean of Tech">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            Ocean of Tech
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            The idea became a business under the name Ocean of
                            Tech, starting with website development and helping
                            businesses establish their presence online.
                        </p>
                    </div>

                    <p className="text-muted-foreground">
                        Building websites gave us our first opportunity to work
                        with real client needs. It taught us that good technology
                        starts with understanding the people and businesses it is
                        built for.
                    </p>

                    <p className="text-muted-foreground">
                        It was the beginning of a journey that would eventually
                        take us far beyond websites.
                    </p>

                    <BadgeAccordion data={accordionDataV1_2_0} />
                </div>
            </TimelineItem>
        </div>
    );
}

export default V1_2_0;