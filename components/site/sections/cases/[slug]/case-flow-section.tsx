import React from 'react'
import {FlowChain, FlowItem, FlowSection} from "@/components/site/shared/flow-diagram";

const CaseFlowSection = () => {
    return (
        <FlowSection direction="horizontal" preTitle="System Map" title="How the Platform Fits Together" markedWord="Fits">
            <FlowChain items={[{label: "Start", variant: "start"}, {label: "Home", variant: "gate"}]}>
                <FlowItem label="About us" variant="gate" >
                    <FlowItem label="About" variant="page" />
                    <FlowItem label="Our Story" variant="page" />
                    <FlowItem label="Our Team" variant="page" />
                </FlowItem>
                <FlowItem label="Services" variant="page">
                    <FlowItem label="Service Details" variant="detail" />
                </FlowItem>
                <FlowItem label="Cases" variant="page">
                    <FlowItem label="Case Study Details" variant="detail" />
                </FlowItem>
                <FlowItem label="How we work" variant="page" />
                <FlowItem label={'Legal'} variant={'gate'}>
                    <FlowItem label="Public Offer Aggrement" variant="page" />
                    <FlowItem label="Privacy Policy" variant="page" />
                    <FlowItem label="Use of AI" variant="page" />
                </FlowItem>
                <FlowItem label={'Resources'} variant={'gate'}>
                    <FlowItem label="Blog" variant="page" >
                        <FlowItem label="Blog Details" variant="detail" />
                    </FlowItem>
                    <FlowItem label="Change Log" variant="page" />
                    <FlowItem label="FAQ" variant="page" />
                </FlowItem>
                <FlowItem label="Estimate project" variant="cta" />
            </FlowChain>
        </FlowSection>
    )
}
export default CaseFlowSection
