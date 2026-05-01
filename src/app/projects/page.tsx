import { client } from "@/sanity/lib/client";
import { portfolioQuery } from "@/sanity/queries";
import type { PortfolioItem } from "@/components/SelectedWorkSection";
import ProjectsPageContent from "./ProjectsPageContent";

export const revalidate = 30;

export default async function ProjectsPage() {
  const items = await client.fetch<PortfolioItem[]>(portfolioQuery);
  return <ProjectsPageContent items={items} />;
}
