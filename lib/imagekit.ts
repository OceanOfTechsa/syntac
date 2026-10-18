import type {ImageLoaderProps} from "next/image";

/**
 * ImageKit helpers for case study images.
 *
 * Folder layout in the ImageKit media library (all lowercase kebab-case):
 *
 *   /case-studies/{client-slug}/{project-slug}/cover-light.png
 *   /case-studies/{client-slug}/{project-slug}/cover-dark.png
 *   /case-studies/{client-slug}/{project-slug}/gallery/01-light.png
 *   /case-studies/{client-slug}/{project-slug}/gallery/01-dark.png
 *   /clients/{client-slug}/logo.png
 *
 * {project-slug} is the same slug used in the route (/cases/[slug]).
 */

const URL_ENDPOINT = (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "").replace(/\/$/, "");

export type Theme = "light" | "dark";

export const caseImagePath = (clientSlug: string, projectSlug: string, theme: Theme) =>
    `/case-studies/${clientSlug}/${projectSlug}/cover-${theme}.png`;

/**
 * next/image loader: ImageKit does the resize + format conversion (f-auto serves
 * AVIF/WebP where supported), so Next doesn't re-optimise the image.
 */
export const imageKitLoader = ({src, width, quality}: ImageLoaderProps) => {
    const path = src.startsWith("/") ? src : `/${src}`;
    const transforms = [`w-${width}`, `q-${quality ?? 80}`, "f-auto"].join(",");
    return `${URL_ENDPOINT}${path}?tr=${transforms}`;
};

export const galleryImagePath = (
    clientSlug: string,
    projectSlug: string,
    index: number,
    theme: Theme,
) => `/case-studies/${clientSlug}/${projectSlug}/gallery/${String(index).padStart(2, "0")}-${theme}.png`;