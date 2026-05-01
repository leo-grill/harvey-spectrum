import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('About Page').id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('singleton-about').title('About Page')),
      S.listItem().title('Services Page').id('servicesPage')
        .child(S.document().schemaType('servicesPage').documentId('singleton-services').title('Services Page')),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('portfolio').title('Portfolio'),
      S.documentTypeListItem('newsArticle').title('News'),
    ])
