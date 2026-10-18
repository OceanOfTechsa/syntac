import ErrorPage from "@/components/site/error-page";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Coming Soon",
};
export default function ComingSoonPage() {
    return (
        <ErrorPage
            code="503"
            title="Coming Soon"
            subTitle={'Stay Tuned'}
            description="We're working hard to bring you something amazing. Stay tuned!"
            buttonText="Notify Me"
            buttonHref="/contact"
            rightTexts={[
                "Coming Soon",
                "Launching Soon",
                "Stay Tuned",
                "Almost There",
            ]}
        />
    );
}