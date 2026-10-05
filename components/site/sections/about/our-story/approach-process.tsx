import React from 'react';
import { Ear, ClipboardList, Braces, Users } from 'lucide-react';

const steps = [
    { id: 1, title: 'Listen first', Icon: Ear },
    { id: 2, title: 'Plan carefully', Icon: ClipboardList },
    { id: 3, title: 'Build thoughtfully', Icon: Braces },
    { id: 4, title: 'Keep people involved', Icon: Users },
];

function StepBadge({ Icon }: {Icon: any}) {
    return (
        <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                 bg-gray-900 text-white ring-4 ring-gray-900/5
                 dark:bg-white dark:text-gray-900 dark:ring-white/10"
        >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
        </div>
    );
}

export default function ApproachProcess() {
    return (
        <section className="mx-auto py-10 w-full">
            {/* Desktop */}
            <ol className="hidden items-start md:flex">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <li className="flex w-20 shrink-0 flex-col items-center text-center">
                            <StepBadge Icon={step.Icon} />
                            <span className="mt-3 text-xs font-medium leading-snug">
                                {step.title}
                              </span>
                        </li>

                        {index < steps.length - 1 && (
                            <li
                                aria-hidden="true"
                                className="flex h-10 flex-1 items-center px-2"
                            >
                                <div className="w-full border-t border-dashed" />
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ol>

            {/* Mobile */}
            <ol className="flex flex-col md:hidden gap-5">
                {steps.map((step, index) => (
                    <li key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <StepBadge Icon={step.Icon} />
                            {/*{index < steps.length - 1 && (*/}
                            {/*    <div*/}
                            {/*        aria-hidden="true"*/}
                            {/*        className="my-2 w-px flex-1 border-l-2 border-dashed border-gray-300 dark:border-gray-600"*/}
                            {/*    />*/}
                            {/*)}*/}
                        </div>
                        <span
                            className={`pt-2 text-sm font-medium text-gray-800 dark:text-gray-200 ${
                                index < steps.length - 1 ? 'pb-6' : ''
                            }`}
                        >
              {step.title}
            </span>
                    </li>
                ))}
            </ol>
        </section>
    );
}