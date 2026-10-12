import React from 'react'

import type {CaseStudy} from "@/utils/Site/case-studies";
import {FlowSection} from "@/components/site/shared/flow-diagram";

interface ICaseFlowSectionProps {
    study: CaseStudy
}

const CaseFlowSection = ({study}: ICaseFlowSectionProps) => {
    const {flow} = study;
    if (!flow) return null;

    // Anything the case leaves out falls back to the FlowSection defaults
    return (
        <FlowSection
            flow={flow.root}
            direction={flow.direction}
            preTitle={flow.preTitle}
            title={flow.title}
            markedWord={flow.markedWord}
            desc={flow.desc}
        />
    )
}
export default CaseFlowSection