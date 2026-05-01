import { type SchemaTypeDefinition } from 'sanity'
import { portfolio }    from './portfolio'
import { service }      from './service'
import { aboutPage }    from './aboutPage'
import { servicesPage } from './servicesPage'
import { newsArticle }  from './newsArticle'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolio, service, aboutPage, servicesPage, newsArticle],
}
