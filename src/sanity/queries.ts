import { groq } from 'next-sanity'

export const portfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc) {
    _id, title, "slug": slug.current, coverImage, imageUrl, tags, projectUrl, order,
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, number, title, description, tags, coverImage, imageUrl, order,
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage" && _id == "singleton-about"][0] {
    heroBio, bioParagraph1, bioParagraph2, portrait, stats,
  }
`

export const servicesPageQuery = groq`
  *[_type == "servicesPage" && _id == "singleton-services"][0] {
    heroSubheading, processSteps, ctaHeading,
  }
`

export const newsArticlesQuery = groq`
  *[_type == "newsArticle"] | order(order asc) {
    _id, title, description, image, imageUrl, link, publishedAt, order,
  }
`
