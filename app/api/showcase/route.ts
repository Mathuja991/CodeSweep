import { NextResponse } from "next/server";
import { architectureModules, showcaseMetrics, surfaceViews, workflowSteps } from "@/lib/project-data";

export async function GET() {
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    metrics: showcaseMetrics,
    moduleCount: architectureModules.length,
    workflowCount: workflowSteps.length,
    surfaceCount: surfaceViews.length
  });
}
