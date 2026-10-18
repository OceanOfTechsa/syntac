import React from "react";
import Link from "next/link";

const PrivacyDetailsSection = () => {
    return (
        <section
            className={
                "mx-auto max-w-235 space-y-8 px-4 py-8 sm:px-6 sm:py-16 lg:border-x lg:border-dashed lg:px-12 lg:py-24"
            }
            id={'details'}
        >
            {/* Introduction */}
            <div className="space-y-4">
                <p className="text-lg">
                    <strong>This Privacy Policy</strong> explains how SYNTAC
                    collects, uses, stores, and protects information when you
                    visit our website, contact us, or use our services.
                </p>

                <p className="text-lg">
                    We are committed to respecting your privacy and handling
                    personal information responsibly. This policy applies to
                    information collected through our website and related
                    online interactions with SYNTAC.
                </p>
            </div>

            {/* Consent */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Consent</h2>

                <p className="text-lg">
                    By using our website, you acknowledge this Privacy Policy
                    and agree to the collection and use of information as
                    described in it.
                </p>

                <p className="text-lg">
                    If you do not agree with this Privacy Policy, please
                    discontinue use of our website and services.
                </p>
            </div>

            {/* Information We Collect */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Information We Collect
                </h2>

                <p className="text-lg">
                    The personal information we collect depends on how you
                    interact with SYNTAC. When you contact us or request our
                    services, we may receive information such as your name,
                    email address, phone number, company or business details,
                    project requirements, and any other information you choose
                    to provide.
                </p>

                <p className="text-lg">
                    We may also collect technical information automatically
                    when you visit our website, such as your IP address,
                    browser type, device information, referring pages, and
                    information about how you interact with the website.
                </p>
            </div>

            {/* How We Use Your Information */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    How We Use Your Information
                </h2>

                <p className="text-lg">
                    We may use the information we collect for purposes
                    including:
                </p>

                <ul className="list-disc space-y-2 pl-6 text-lg">
                    <li>Providing, operating, and maintaining our website.</li>
                    <li>
                        Responding to enquiries, requests, and communications.
                    </li>
                    <li>
                        Understanding your requirements and preparing project
                        proposals or quotations.
                    </li>
                    <li>
                        Providing and improving our services and digital
                        solutions.
                    </li>
                    <li>
                        Understanding how visitors use and interact with our
                        website.
                    </li>
                    <li>
                        Maintaining the security and reliability of our
                        website and services.
                    </li>
                    <li>
                        Detecting, preventing, and addressing fraud, abuse, or
                        security issues.
                    </li>
                </ul>
            </div>

            {/* Log Files */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Log Files</h2>

                <p className="text-lg">
                    Like many websites, SYNTAC may use log files to record
                    technical information about visits to our website. This
                    information may include IP addresses, browser type,
                    Internet Service Provider, date and time of access,
                    referring and exit pages, and related usage information.
                </p>

                <p className="text-lg">
                    This information may be used to understand website usage,
                    identify technical issues, maintain security, and improve
                    the overall experience of our website.
                </p>
            </div>

            {/* Cookies */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Cookies and Similar Technologies
                </h2>

                <p className="text-lg">
                    Our website may use cookies and similar technologies to
                    remember preferences, support website functionality,
                    understand website usage, and improve your experience.
                </p>

                <p className="text-lg">
                    You can manage or disable cookies through your browser
                    settings. Disabling certain cookies may affect the
                    functionality of some parts of the website. You can read more here: {" "}
                    <Link
                      href="/cookie-policy"
                      className="underline underline-offset-4"
                    >
                      Cookie Policy
                    </Link>
                </p>
            </div>

            {/* Analytics */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Analytics</h2>

                <p className="text-lg">
                    We may use third-party analytics services to help us
                    understand website traffic and how visitors interact with
                    our website. These services may collect information about
                    your device, browsing activity, and interactions with our
                    website.
                </p>

                <p className="text-lg">
                    Any third-party analytics services used on the website are
                    subject to their respective privacy policies and terms.
                </p>
            </div>

            {/* Third-Party Services */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Third-Party Services
                </h2>

                <p className="text-lg">
                    Our website or services may use third-party providers for
                    hosting, analytics, communication, payments, forms,
                    infrastructure, or other functionality.
                </p>

                <p className="text-lg">
                    These providers may process information as necessary to
                    provide their services. We encourage you to review the
                    privacy policies of third-party services that you interact
                    with through our website.
                </p>
            </div>

            {/* Data Security */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Data Security</h2>

                <p className="text-lg">
                    We take reasonable measures to protect information against
                    unauthorised access, disclosure, alteration, or
                    destruction. However, no method of transmission or
                    electronic storage can be guaranteed to be completely
                    secure.
                </p>
            </div>

            {/* Data Retention */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Data Retention</h2>

                <p className="text-lg">
                    We retain personal information only for as long as
                    reasonably necessary for the purposes for which it was
                    collected, to provide our services, comply with legal
                    obligations, resolve disputes, and enforce applicable
                    agreements.
                </p>
            </div>

            {/* Your Privacy Rights */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Your Privacy Rights
                </h2>

                <p className="text-lg">
                    Depending on the applicable laws and circumstances, you may
                    have rights relating to the personal information we hold
                    about you. These may include requesting access to,
                    correction of, or deletion of your personal information,
                    subject to applicable legal requirements and limitations.
                </p>

                <p className="text-lg">
                    To exercise a privacy-related right or ask a question
                    about how we handle your information, please contact us
                    using the details provided below.
                </p>
            </div>

            {/* Children's Information */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Children's Information
                </h2>

                <p className="text-lg">
                    Our website and services are not intentionally directed at
                    children. We do not knowingly collect personal information
                    from children through our website. If you believe that a
                    child has provided personal information to us, please
                    contact us so that we can review and address the matter.
                </p>
            </div>

            {/* Changes */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Changes to This Privacy Policy
                </h2>

                <p className="text-lg">
                    We may update this Privacy Policy from time to time to
                    reflect changes to our website, services, technology, or
                    legal obligations. Any updated version will be published
                    on this page with a revised effective or updated date.
                </p>
            </div>

            {/* Contact */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Contact Us</h2>

                <p className="text-lg">
                    If you have questions about this Privacy Policy or how
                    SYNTAC handles personal information, please{" "}
                    <a href="/contact" className="underline">
                        contact us
                    </a>
                    .
                </p>
            </div>

            <h2 className="my-4 text-2xl font-semibold">
                Last updated: 03 October, 2026
            </h2>

            <p className="font-signature text-lg underline underline-offset-6">
                Syntac Software
            </p>
        </section>
    );
};

export default PrivacyDetailsSection;
