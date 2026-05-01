import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBio',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
      description: 'Short tagline shown under the hero heading.',
    }),
    defineField({
      name: 'bioParagraph1',
      title: 'Bio — Paragraph 1',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'bioParagraph2',
      title: 'Bio — Paragraph 2',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown in the Story section. Falls back to /about-portrait.png.',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),
  ],
})
