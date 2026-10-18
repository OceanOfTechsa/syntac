import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

type AccordionItem = {
    type: string
    items: string[]
    badges?: string[]
}

type BadgeAccordionProps = {
    data: AccordionItem[]
}

const BadgeAccordion = ({ data }: BadgeAccordionProps) => {

    const getBadgeProps = (type: string) => {
        switch (type) {
            case "whats-new":
                return {
                    className:
                        "border-none h-6 rounded-sm bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5",
                    dotColor: "bg-green-600 dark:bg-green-400",
                    label: "What's New",
                };

            case "changes":
                return {
                    className:
                        "border-none h-6 rounded-sm bg-sky-600/10 text-sky-600 focus-visible:ring-sky-600/20 focus-visible:outline-none dark:bg-sky-400/10 dark:text-sky-400 dark:focus-visible:ring-sky-400/40 [a&]:hover:bg-sky-600/5 dark:[a&]:hover:bg-sky-400/5",
                    dotColor: "bg-sky-600 dark:bg-sky-400",
                    label: "Changes",
                };

            case "outcomes":
                return {
                    className:
                        "border-none h-6 rounded-sm bg-violet-600/10 text-violet-600 focus-visible:ring-violet-600/20 focus-visible:outline-none dark:bg-violet-400/10 dark:text-violet-400 dark:focus-visible:ring-violet-400/40 [a&]:hover:bg-violet-600/5 dark:[a&]:hover:bg-violet-400/5",
                    dotColor: "bg-violet-600 dark:bg-violet-400",
                    label: "Outcomes",
                };

            case "what-we-learned":
                return {
                    className:
                        "border-none h-6 rounded-sm bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 focus-visible:outline-none dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5",
                    dotColor: "bg-amber-600 dark:bg-amber-400",
                    label: "What We Learned",
                };

            case "focus":
                return {
                    className:
                        "border-none h-6 rounded-sm bg-orange-600/10 text-orange-600 focus-visible:ring-orange-600/20 focus-visible:outline-none dark:bg-orange-400/10 dark:text-orange-400 dark:focus-visible:ring-orange-400/40 [a&]:hover:bg-orange-600/5 dark:[a&]:hover:bg-orange-400/5",
                    dotColor: "bg-orange-600 dark:bg-orange-400",
                    label: "Our Focus",
                };

            case "milestone":
                return {
                    className:
                        "border-none h-6 rounded-sm bg-[#0B9944]/10 text-[#0B9944] focus-visible:ring-[#0B9944]/20 focus-visible:outline-none dark:bg-[#0B9944]/15 dark:text-[#35C76A] dark:focus-visible:ring-[#35C76A]/30 [a&]:hover:bg-[#0B9944]/5 dark:[a&]:hover:bg-[#35C76A]/5",
                    dotColor: "bg-[#0B9944] dark:bg-[#35C76A]",
                    label: "Milestone",
                };

            default:
                return {
                    className:
                        "border-none h-6 rounded-sm bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 focus-visible:outline-none dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5",
                    dotColor: "bg-green-600 dark:bg-green-400",
                    label: "What's New",
                };
        }
    };

    return (
        <Accordion  className='-mt-4 mb-0 w-full' defaultValue={['item-1']}>
            {data.map((item, index) => {
                const badgeProps = getBadgeProps(item.type)

                return (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className='px-0 hover:no-underline [&>svg]:size-6!'>
                            <Badge className={badgeProps.className}>{badgeProps.label}</Badge>
                        </AccordionTrigger>
                        <AccordionContent className='text-muted-foreground'>
                            <ul className='text-muted-foreground list-inside list-disc space-y-3 text-sm'>
                                {item.items.map((listItem, listIndex) => (
                                    <li key={listIndex}>{listItem}</li>
                                ))}
                            </ul>
                            {item.badges && (
                                <div className='mt-4 flex flex-wrap items-center gap-2'>
                                    {item.badges.map((badge, badgeIndex) => (
                                        <div key={badgeIndex} className='bg-primary/10 text-destructive rounded-md px-3 py-1 text-xs'>
                                            {badge}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export default BadgeAccordion
