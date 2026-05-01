import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Display Number',
      type: 'string',
      description: 'e.g. [ 01 ]',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'tags',
      title: 'Capability Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload an image. Takes priority over the static path below.',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Static Image Path',
      type: 'string',
      description: 'Fallback path from /public (e.g. /service-brand-discovery.png)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
