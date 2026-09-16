import { PlannerApp } from "@/components/planner-app";

export default async function DayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  return <PlannerApp mode="day" initialDate={date} />;
}
