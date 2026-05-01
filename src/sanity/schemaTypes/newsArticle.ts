import { defineField, defineType } from 'sanity'

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Title',       type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image',       title: 'Image',       type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageUrl',    title: 'Static Image Path', type: 'string', description: 'Fallback from /public (e.g. /news-1.jpg)' }),
    defineField({ name: 'link',        title: 'Article URL', type: 'url' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'date' }),
    defineField({ name: 'order',       title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
