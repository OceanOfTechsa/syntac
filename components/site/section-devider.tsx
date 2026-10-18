import {
    Children,
    cloneElement,
    isValidElement,
    ReactNode,
} from "react";

interface SectionProps {
    "data-divider"?: boolean;
}

const Divider = () => (
    <div className="relative z-20 w-full opacity-100 transition-opacity duration-1000">
        {/*width for the bottom div was changed to w-full from -> w-[1905px]*/}
        <div className="absolute left-1/2 h-px w-full 2xl:w-[1905px] -translate-x-1/2">
            <hr className="-mb-px w-full border-dashed" />

            <div className="relative mx-auto h-px w-full max-w-350 max-[1429px]:overflow-hidden min-[1800px]:max-w-384">
                <span className="absolute top-1/2 left-0 z-[50] size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xs border border-primary/20 bg-muted" />

                <span className="absolute top-1/2 right-0 z-[50] size-2.5 translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xs border border-primary/20 bg-muted" />
            </div>
        </div>
    </div>
);

interface SectionDividerProps {
    children: ReactNode;
}

const SectionDivider = ({ children }: SectionDividerProps) => {
    return (
        <>
            {Children.map(children, (child) => {
                if (!isValidElement<SectionProps>(child)) {
                    return child;
                }

                const hasDivider = child.props["data-divider"];

                return (
                    <div className="contents">
                        {cloneElement(child, {
                            "data-divider": undefined,
                        })}

                        {hasDivider && <Divider />}
                    </div>
                );
            })}
        </>
    );
};

export default SectionDivider;