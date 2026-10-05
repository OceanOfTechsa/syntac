import Link from "next/link";
import TimelineItem from "@/components/site/shared/time-line-item";
import {ExternalLink} from "lucide-react";
import {ButtonLikeLink} from "@/components/site/shared-classes";

function V1_4_0() {
    return (
        <div>
            <TimelineItem date="2022 — 2025" version="Projects">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            Learning Through Real Projects
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            Real projects gave us a deeper understanding of what
                            businesses actually need from technology.
                        </p>
                    </div>

                    <img
                        src="https://res.cloudinary.com/lbge76mf/image/upload/v1790123127/showcase-2-light.png"
                        alt="Enoway project"
                        className="w-full rounded-lg border object-cover"
                    />

                    <p className="text-muted-foreground">
                        Projects such as Enoway helped shape our direction. We
                        began looking beyond individual pages and features and
                        started thinking more carefully about the problems
                        technology needed to solve.
                    </p>

                    <p className="text-muted-foreground">
                        Every project brought new lessons, new challenges, and a
                        better understanding of what it means to build technology
                        for a real business.
                    </p>


                        <Link href="/cases"
                              className={ButtonLikeLink}
                        >
                            View Projects <ExternalLink />
                        </Link>

                </div>
            </TimelineItem>
        </div>
    );
}

export default V1_4_0;