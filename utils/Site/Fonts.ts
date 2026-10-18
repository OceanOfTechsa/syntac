import { Geist, Kalam, Sacramento} from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geist = Geist({
    subsets:['latin'],
    variable:'--font-sans'
});

const kalam = Kalam({
    subsets: ["latin"],
    weight: ["300", "400", "700"], // optional: pick what you need
    variable: "--font-kalam",
})

const brand = Geist({
    subsets: ["latin"],
    weight: ["400", "700"], // optional: pick what you need
    variable: "--font-brand",
})

const signature = Sacramento({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-signature",
})


export const fonts = { geistSans, kalam, geist, brand, signature}