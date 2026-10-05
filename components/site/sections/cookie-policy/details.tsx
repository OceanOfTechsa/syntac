import React from "react";
import Link from "next/link";

const CookieDetailsSection = () => {
  return (
    <section
      className="mx-auto max-w-235 space-y-8 px-4 py-8 sm:px-6 sm:py-16 lg:border-x lg:border-dashed lg:px-12 lg:py-24"
      id="details"
    >
      {/* Introduction */}
      <div className="space-y-4">
        <p className="text-lg">
          <strong>This Cookie Policy</strong> explains how SYNTAC
          uses cookies and similar technologies when you visit our
          website or interact with our online services.
        </p>

        <p className="text-lg">
          Cookies help us provide essential website functionality,
          remember certain preferences, understand how visitors use
          our website, and improve the overall experience.
        </p>
      </div>

      {/* What Are Cookies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          What Are Cookies?
        </h2>

        <p className="text-lg">
          Cookies are small text files stored on your device when
          you visit a website. They allow websites to recognise your
          device and remember certain information about your visit.
        </p>

        <p className="text-lg">
          Cookies may be temporary and removed when you close your
          browser, or they may remain on your device for a defined
          period of time.
        </p>
      </div>

      {/* How We Use Cookies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          How We Use Cookies
        </h2>

        <p className="text-lg">
          SYNTAC may use cookies and similar technologies for
          purposes including:
        </p>

        <ul className="list-disc space-y-2 pl-6 text-lg">
          <li>
            Enabling essential website functionality.
          </li>

          <li>
            Remembering preferences and settings.
          </li>

          <li>
            Maintaining website security.
          </li>

          <li>
            Understanding how visitors use and interact with our
            website.
          </li>

          <li>
            Measuring website performance and improving our
            services.
          </li>

          <li>
            Supporting features provided by third-party services.
          </li>
        </ul>
      </div>

      {/* Types of Cookies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Types of Cookies We May Use
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Essential Cookies
            </h3>

            <p className="text-lg">
              These cookies are necessary for certain parts of
              the website to function correctly. They may support
              security, navigation, session management, or other
              essential functionality.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Preference Cookies
            </h3>

            <p className="text-lg">
              These cookies may remember choices and preferences
              such as settings that help provide a more
              consistent experience when you return to the
              website.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Analytics Cookies
            </h3>

            <p className="text-lg">
              Analytics cookies may help us understand how
              visitors use our website, including which pages
              are visited, how visitors navigate the website,
              and how the website performs.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Third-Party Cookies
            </h3>

            <p className="text-lg">
              Some services integrated into our website may set
              their own cookies or use similar technologies.
              These may include analytics, hosting,
              communication, embedded content, or other
              third-party functionality.
            </p>
          </div>
        </div>
      </div>

      {/* Cookie Consent */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Cookie Consent
        </h2>

        <p className="text-lg">
          Where required, we may ask for your consent before placing
          or using non-essential cookies on your device.
        </p>

        <p className="text-lg">
          You can use our cookie preference controls to manage the
          categories of non-essential cookies you allow. Your
          choices may be stored so that we can remember your
          preferences on future visits.
        </p>
      </div>

      {/* Managing Cookies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Managing Your Cookie Preferences
        </h2>

        <p className="text-lg">
          You can manage your cookie preferences through the cookie
          settings available on our website.
        </p>

        <p className="text-lg">
          You can also control or delete cookies through your
          browser settings. The available controls vary depending on
          the browser and device you use.
        </p>

        <p className="text-lg">
          Please note that disabling certain cookies may affect the
          functionality or availability of some parts of our
          website.
        </p>
      </div>

      {/* Browser Controls */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Browser Cookie Controls
        </h2>

        <p className="text-lg">
          Most modern browsers allow you to view, block, delete, or
          restrict cookies through their privacy or security
          settings.
        </p>

        <p className="text-lg">
          If you choose to block all cookies, some website
          functionality may not operate as intended.
        </p>
      </div>

      {/* Analytics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Analytics and Website Performance
        </h2>

        <p className="text-lg">
          We may use analytics technologies to understand website
          traffic, visitor behaviour, and website performance.
        </p>

        <p className="text-lg">
          Analytics information may include details such as the
          pages visited, approximate usage patterns, device or
          browser information, and interactions with the website.
        </p>

        <p className="text-lg">
          Where applicable, analytics technologies will be used in
          accordance with your cookie preferences and applicable
          privacy requirements.
        </p>
      </div>

      {/* Third Party Services */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Third-Party Services
        </h2>

        <p className="text-lg">
          We may use third-party services that place or access
          cookies or similar technologies when you interact with
          their functionality through our website.
        </p>

        <p className="text-lg">
          These third parties may process information in accordance
          with their own privacy policies and terms. We recommend
          reviewing the privacy information provided by any
          third-party service you choose to interact with.
        </p>
      </div>

      {/* Cookies and Personal Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Cookies and Personal Information
        </h2>

        <p className="text-lg">
          Cookies do not necessarily identify you directly. However,
          information collected through cookies or similar
          technologies may sometimes be associated with other
          information that relates to you.
        </p>

        <p className="text-lg">
          Our use of information collected through cookies is also
          governed by our{" "}
          <Link
            href="/privacy-policy"
            className="underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* Changes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Changes to This Cookie Policy
        </h2>

        <p className="text-lg">
          We may update this Cookie Policy from time to time to
          reflect changes to our website, services, technologies,
          cookies we use, or applicable legal requirements.
        </p>

        <p className="text-lg">
          Any updated version will be published on this page with a
          revised effective or updated date.
        </p>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Contact Us
        </h2>

        <p className="text-lg">
          If you have questions about this Cookie Policy or how
          SYNTAC uses cookies, please{" "}
          <Link
            href="/contact"
            className="underline underline-offset-4"
          >
            contact us
          </Link>
          .
        </p>
      </div>

      {/* Updated */}
      <h2 className="my-4 text-2xl font-semibold">
        Last updated: 03 October, 2026
      </h2>

      <p className="font-signature text-lg underline underline-offset-6">
        Syntac Software
      </p>
    </section>
  );
};

export default CookieDetailsSection;
