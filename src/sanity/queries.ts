import { groq } from 'next-sanity'

export const portfolioQuery = groq`
  *[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    imageUrl,
    tags,
    projectUrl,
    order,
  }
`
