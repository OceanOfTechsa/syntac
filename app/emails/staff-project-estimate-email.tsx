import { Link, Text, Hr } from 'react-email';
import { EmailLayout } from '@/app/emails/EmailLayout';
import {
    type EstimatorAnswers,
    type Estimate,
    describeAnswers,
    getService,
} from '@/components/site/forms/shemas/estimate-schema';
import React from "react";

interface StaffEstimateEmailProps {
    /** Form answers from the estimator */
    answers: EstimatorAnswers;
    /** Pre-computed range from estimateDays() */
    estimate: Estimate;
    /** Client name from the contact step */
    clientName: string;
    /** Client email from the contact step */
    clientEmail: string;
    /** Optional free-text details the client left */
    details?: string;
    /** Optional link to the submission / CRM record */
    adminUrl?: string;
}

/** "A, B & C" */
function formatList(items: string[]): string {
    const cleaned = items.map((s) => s.trim()).filter(Boolean);
    if (cleaned.length === 0) return '—';
    if (cleaned.length === 1) return cleaned[0];
    if (cleaned.length === 2) return `${cleaned[0]} & ${cleaned[1]}`;
    return `${cleaned.slice(0, -1).join(', ')} & ${cleaned[cleaned.length - 1]}`;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <Text className="font-14 text-fg-2 mt-0 mb-3 text-left">
            <strong className="text-fg">{label}:</strong>{' '}
            <span className="text-fg-2">{value}</span>
        </Text>
    );
}

export const StaffEstimateEmail = ({
                                       answers,
                                       estimate,
                                       clientName,
                                       clientEmail,
                                       details,
                                       adminUrl,
                                   }: StaffEstimateEmailProps) => {
    const summary = describeAnswers(answers);
    const service = getService(answers.service);
    const copy = service?.copy;

    const involvesList = formatList([
        ...summary.involves,
        ...(summary.involvesOther ? [`Other: ${summary.involvesOther}`] : []),
    ]);

    const featuresList = formatList([
        ...summary.features,
        ...(summary.featuresOther ? [`Other: ${summary.featuresOther}`] : []),
    ]);

    const rangeText =
        estimate.low === estimate.high
            ? `~${estimate.low}`
            : `~${estimate.low} – ${estimate.high}`;

    const unit = copy?.unit ?? 'development days';
    const estimateLabel = copy?.estimateLabel ?? 'Estimated development time';

    return (
        <EmailLayout
            preview={`New estimate request from ${clientName}`}
            title="New estimate request"
        >
            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                A new project estimate was submitted via the website. Summary below.
            </Text>

            {/* Client */}
            <Text className="font-13 text-fg-3 mt-0 mb-2 text-left uppercase tracking-wide">
                Client
            </Text>
            <Row label="Name" value={clientName} />
            <Row
                label="Email"
                value={
                    <Link href={`mailto:${clientEmail}`} className="text-brand no-underline">
                        {clientEmail}
                    </Link>
                }
            />

            <Hr className="border-stroke my-5" />

            {/* Project */}
            <Text className="font-13 text-fg-3 mt-0 mb-2 text-left uppercase tracking-wide">
                Project
            </Text>
            <Row label="Service" value={summary.service} />
            <Row label="Scope / involves" value={involvesList} />
            <Row label="Stage" value={summary.stage} />
            <Row label="Engagement" value={summary.engagement} />
            <Row label="Features" value={featuresList} />

            <Hr className="border-stroke my-5" />

            {/* Estimate */}
            <Text className="font-13 text-fg-3 mt-0 mb-2 text-left uppercase tracking-wide">
                Indicative estimate
            </Text>
            <Text className="font-14 text-fg-2 mt-0 mb-3 text-left">
                <strong className="text-fg">{estimateLabel}:</strong>{' '}
                <strong className="text-fg">
                    {rangeText} {unit}
                </strong>
            </Text>
            <Text className="font-11 text-fg-3 mt-0 mb-0 text-left italic" style={{ fontStyle: 'italic' }}>
                Indicative only — final scope depends on requirements, integrations,
                design decisions, feedback rounds, and changes along the way.
            </Text>

            {details?.trim() ? (
                <>
                    <Hr className="border-stroke my-5" />
                    <Text className="font-13 text-fg-3 mt-0 mb-2 text-left uppercase tracking-wide">
                        Additional details from client
                    </Text>
                    <Text className="font-14 text-fg-2 mt-0 mb-0 text-left whitespace-pre-wrap">
                        {details.trim()}
                    </Text>
                </>
            ) : null}

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

StaffEstimateEmail.PreviewProps = {
    clientName: 'Thabo Molefe',
    clientEmail: 'thabo.molefe@example.co.za',
    details:
        'We currently run sales and stock on spreadsheets and a legacy desktop app. We need a single system for sales, orders, invoicing, a supplier portal, and document approvals. Priority is getting off spreadsheets within 6–9 months. We already have process maps for sales and warehouse; finance workflows still need defining.',
    adminUrl: 'https://syntac.co.za/admin/estimates/demo-001',
    answers: {
        service: 'custom-software',
        involves: ['sales', 'orders', 'finance', 'documents', 'portal'],
        involvesOther:
            'Need basic multi-warehouse stock levels and a simple delivery schedule view for the warehouse team',
        stage: 'requirements',
        engagement: 'design-dev',
        features: [
            'rbac',
            'workflows',
            'reporting',
            'integrations',
            'notifications',
            'migration',
        ],
        featuresOther:
            'Integration with our existing Sage accounting package and WhatsApp order notifications for customers',
    },
    estimate: { low: 210, high: 285 },
};

export default StaffEstimateEmail;