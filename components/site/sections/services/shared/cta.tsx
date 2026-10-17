import React from 'react'
import GoogleReviewsBanner from "@/components/site/shared/Google-reviews-banner";
import {EstimateProjectButton} from "@/components/providers/project-estimator-provider";

const Cta = () => {
    return (
        <div className="flex w-full items-center justify-center divide-x divide-dashed gap-6">

              <div className={'px-3'}>
                  <GoogleReviewsBanner />
              </div>
            <EstimateProjectButton />
        </div>
    )
}
export default Cta
