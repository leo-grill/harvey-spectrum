import { client } from "@/sanity/lib/client";
import { servicesQuery, servicesPageQuery } from "@/sanity/queries";
import ServicesPageContent, { type ServiceItem, type ServicesPageData } from "./ServicesPageContent";

export const revalidate = 30;

export default async function ServicesPage() {
  const [services, pageData] = await Promise.all([
    client.fetch<ServiceItem[]>(servicesQuery),
    client.fetch<ServicesPageData | null>(servicesPageQuery),
  ]);

  return <ServicesPageContent services={services} pageData={pageData} />;
}
