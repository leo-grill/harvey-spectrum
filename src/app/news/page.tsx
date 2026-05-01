import { client } from "@/sanity/lib/client";
import { newsArticlesQuery } from "@/sanity/queries";
import NewsPageContent, { type NewsArticle } from "./NewsPageContent";

export const revalidate = 30;

export default async function NewsPage() {
  const articles = await client.fetch<NewsArticle[]>(newsArticlesQuery);
  return <NewsPageContent articles={articles} />;
}
