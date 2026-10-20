'use client'

import {Suspense} from 'react';

import {CleanHash} from "@/components/site/shared/clean-hash";

const CleanHashWrapper = () => {
    return (
        <Suspense fallback={null}>
            <CleanHash />
        </Suspense>
    )
}
export default CleanHashWrapper;
