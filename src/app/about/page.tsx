import { client } from "@/sanity/lib/client";
import { aboutPageQuery, servicesQuery } from "@/sanity/queries";
import AboutPageContent, { type AboutData, type ServiceItem } from "./AboutPageContent";

export const revalidate = 30;

export default async function AboutPage() {
  const [aboutData, services] = await Promise.all([
    client.fetch<AboutData | null>(aboutPageQuery),
    client.fetch<ServiceItem[]>(servicesQuery),
  ]);

  return <AboutPageContent aboutData={aboutData} services={services} />;
}
