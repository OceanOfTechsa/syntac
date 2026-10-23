import { Resend } from 'resend';
import AppSettings from '@/utils/AppSettings';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendArgs = {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
};

export async function SendEmail({ to, subject, html, replyTo }: SendArgs) {
    // const from = process.env.FROM_EMAIL || `${AppSettings.COMPANY_NAME} <${AppSettings.CompanyContacts.Email}>`;
    const from = "delivered@resend.dev";

    const { data, error } = await resend.emails.send({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        replyTo,
    });

    if (error) {
        throw new Error(error.message ?? 'Failed to send email');
    }

    return data;
}

export const STAFF_INBOX = AppSettings.CompanyContacts.Email;