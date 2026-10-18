"use client";

import { useEffect } from "react";
import ErrorPage from "@/components/site/error-page";

const Error = ({error, reset }: { error: Error & { digest?: string }; reset: () => void; }) => {
    useEffect(() => {
        // console.error(error);
    }, [error]);

    return (
        <ErrorPage
            code="500"
            title="Oops!"
            error={error}
            reset={reset}
            rightTexts={["System Error", "Something Broke", "Try Again", "Server Down"]}
        />
    );
}

export default Error;