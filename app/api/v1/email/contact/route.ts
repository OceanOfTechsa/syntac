import { NextResponse } from 'next/server';
import { render } from '@react-email/render';

import AppSettings from '@/utils/AppSettings';
import {SendEmail, STAFF_INBOX} from "@/lib/emails/send";
import ContactStaffEmail from "@/app/emails/contact-staff-email";
import ContactClientEmail from "@/app/emails/contact-client-email";
import {ContactSchema, type ContactSubmission,} from '@/components/site/forms/shemas/contact-schema';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            {
                error: 'Validation failed.',
                issues: parsed.error.flatten(),
            },
            { status: 400 }
        );
    }

    const submission: ContactSubmission = parsed.data;
    const isProject = submission.enquiryType === 'project';

    try {
        const [clientHtml, staffHtml] = await Promise.all([
            render(ContactClientEmail({ submission })),
            render(ContactStaffEmail({ submission })),
        ]);

        const clientSubject = isProject
            ? `We've received your project enquiry — ${AppSettings.COMPANY_NAME}`
            : `We've received your message — ${AppSettings.COMPANY_NAME}`;

        const staffSubject = isProject
            ? `New project enquiry from ${submission.name}`
            : `New general enquiry from ${submission.name}: ${submission.subject}`;

        // Send both; fail the request if either fails
        await Promise.all([
            SendEmail({
                to: submission.email,
                subject: clientSubject,
                html: clientHtml,
                replyTo: STAFF_INBOX,
            }),
            SendEmail({
                to: STAFF_INBOX,
                subject: staffSubject,
                html: staffHtml,
                replyTo: submission.email,
            }),
        ]);

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('[contact email]', error);
        return NextResponse.json(
            { error: 'Unable to send email. Please try again.' },
            { status: 500 }
        );
    }
}