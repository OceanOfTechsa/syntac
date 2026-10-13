import { Metadata } from "next";

import AppSettings from "@/utils/AppSettings";

const CompanyName: string = AppSettings.COMPANY_NAME;

export const HowWeWorkPageMetadata: Metadata = {
  title: "How We Work",
  description: `Discover how ${CompanyName} turns ideas into reliable digital solutions through a clear, collaborative process from discovery and planning to development, testing, and delivery.`,
  keywords: [
    "how we work",
    "software development process",
    "software development methodology",
    "custom software development",
    "web development process",
    "digital product development",
    "software development company",
    "custom software solutions",
    "web application development",
    "software development South Africa",
    CompanyName,
  ],
};

export const AboutUsPageMetadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${CompanyName}, our approach to technology, and how we create custom digital solutions that help businesses grow, operate efficiently, and adapt for the future.`,
  keywords: [
    "about us",
    "about company",
    "software development company",
    "custom software company",
    "digital solutions company",
    "web development company",
    "technology company",
    "software development South Africa",
    "digital transformation",
    "custom software solutions",
    CompanyName,
  ],
};

export const OurTeamPageMetadata: Metadata = {
  title: "Our Team",
  description: `Meet the people behind ${CompanyName} and discover the skills, experience, and expertise we bring to custom software, websites, and digital solutions.`,
  keywords: [
    "our team",
    "software development team",
    "software developers",
    "web developers",
    "technology team",
    "software engineering team",
    "digital development team",
    "custom software developers",
    "software development South Africa",
    CompanyName,
  ],
};

export const OurStoryPageMetadata: Metadata = {
  title: "Our Story",
  description: `Discover the story behind ${CompanyName}, our journey, what drives us, and our vision for building thoughtful technology that creates lasting value for businesses.`,
  keywords: [
    "our story",
    "company story",
    "company journey",
    "about our company",
    "software company story",
    "technology company",
    "software development company",
    "digital solutions",
    "custom software development",
    "software development South Africa",
    CompanyName,
  ],
};

export const PrivacyPolicyPageMetadata: Metadata = {
  title: "Privacy Policy",
  description: `Read the ${CompanyName} Privacy Policy to understand how we collect, use, protect, and manage personal information when you use our website and services.`,
  keywords: [
    "privacy policy",
    "privacy",
    "data protection",
    "personal information",
    "data privacy",
    "website privacy policy",
    "privacy rights",
    "data security",
    CompanyName,
  ],
};

export const UseOfAIPageMetadata: Metadata = {
  title: "Use of AI",
  description: `Learn how ${CompanyName} uses artificial intelligence responsibly across our workflows, products, and services, including our approach to transparency, privacy, and human oversight.`,
  keywords: [
    "use of AI",
    "AI policy",
    "artificial intelligence",
    "AI transparency",
    "responsible AI",
    "AI governance",
    "AI usage policy",
    "AI in software development",
    "artificial intelligence policy",
    CompanyName,
  ],
};

export const ContactPageMetadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${CompanyName} to discuss your project, business needs, or ideas for a custom website, web application, or software solution.`,
  keywords: [
    "contact us",
    "contact",
    "get in touch",
    "software development company",
    "custom software development",
    "web development",
    "web application development",
    "digital solutions",
    "software development South Africa",
    CompanyName,
  ],
};

export const PublicOfferAgreementPageMetadata: Metadata = {
  title: "Public Offer Agreement",
  description: `Read the ${CompanyName} Public Offer Agreement, including the terms and conditions governing the provision of our products and digital services.`,
  keywords: [
    "public offer agreement",
    "public offer",
    "offer agreement",
    "terms and conditions",
    "service agreement",
    "terms of service",
    "digital services agreement",
    "software services agreement",
    "website services agreement",
    CompanyName,
  ],
};

export const CookiePolicyPageMetadata: Metadata = {
  title: "Cookie Policy",
  description: `Learn how ${CompanyName} uses cookies and similar technologies to provide essential functionality, understand website usage, and improve your experience.`,
  keywords: [
    "cookie policy",
    "cookies",
    "website cookies",
    "cookie consent",
    "cookie preferences",
    "cookie management",
    "analytics cookies",
    "essential cookies",
    "privacy and cookies",
    "website privacy",
    CompanyName,
  ],
};

export const ServicesPageMetadata: Metadata = {
  title: "Services",
  description: `Explore ${CompanyName} services, from web development and MVP development to custom software development, legacy system modernisation, and ongoing support and maintenance.`,
  keywords: [
    "software development services",
    "web development",
    "website development",
    "web application development",
    "MVP development",
    "custom software development",
    "software solutions",
    "legacy system modernisation",
    "software modernisation",
    "software maintenance",
    "software support",
    "digital solutions",
    "business software",
    "custom digital solutions",
    "South Africa software development",
    CompanyName,
  ],
};

export const CasesPageMetadata: Metadata = {
  title: "Case Studies",
  description: `Explore ${CompanyName} case studies and completed projects, showcasing our approach to custom software development, web development, and practical digital solutions for businesses.`,
  keywords: [
    "our work",
    "case studies",
    "software development case studies",
    "web development projects",
    "portfolio",
    "project showcase",
    "custom software projects",
    "web application projects",
    "website development projects",
    "business software solutions",
    "digital solutions portfolio",
    "software project examples",
    "South Africa software development",
    CompanyName,
  ],
};


export const ServicesMetadata: Record<string, Metadata> = {
  "web-development": {
    title: "Web Development",
    description: `Discover professional web development services from ${CompanyName}. We build responsive, high-performance websites tailored to your business goals, brand, and customers.`,
    keywords: [
      "web development",
      "website development",
      "custom website development",
      "responsive web design",
      "business websites",
      "professional website development",
      "website development South Africa",
      "SEO-friendly websites",
      "web development company",
      CompanyName,
    ],
  },

  "mvp-development": {
    title: "MVP Development",
    description: `Turn your idea into a working product with ${CompanyName}'s MVP development services. Validate your concept, test core features, and build a foundation for future growth.`,
    keywords: [
      "MVP development",
      "minimum viable product",
      "MVP software development",
      "startup product development",
      "product prototyping",
      "MVP development company",
      "rapid application development",
      "software product development",
      "startup software development",
      CompanyName,
    ],
  },

  "custom-software-development": {
    title: "Custom Software Development",
    description: `Streamline operations and solve business challenges with custom software development from ${CompanyName}. We build tailored software solutions designed around your workflows, requirements, and long-term goals.`,
    keywords: [
      "custom software development",
      "bespoke software development",
      "business software solutions",
      "enterprise software development",
      "custom business applications",
      "software development company",
      "workflow automation",
      "business process automation",
      "custom software development South Africa",
      CompanyName,
    ],
  },

  "legacy-system-modernisation": {
    title: "Legacy System Modernisation",
    description: `Modernise outdated systems with ${CompanyName}. Improve maintainability, integrate modern technologies, enhance performance, and evolve your existing software to meet changing business needs.`,
    keywords: [
      "legacy system modernisation",
      "legacy software modernisation",
      "application modernisation",
      "legacy application migration",
      "software system upgrades",
      "system integration",
      "modernise business software",
      "legacy system migration",
      "digital transformation",
      CompanyName,
    ],
  },

  "support-maintenance": {
    title: "Software Support & Maintenance",
    description: `Keep your digital products reliable, secure, and up to date with software support and maintenance from ${CompanyName}. Get help with troubleshooting, updates, improvements, and ongoing technical support.`,
    keywords: [
      "software support",
      "software maintenance",
      "application maintenance",
      "website maintenance",
      "software troubleshooting",
      "bug fixes",
      "software updates",
      "ongoing technical support",
      "website support services",
      CompanyName,
    ],
  }
}