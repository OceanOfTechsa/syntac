import Link from "next/link";
import TimelineItem from "@/components/site/shared/time-line-item";
import {ButtonLikeLink} from "@/components/site/shared-classes";

function Last() {
    return (
        <div>
            <TimelineItem date="Today" version="Where we are">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            Building What Comes Next
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            Today, SYNTAC brings together everything we have
                            learned along the way — from websites and digital
                            experiences to custom software and business systems.
                        </p>
                    </div>

                    {/*<img*/}
                    {/*    src="/assets/site/about/our-story/today.webp"*/}
                    {/*    alt="SYNTAC today"*/}
                    {/*    className="w-full rounded-lg border object-cover"*/}
                    {/*/>*/}

                    <p className="text-muted-foreground">
                        We continue to build technology around the goals,
                        challenges, and opportunities of the businesses we work
                        with.
                    </p>

                    <p className="text-muted-foreground">
                        The name has changed. The technology has evolved.
                        But the idea that started it all remains the same:
                        building technology that solves meaningful problems.
                    </p>


                    <Link href="/contact"
                        className={ButtonLikeLink}
                    >
                        Start a conversation
                    </Link>

                </div>
            </TimelineItem>
        </div>
    );
}

export default Last;
