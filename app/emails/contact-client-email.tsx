import { Text } from 'react-email';

import AppSettings from '@/utils/AppSettings';
import {formatList} from "@/lib/emails/list-format";
import { EmailLayout } from '@/app/emails/EmailLayout';
import {ContactSubmission} from "@/components/site/forms/shemas/contact-schema";

interface ContactClientEmailProps {
    submission: ContactSubmission;
}

export const ContactClientEmail = ({ submission }: ContactClientEmailProps) => {
    const { name, enquiryType } = submission;
    const isProject = enquiryType === 'project';

    return (
        <EmailLayout
            preview={`We've received your ${isProject ? 'project enquiry' : 'message'} — ${AppSettings.COMPANY_NAME}`}
            title={`We've received your ${isProject ? 'project enquiry' : 'message'}`}
        >
            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                Hi {name},
            </Text>

            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                Thank you for getting in touch with {AppSettings.COMPANY_NAME}. We&apos;ve
                received your {isProject ? 'project enquiry' : 'message'} and will get
                back to you as soon as we can.
            </Text>

            {isProject ? (
                <>
                    <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                        Here&apos;s a quick summary of what you shared:
                    </Text>

                    <Text className="font-14 text-fg-2 mt-0 mb-2 text-left">
                        <strong className="text-fg">Services:</strong>{' '}
                        {formatList([...submission.services])}
                    </Text>

                    {submission.company ? (
                        <Text className="font-14 text-fg-2 mt-0 mb-2 text-left">
                            <strong className="text-fg">Company:</strong> {submission.company}
                        </Text>
                    ) : null}

                    <Text className="font-14 text-fg-2 mt-0 mb-2 text-left">
                        <strong className="text-fg">Budget:</strong> {submission.budget}
                    </Text>

                    <Text className="font-14 text-fg-2 mt-0 mb-2 text-left">
                        <strong className="text-fg">Timeline:</strong> {submission.timeline}
                    </Text>

                    <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                        <strong className="text-fg">About your project:</strong>
                        <br />
                        {submission.projectDescription}
                    </Text>
                </>
            ) : (
                <>
                    <Text className="font-14 text-fg-2 mt-0 mb-2 text-left">
                        <strong className="text-fg">Subject:</strong> {submission.subject}
                    </Text>

                    {submission.company ? (
                        <Text className="font-14 text-fg-2 mt-0 mb-2 text-left">
                            <strong className="text-fg">Company:</strong> {submission.company}
                        </Text>
                    ) : null}

                    <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                        <strong className="text-fg">Your message:</strong>
                        <br />
                        {submission.message}
                    </Text>
                </>
            )}

            <Text className="font-14 text-fg-2 mt-0 mb-4 text-left">
                If you need to add anything in the meantime, just reply to this email.
            </Text>

            <Text
                className="font-11 text-fg-3 mt-6 mb-0 text-left italic"
                style={{ fontStyle: 'italic' }}
            >
                This is an automated confirmation. A member of the team will follow up
                with you shortly.
            </Text>
        </EmailLayout>
    );
};

ContactClientEmail.PreviewProps = {
    submission: {
        enquiryType: 'general',
        name: 'Thabo Molefe',
        email: 'thabo.molefe@example.co.za',
        company: 'Molefe Logistics',
        subject: 'Question about your support plans',
        message:
            'Do you offer ongoing maintenance for systems built by other providers? We have a small web app that needs monthly updates and monitoring.',
    }
} satisfies ContactClientEmailProps;

export default ContactClientEmail;