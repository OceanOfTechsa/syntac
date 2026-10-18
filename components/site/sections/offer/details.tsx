import React from "react";

const OfferDetailsSection = () => {
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
                    <strong>This Public Offer Agreement</strong> sets out the terms and
                    conditions under which SYNTAC provides design, software
                    development, and related digital services to its clients.
                    By engaging our services and making payment of an issued
                    invoice, the Client acknowledges that they have read,
                    understood, and accepted the terms of this Agreement.
                </p>

                <p className="text-lg">
                    This Agreement is intended to establish clear expectations
                    regarding the services provided, payment, intellectual
                    property, confidentiality, termination, and other matters
                    relating to the relationship between SYNTAC and the Client.
                </p>
            </div>

            {/* Acceptance of Public Offer */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Acceptance of Public Offer
                </h2>

                <p className="text-lg">
                    The Client is considered to have accepted the terms of this
                    Public Offer Agreement by making payment of the issued
                    invoice for the services offered by SYNTAC. The Agreement
                    comes into force from the moment payment is received by
                    SYNTAC.
                </p>

                <p className="text-lg">
                    Payment of the invoice constitutes confirmation that the
                    Client has read, understood, and accepted all terms and
                    conditions contained in this Public Offer Agreement.
                </p>
            </div>

            {/* Services */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Services</h2>

                <p className="text-lg">
                    SYNTAC agrees to provide the Client with design, custom
                    software development, and related digital services as
                    specified in the applicable task order, quotation,
                    proposal, or project description.
                </p>
            </div>

            {/* Terms of Payment */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Terms of Payment
                </h2>

                <p className="text-lg">
                    Payment for Services shall be based on time and materials
                    or according to the pricing and payment terms agreed upon
                    in the relevant quotation, invoice, task order, or project
                    description.
                </p>
            </div>

            {/* Intellectual Property */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Intellectual Property
                </h2>

                <p className="text-lg">
                    Unless otherwise specified in a particular task order,
                    quotation, or project description, intellectual property
                    rights in works created by SYNTAC specifically for the
                    Client during the performance of the Services will belong
                    to the Client upon fulfilment of the applicable payment
                    obligations.
                </p>
            </div>

            {/* Confidentiality */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Confidentiality
                </h2>

                <p className="text-lg">
                    SYNTAC agrees to keep the Client's sensitive and
                    proprietary information confidential and will not disclose
                    such information to any third party without the Client's
                    prior written consent, except where disclosure is required
                    by law or otherwise permitted under the applicable
                    agreement.
                </p>
            </div>

            {/* Termination */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Termination</h2>

                <p className="text-lg">
                    Either party may terminate the Agreement by providing
                    written notice to the other party. The applicable notice
                    period and any additional termination conditions shall be
                    specified in the relevant task order or project
                    description.
                </p>
            </div>

            {/* Governing Law */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Governing Law
                </h2>

                <p className="text-lg">
                    This Agreement shall be governed by and construed in
                    accordance with the applicable laws specified in the
                    relevant agreement or project documentation between SYNTAC
                    and the Client.
                </p>
            </div>

            {/* Force Majeure */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Force Majeure
                </h2>

                <p className="text-lg">
                    Neither party shall be liable for any failure or delay in
                    performing its obligations where such failure or delay
                    results from circumstances beyond the reasonable control of
                    that party, including acts of nature, war, civil
                    disturbance, or other events that could not reasonably have
                    been anticipated or prevented.
                </p>
            </div>

            {/* Entire Agreement */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Entire Agreement
                </h2>

                <p className="text-lg">
                    This Public Offer Agreement, together with any applicable
                    quotations, task orders, project descriptions, attachments,
                    exhibits, or supplements, constitutes the entire agreement
                    between SYNTAC and the Client in relation to the Services.
                </p>
            </div>
            <h2 className="text-2xl font-semibold my-4">
                Last updated: 03 October, 2026
            </h2>
            <p className="text-lg font-signature underline underline-offset-6">
                Syntech Studio
            </p>
        </section>
    );
};

export default OfferDetailsSection;