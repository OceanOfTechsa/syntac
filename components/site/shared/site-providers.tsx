"use client";

import type { ReactNode } from "react";
import { ProjectEstimatorProvider } from "@/components/providers/project-estimator-provider";
import type { EstimateLead } from "@/components/site/forms/project-estimator-wizard";

async function submitEstimatorLead(lead: EstimateLead) {
  const response = await fetch("/api/estimator", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  // Throwing is what makes the wizard show its error message instead of "Thanks".
  if (!response.ok) throw new Error("Unable to send estimator lead.");
}

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <ProjectEstimatorProvider onSubmitLead={submitEstimatorLead}>
      {children}
    </ProjectEstimatorProvider>
  );
}
