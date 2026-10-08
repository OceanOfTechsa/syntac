import type { Metadata } from "next";
import AppSettings from "@/utils/AppSettings";

const CompanyName: string = AppSettings.COMPANY_NAME;
const SiteDescription: string = AppSettings.SITE_DESCRIPTION;

const SiteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ${CompanyName} |
const SiteTitle =
  `Custom Software Development & Digital Solutions`;

const OgImage = "/brand/syntac-brand-kit/extras/og-image.png";

const SiteMetadata: Metadata = {
  metadataBase: new URL(SiteUrl),

  title: {
    default: SiteTitle,
    template: `%s • ${SiteTitle}`,
  },

  description: SiteDescription,

  keywords: [
    "custom software development",
    "software development company",
    "web development",
    "web application development",
    "custom software solutions",
    "business software",
    "digital solutions",
    "software development South Africa",
    "web development South Africa",
    "digital transformation",
    CompanyName,
  ],

  applicationName: CompanyName,

  authors: [
    {
      name: CompanyName,
    },
  ],

  creator: CompanyName,
  publisher: CompanyName,

  category: "technology",

  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "./",
    languages: {
      "en-ZA": "./",
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],

    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],

    other: [
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SiteUrl,
    siteName: CompanyName,

    title: SiteTitle,
    description: SiteDescription,

    images: [
      {
        url: OgImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${CompanyName} - Custom Software Development & Digital Solutions`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SiteTitle,
    description: SiteDescription,
    images: [OgImage],
  },
};

export default SiteMetadata;
