import { NextResponse } from 'next/server';
import { z } from 'zod';
import { render } from '@react-email/render';
import {
    EstimatorSchema,
    estimateDays,
    type EstimatorAnswers,
} from '@/components/site/forms/shemas/estimate-schema';

import AppSettings from '@/utils/AppSettings';
import {SendEmail, STAFF_INBOX} from "@/lib/emails/send";
import StaffEstimateEmail from "@/app/emails/staff-project-estimate-email";
import TextOnlyEmail from "@/app/emails/client-project-estimate-email";

export const runtime = 'nodejs';

/** Body = full form values (answers + contact). */
const EstimateLeadSchema = EstimatorSchema;

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const parsed = EstimateLeadSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            {
                error: 'Validation failed.',
                issues: parsed.error.flatten(),
            },
            { status: 400 }
        );
    }

    const data = parsed.data;

    const answers: EstimatorAnswers = {
        service: data.service,
        involves: data.involves,
        involvesOther: data.involvesOther ?? '',
        stage: data.stage,
        engagement: data.engagement,
        features: data.features,
        featuresOther: data.featuresOther ?? '',
    };

    const estimate = estimateDays(answers);

    try {
        const [clientHtml, staffHtml] = await Promise.all([
            render(
                TextOnlyEmail({
                    clientName: data.name,
                    answers,
                    estimate,
                })
            ),
            render(
                StaffEstimateEmail({
                    clientName: data.name,
                    clientEmail: data.email,
                    details: data.details,
                    answers,
                    estimate,
                })
            ),
        ]);

        await Promise.all([
            SendEmail({
                to: data.email,
                subject: `Your project estimate from ${AppSettings.COMPANY_NAME}`,
                html: clientHtml,
                replyTo: STAFF_INBOX,
            }),
            SendEmail({
                to: STAFF_INBOX,
                subject: `New estimate request from ${data.name}`,
                html: staffHtml,
                replyTo: data.email,
            }),
        ]);

        return NextResponse.json({
            ok: true,
            estimate, // optional: form can show the same numbers server confirmed
        });
    } catch (error) {
        console.error('[estimate email]', error);
        return NextResponse.json(
            { error: 'Unable to send email. Please try again.' },
            { status: 500 }
        );
    }
}