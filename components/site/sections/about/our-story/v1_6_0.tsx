import TimelineItem from "@/components/site/shared/time-line-item";
import ApproachProcess from "@/components/site/sections/about/our-story/approach-process";

function V1_6_0() {
    return (
        <div>
            <TimelineItem date="2025" version="Client Engagement">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            A Better Way of Working
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            As our experience grew, so did the way we worked
                            with clients.
                        </p>
                    </div>

                    <ApproachProcess />

                    <p className="text-muted-foreground">
                        We became more intentional about collaboration,
                        understanding the problem before deciding what should
                        be built and keeping clients involved throughout the
                        process.
                    </p>

                    <p className="text-muted-foreground">
                        This helped shape the approach we still follow today:
                        listen first, plan carefully, build thoughtfully, and
                        keep the people we're building for involved along the
                        way.
                    </p>
                </div>
            </TimelineItem>
        </div>
    );
}

export default V1_6_0;