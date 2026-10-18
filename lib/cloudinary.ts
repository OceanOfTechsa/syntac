type Theme = "dark" | "light";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function toCardImage(name: string, theme: Theme, w = 1320, h = 592) {
    if (!CLOUD_NAME) {
        throw new Error(
            "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable"
        );
    }

    const publicId = `${name}-${theme}`;

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${w},h_${h},c_fill/${publicId}.png`;
}