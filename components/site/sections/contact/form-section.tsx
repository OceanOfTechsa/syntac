import React from "react";

import Link from "next/link";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import AppSettings from "@/utils/AppSettings";
import ContactForm from "@/components/site/forms/contact-form";

const FormSection = () => {
  return (
    <section id="contact-form" className="space-y-12">
      <div className="grid md:grid-cols-2">
        {/* Contact links */}
        <div className="order-last flex flex-col divide-y divide-dashed border-dashed md:order-first md:border-r">
          {/* Call us */}
          <Link
            href={`tel:${AppSettings.CompanyContacts.Phone}`}
            className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8"
          >
            <div className="flex items-center gap-2">
              <Phone
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <h3 className="text-xl font-medium">
                Call us: {AppSettings.CompanyContacts.Phone}
              </h3>
            </div>

            <p className="text-muted-foreground">
              Have a question, need more information, or want to
              discuss a project? Give us a call and let&apos;s talk
              about how we can help.
            </p>
          </Link>

          {/* Email us */}
          <Link
            href={`mailto:${AppSettings.CompanyContacts.Email}`}
            className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8"
          >
            <div className="flex items-center gap-2">
              <Mail
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <h3 className="text-xl font-medium">
                Email us: {AppSettings.CompanyContacts.Email}
              </h3>
            </div>

            <p className="text-muted-foreground">
              Send us your questions, requirements, or project
              details and we&apos;ll get back to you as soon as
              possible.
            </p>
          </Link>

          {/* Location */}
          <Link
            href="/about"
            className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8"
          >
            <div className="flex items-center gap-2">
              <MapPin
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <h3 className="text-xl font-medium">
                Our location
              </h3>
            </div>

            <p className="text-muted-foreground">
              Based in South Africa and connected to the world.
              Learn more about where we are based and how we work
              with clients remotely.
            </p>
          </Link>

          {/* Placeholder */}
          <Link
            href="#"
            className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8"
          >
            <div className="flex items-center gap-2">
              <MessageSquare
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <h3 className="text-xl font-medium">
                Get in touch
              </h3>
            </div>

            <p className="text-muted-foreground">
              Have something else in mind? We&apos;re always happy
              to hear from you and discuss how we can help.
            </p>
          </Link>
        </div>

        {/* Contact form placeholder */}
        <div className="order-first flex items-center justify-center px-6 py-12 md:order-last lg:px-8 border-b border-dashed sm:border-none">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default FormSection;
