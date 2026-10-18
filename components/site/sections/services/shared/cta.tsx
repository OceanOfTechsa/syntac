import React from 'react'
import GoogleReviewsBanner from "@/components/site/shared/Google-reviews-banner";
import {EstimateProjectButton} from "@/components/providers/project-estimator-provider";

const Cta = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center divide-y divide-dashed sm:flex-row sm:divide-x sm:divide-y-0 gap-6">
              <div className={'px-3'}>
                  <GoogleReviewsBanner />
              </div>
            <EstimateProjectButton />
        </div>
    )
}
export default Cta
