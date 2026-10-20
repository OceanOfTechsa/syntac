import React from "react";
import { Link, Text, Hr } from 'react-email';

import {formatList} from "@/lib/emails/list-format";
import { EmailLayout } from '@/app/emails/EmailLayout';
import {ContactSubmission} from "@/components/site/forms/shemas/contact-schema";


interface ContactStaffEmailProps {
    submission: ContactSubmission;
    /** Optional link to the submission in admin / CRM */
    adminUrl?: string;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <Text className="font-14 text-fg-2 mt-0 mb-3 text-left">
            <strong className="text-fg">{label}:</strong>{' '}
            <span className="text-fg-2">{value}</span>
        </Text>
    );
}

export const ContactStaffEmail = ({ submission, adminUrl }: ContactStaffEmailProps) => {
    const isProject = submission.enquiryType === 'project';

    return (
        <EmailLayout
            preview={`New ${isProject ? 'project enquiry' : 'general enquiry'} from ${submission.name}`}
            title={`New ${isProject ? 'project enquiry' : 'general enquiry'}`}
        >
            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                A new contact form submission was received on the website.
            </Text>

            {/* Contact details */}
            <Text className="font-13 text-fg-3 mt-0 mb-2 text-left uppercase tracking-wide">
                Contact
            </Text>
            <Row label="Name" value={submission.name} />
            <Row
                label="Email"
                value={
                    <Link
                        href={`mailto:${submission.email}`}
                        className="text-brand no-underline"
                    >
                        {submission.email}
                    </Link>
                }
            />
            {submission.company ? (
                <Row label="Company" value={submission.company} />
            ) : null}
            <Row
                label="Enquiry type"
                value={isProject ? 'Project' : 'General'}
            />

            <Hr className="border-stroke my-5" />

            {isProject ? (
                <>
                    <Text className="font-13 text-fg-3 mt-0 mb-2 text-left uppercase tracking-wide">
                        Project
                    </Text>
                    <Row
                        label="Services"
                        value={formatList([...submission.services])}
                    />
                    <Row label="Budget" value={submission.budget} />
                    <Row label="Timeline" value={submission.timeline} />

                    <Text className="font-14 text-fg-2 mt-0 mb-1 text-left">
                        <strong className="text-fg">Project description:</strong>
                    </Text>
                    <Text className="font-14 text-fg-2 mt-0 mb-0 text-left whitespace-pre-wrap">
                        {submission.projectDescription}
                    </Text>
                </>
            ) : (
                <>
                    <Text className="font-13 text-fg-3 mt-0 mb-2 text-left uppercase tracking-wide">
                        Message
                    </Text>
                    <Row label="Subject" value={submission.subject} />

                    <Text className="font-14 text-fg-2 mt-0 mb-1 text-left">
                        <strong className="text-fg">Message:</strong>
                    </Text>
                    <Text className="font-14 text-fg-2 mt-0 mb-0 text-left whitespace-pre-wrap">
                        {submission.message}
                    </Text>
                </>
            )}

            {adminUrl ? (
                <Text className="font-14 text-fg-2 mt-6 mb-0 text-left">
                    <Link href={adminUrl} className="text-brand no-underline">
                        Open submission
                    </Link>
                </Text>
            ) : null}
        </EmailLayout>
    );
};

ContactStaffEmail.PreviewProps = {
    adminUrl: 'https://syntac.co.za/admin/contact/demo-001',
    submission: {
        enquiryType: 'project',
        name: 'Thabo Molefe',
        email: 'thabo.molefe@example.co.za',
        company: 'Molefe Logistics',
        services: ['Custom Software', 'Support & Maintenance'],
        projectDescription:
            'We need an internal system for sales, stock and invoicing, plus ongoing support after launch. Currently everything lives in spreadsheets and a legacy desktop app.',
        budget: 'R50,000 – R100,000',
        timeline: '1 – 3 months',
    },
} satisfies ContactStaffEmailProps;

export default ContactStaffEmail;