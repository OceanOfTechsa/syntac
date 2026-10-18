"use client";

import ErrorPage from "@/components/site/error-page";

const NotFound = () => {
    return (
        <ErrorPage
            code="404"
            title="Whoops!"
            description="The page you're looking for isn't found, we suggest you back to home."
            buttonText="Back to home page"
            buttonHref="/"
            rightTexts={["Page Drifted", "Lost in Space", "Wrong Turn", "404 Vibes"]}
        />
    );
};

export default NotFound;