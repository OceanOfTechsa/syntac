import { Text } from 'react-email';
import AppSettings from '@/utils/AppSettings';
import {formatList} from "@/lib/emails/list-format";
import { EmailLayout } from '@/app/emails/EmailLayout';
import { type EstimatorAnswers, type Estimate, type AnswerSummary, type ServiceDefinition, type ServiceCopy, describeAnswers, getService} from '@/components/site/forms/shemas/estimate-schema';

interface TextOnlyEmailProps {
    answers: EstimatorAnswers;
    estimate: Estimate;
    clientName: string;
    url?: string;
}

export const TextOnlyEmail = ({ answers, estimate, clientName }: TextOnlyEmailProps) => {
    const summary: AnswerSummary = describeAnswers(answers);
    const service: ServiceDefinition | undefined = getService(answers.service);
    const copy: ServiceCopy | undefined = service?.copy;

    const involvesList: string = formatList([
        ...summary.involves,
        ...(summary.involvesOther ? [summary.involvesOther] : []),
    ]);

    const featuresList: string = formatList([
        ...summary.features,
        ...(summary.featuresOther ? [summary.featuresOther] : []),
    ]);

    const rangeText: string =
        estimate.low === estimate.high
            ? `~${estimate.low}`
            : `~${estimate.low} – ${estimate.high}`;

    const unit: string = copy?.unit ?? 'Development days';
    const estimateLabel: string = copy?.estimateLabel ?? 'Estimated development time';

    return (
        <EmailLayout
            preview={`Your project estimate from ${AppSettings.COMPANY_NAME}`}
            title={`Your project estimate from ${AppSettings.COMPANY_NAME}`}
        >
            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                Hi {clientName},
            </Text>

            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                Thank you for sharing your project details with us. Based on the
                information you provided, here is a summary of your requirements.
                You’re looking for a <strong>{summary.service}</strong>
                {involvesList ? (
                    <>
                        {' '}
                        with <strong>{involvesList}</strong>
                    </>
                ) : null}
                .
            </Text>

            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                Your project is currently at the <strong>{summary.stage}</strong>{' '}
                stage, and you’re looking for <strong>{summary.engagement}</strong>{' '}
                support from us
                {featuresList ? (
                    <>
                        , including <strong>{featuresList}</strong>
                    </>
                ) : null}
                .
            </Text>

            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                {estimateLabel}{' '}
                <strong className="text-fg">{rangeText}</strong> {unit}.
            </Text>

            <Text
                className="font-11 text-fg-3 mt-6 mb-0 text-left italic"
                style={{ fontStyle: 'italic' }}
            >
                Please note: This estimate is an initial indication based on the
                information you’ve provided and is intended to help you plan your
                project. The final timeline will depend on the confirmed scope,
                detailed requirements, integrations, design decisions, review cycles,
                and any changes agreed upon during development. Once we’ve discussed
                your requirements in more detail, we can provide a more accurate
                assessment tailored to your project.
            </Text>
        </EmailLayout>
    );
};

TextOnlyEmail.PreviewProps = {
    clientName: 'Unathi Zulu',
    url: 'https://syntac.co.za/estimate',
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
} satisfies TextOnlyEmailProps;

export default TextOnlyEmail;