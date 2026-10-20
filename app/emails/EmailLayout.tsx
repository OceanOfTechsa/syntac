import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
    Row,
    Column,
} from 'react-email';
import { SyntacTailwindConfig } from '@/app/emails/theme';
import AppSettings from '@/utils/AppSettings';

const LOGO_URL = `${AppSettings.NEXT_PUBLIC_BASE_URL}${AppSettings.LOAD_LOGO(
    'icon',
    'svg',
    'syntac-icon-transparent',
    'svg'
)}`;

const YEAR = new Date().getFullYear();
const COMPANY_NAME = AppSettings.COMPANY_NAME;
const FULL_COMPANY_NAME = AppSettings.FULL_COMPANY_NAME;
const COMPANY_CONTACTS = AppSettings.CompanyContacts;
const COMPANY_URL = AppSettings.NEXT_PUBLIC_BASE_URL;

type EmailLayoutProps = {
    preview: string;
    children: React.ReactNode;
    /** Optional title shown above the body content */
    title?: string;
};

export function EmailLayout({ preview, children, title }: EmailLayoutProps) {
    return (
        <Html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="format-detection" content="telephone=no" />
            </Head>
            <Preview>{preview}</Preview>

            <Tailwind config={SyntacTailwindConfig}>
                <Body className="m-0 bg-bg p-0 font-sans">
                    {/* Outer wrapper */}
                    <Section className="bg-bg px-3 py-6">
                        {/* 660px card */}
                        <Container className="mx-auto max-w-email overflow-hidden bg-bg-2 shadow-card">
                            {/* Green accent bar */}
                            <Section
                                className="h-1.5 bg-brand"
                                style={{ fontSize: 0, lineHeight: 0 }}
                            >
                                &nbsp;
                            </Section>

                            {/* Header: logo + brand */}
                            <Section className="border-b border-stroke px-8 py-5">
                                <Row>
                                    <Column className="w-10 align-middle">
                                        <Img
                                            src={LOGO_URL}
                                            alt={`${FULL_COMPANY_NAME} logo`}
                                            width={38}
                                            height={38}
                                            className="block"
                                        />
                                    </Column>
                                    <Column className="pl-2.5 align-middle">
                                        <Text className="m-0 font-19 text-fg">
                                            {COMPANY_NAME}
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>

                            {/* Body content */}
                            <Section className="px-8 pb-3 pt-8 text-fg-2 font-14">
                                {title ? (
                                    <Text className="mb-4.5 mt-0 font-20 text-fg">
                                        {title}
                                    </Text>
                                ) : null}
                                {children}
                            </Section>

                            {/* Regards */}
                            <Section className="px-8 pb-7 pt-5 text-fg-2 font-14">
                                <Text className="m-0">Kind regards,</Text>
                                <Text className="mb-0 mt-1 font-bold">
                                    {FULL_COMPANY_NAME}
                                </Text>
                            </Section>

                            {/* Footer */}
                            <Section className="border-t border-stroke bg-bg-footer px-8 py-4.5 text-center">
                                <Row>
                                    <Column align="center">
                                        <Img
                                            src={LOGO_URL}
                                            alt={`${COMPANY_NAME} logo`}
                                            width={26}
                                            height={26}
                                            className="mr-1.5 inline-block align-middle"
                                        />
                                        <Text className="m-0 inline align-middle font-13 text-fg-3">
                                            {FULL_COMPANY_NAME}
                                        </Text>
                                    </Column>
                                </Row>

                                <Text className="mb-0 mt-2.5 font-11 text-fg-muted leading-[18px]">
                                    Developed by{' '}
                                    <Link
                                        href={COMPANY_URL}
                                        className="text-brand no-underline"
                                    >
                                        {FULL_COMPANY_NAME}
                                    </Link>{' '}
                                    &copy; {YEAR}
                                </Text>

                                <Text className="mb-0 mt-1.5 font-11 text-fg-muted leading-[18px]">
                                    {FULL_COMPANY_NAME}. {COMPANY_CONTACTS.Address}.
                                    {' '}Tel:{' '}
                                    <Link
                                        href={`tel:${COMPANY_CONTACTS.Phone.replace(/\s/g, '')}`}
                                        className="text-brand no-underline"
                                    >
                                        {COMPANY_CONTACTS.Phone}
                                    </Link>
                                </Text>

                                <Text className="mb-0 mt-1.5 font-11 text-fg-muted leading-[18px]">
                                    This email was sent by {FULL_COMPANY_NAME}. If you
                                    believe you received it in error or suspect
                                    suspicious activity, please contact{' '}
                                    <Link
                                        href={`mailto:${COMPANY_CONTACTS.Email}`}
                                        className="text-brand no-underline"
                                    >
                                        {COMPANY_CONTACTS.Email}
                                    </Link>
                                    .
                                </Text>
                            </Section>
                        </Container>
                    </Section>
                </Body>
            </Tailwind>
        </Html>
    );
}