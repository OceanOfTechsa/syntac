import TimelineItem from "@/components/site/shared/time-line-item";

function V1_1_0() {
    return (
        <div>
            <TimelineItem date="2021" version="The Beginning">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            The Idea Begins
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            While at university, a growing passion for technology
                            led to a simple question: what if technology could be
                            used to solve real problems for people and businesses?
                        </p>
                    </div>

                    <img
                        src="/assets/site/about/work-with-us/image-4.webp"
                        alt="The beginning of the idea behind SYNTAC"
                        className="dark:hidden w-50 rounded-lg border object-cover"
                    />
                    <img
                        src="/assets/site/about/work-with-us/image-4-dark.webp"
                        alt="The beginning of the idea behind SYNTAC"
                        className="w-68 rounded-lg border object-cover hidden dark:block"
                    />

                    <p className="text-muted-foreground">
                        What started as an interest in software development became
                        something bigger — the idea of building useful technology
                        around real-world challenges rather than simply building
                        software for the sake of it.
                    </p>

                    <p className="text-muted-foreground">
                        This idea would eventually become the foundation for
                        everything that followed.
                    </p>
                </div>
            </TimelineItem>
        </div>
    );
}

export default V1_1_0;
