import ErrorPage from "@/components/site/error-page";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Maintenance",
};

export default function MaintenancePage() {
    return (
        <ErrorPage
            code="503"
            title="Under Maintenance"
            subTitle="Temporarily Unavailable"
            description="We're performing some updates right now. Please try again later, we suggest you back to home."
            buttonText="Contact Support"
            buttonHref="/contact"
            rightTexts={[
                "Under Maintenance",
                "Be Right Back",
                "Almost Ready",
                "Coming Soon",
            ]}
        />
    );
}